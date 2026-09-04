// 🕌 Adhan Service — Plays adhan with different voices
// v20 FIX: las URLs antiguas (cdn.islamic.network) devuelven 403 — error
// "No se pudo reproducir el adhan". Ahora se usan fuentes verificadas
// (cdn.aladhan.com + islamcan.com) con fallback automático por voz.
// v24: nuevo modo de reproducción:
//   • 'full'    → adhan completo (las dos voces configuradas en secuencia)
//   • 'takbeer' → SOLO las dos primeras takbeer (se reproduce la 1ª voz y se
//                 corta automáticamente tras `takbeerDuration` segundos)
const AdhanService = {
  VOICES: [
    { id: 'makkah',   name: 'Makkah — Ali Ahmad Mulla',      country: 'Arabia Saudí', flag: '🕋', url: 'https://cdn.aladhan.com/audio/adhans/a1.mp3',      fallbackUrl: 'https://www.islamcan.com/audio/adhan/azan1.mp3' },
    { id: 'madinah',  name: 'Madinah — Adhan Madinah',       country: 'Arabia Saudí', flag: '🕌', url: 'https://cdn.aladhan.com/audio/adhans/a2.mp3',      fallbackUrl: 'https://www.islamcan.com/audio/adhan/azan2.mp3' },
    { id: 'egypt',    name: 'Egipto — Adhan Egypt',          country: 'Egipto', flag: '🇪🇬', url: 'https://cdn.aladhan.com/audio/adhans/a3.mp3',      fallbackUrl: 'https://www.islamcan.com/audio/adhan/azan3.mp3' },
    { id: 'turkey',   name: 'Turquía — Adhan Turkish',       country: 'Turquía', flag: '🇹🇷', url: 'https://cdn.aladhan.com/audio/adhans/a4.mp3',      fallbackUrl: 'https://www.islamcan.com/audio/adhan/azan4.mp3' },
    { id: 'aqsa',     name: 'Al-Aqsa — Adhan Al-Aqsa',       country: 'Palestina', flag: '🇵🇸', url: 'https://www.islamcan.com/audio/adhan/azan1.mp3', fallbackUrl: 'https://cdn.aladhan.com/audio/adhans/a1.mp3' },
    { id: 'algeria',  name: 'Argelia — Adhan Algerian',      country: 'Argelia', flag: '🇩🇿', url: 'https://www.islamcan.com/audio/adhan/azan2.mp3', fallbackUrl: 'https://cdn.aladhan.com/audio/adhans/a2.mp3' },
    { id: 'fajr_makkah',  name: 'Fajr — Makkah',   country: 'Arabia Saudí', flag: '🌅', url: 'https://cdn.aladhan.com/audio/adhans/a3.mp3', fallbackUrl: 'https://www.islamcan.com/audio/adhan/azan3.mp3' },
    { id: 'fajr_madinah', name: 'Fajr — Madinah',  country: 'Arabia Saudí', flag: '🌅', url: 'https://cdn.aladhan.com/audio/adhans/a4.mp3', fallbackUrl: 'https://www.islamcan.com/audio/adhan/azan4.mp3' },
  ],

  audio: null,
  previewAudio: null,
  _cutTimer: null, // v24: temporizador que corta el audio en modo 'takbeer'

  getSettings() {
    // v24: defaults extendidos (mode / takbeerDuration) con fusión para
    // ajustes antiguos guardados antes de la v24
    return Object.assign({
      voice1: 'makkah',
      voice2: 'madinah',
      volume: 0.8,
      muted: false,
      mode: 'full',          // 'full' | 'takbeer'
      takbeerDuration: 12,   // segundos aprox. que cubren las 2 primeras takbeer
    }, (typeof AppState !== 'undefined' && AppState.settings.adhan) || {});
  },

  /**
   * Reproduce una voz con fallback automático: si la URL principal falla
   * (red, 403, CORS...), intenta la URL alternativa antes de rendirse.
   * v24: parámetro opcional maxMs — corta el audio tras N milisegundos
   * (usado por el modo "solo las dos primeras takbeer").
   * @returns {Promise<boolean>} true si empezó a sonar
   */
  _playVoice(voice, volume, onEnded, maxMs = 0) {
    return new Promise((resolve) => {
      let settled = false;
      const clearCut = () => {
        if (this._cutTimer) { clearTimeout(this._cutTimer); this._cutTimer = null; }
      };
      const finish = (a, ok) => {
        if (settled) return;
        settled = true;
        clearCut();
        if (a && a !== this.audio) { try { a.pause(); } catch (e) {} }
        resolve(ok);
        if (onEnded) onEnded();
      };

      const tryUrl = (url, isFallback) => {
        const a = new Audio();
        a.volume = volume;
        a.preload = 'auto';
        a.src = url;
        a.onerror = () => {
          if (!isFallback && voice.fallbackUrl) {
            console.warn('Adhan: fallo URL principal, probando fallback…', voice.id);
            tryUrl(voice.fallbackUrl, true);
          } else {
            console.warn('Adhan: no se pudo cargar', voice.id);
            finish(a, false);
          }
        };
        a.onended = () => finish(a, true);
        // v25: corte por progreso real del audio (modo takbeer) — garantía
        // extra por si el temporizador se retrasa (pestaña en 2º plano):
        // en cuanto la reproducción alcanza maxMs se corta, pase lo que pase.
        if (maxMs > 0) {
          a.addEventListener('timeupdate', () => {
            if (a.currentTime * 1000 >= maxMs) {
              try { a.pause(); a.currentTime = 0; } catch (e) {}
              finish(a, true);
            }
          });
        }
        const p = a.play();
        if (p && p.then) {
          p.then(() => {
            // v24: corte programado (modo takbeer) — solo si realmente sonó
            if (maxMs > 0) {
              clearCut();
              this._cutTimer = setTimeout(() => {
                this._cutTimer = null;
                try { a.pause(); a.currentTime = 0; } catch (e) {}
                finish(a, true);
              }, maxMs);
            }
          }).catch(err => {
            // NotAllowedError = sin gesto del usuario; no tiene sentido el fallback
            if (err && err.name === 'NotAllowedError') {
              console.warn('Adhan: reproducción bloqueada (se requiere interacción del usuario)');
              finish(a, false);
              return;
            }
            if (!isFallback && voice.fallbackUrl) {
              tryUrl(voice.fallbackUrl, true);
            } else {
              console.warn('Adhan play failed:', err);
              finish(a, false);
            }
          });
        }
        this.audio = a;
      };
      tryUrl(voice.url, false);
    });
  },

  preview(voiceId) {
    this.stopPreview();
    const voice = this.VOICES.find(v => v.id === voiceId);
    if (!voice) return;
    const settings = this.getSettings();
    const volume = settings.muted ? 0 : settings.volume;

    const tryUrl = (url, isFallback) => {
      this.previewAudio = new Audio(url);
      this.previewAudio.volume = volume;
      this.previewAudio.onerror = () => {
        if (!isFallback && voice.fallbackUrl) { tryUrl(voice.fallbackUrl, true); return; }
        if (typeof showToast === 'function') showToast('⚠️ ' + (t('adhanPlayError') || 'No se pudo reproducir'), 3000);
      };
      this.previewAudio.play().then(() => {
        if (typeof showToast === 'function') showToast('🔊 ' + voice.name, 1500);
      }).catch(err => {
        console.warn('Adhan preview failed:', err);
        if (!isFallback && voice.fallbackUrl && err && err.name !== 'NotAllowedError') {
          tryUrl(voice.fallbackUrl, true);
          return;
        }
        if (typeof showToast === 'function') showToast('⚠️ ' + (t('adhanPlayError') || 'No se pudo reproducir'), 3000);
      });
    };
    tryUrl(voice.url, false);
  },

  stopPreview() {
    if (this.previewAudio) {
      try { this.previewAudio.pause(); this.previewAudio.currentTime = 0; this.previewAudio.onerror = null; } catch (e) {}
      this.previewAudio = null;
    }
  },

  setVolume(v) {
    if (this.previewAudio) this.previewAudio.volume = v;
    if (this.audio) this.audio.volume = v;
  },

  /**
   * Reproduce el adhan según el modo configurado:
   *  - 'full'    → las dos voces en secuencia (adhan completo)
   *  - 'takbeer' → solo las dos primeras takbeer (1ª voz, corte a los N seg)
   */
  async playFullAdhan(onEnded) {
    const settings = this.getSettings();
    if (settings.muted) { if (onEnded) onEnded(); return false; }
    const voice1 = this.VOICES.find(v => v.id === settings.voice1) || this.VOICES[0];
    const voice2 = this.VOICES.find(v => v.id === settings.voice2) || this.VOICES[1];

    this.stopPreview();

    // v24: modo "solo las dos primeras takbeer"
    if (settings.mode === 'takbeer') {
      // v25: solo las DOS primeras takbeer — se reproduce la 1ª voz con
      // doble mecanismo de corte (temporizador + progreso del audio) y NO
      // se continúa con la segunda voz ni con el adhan completo.
      const durMs = Math.max(5, settings.takbeerDuration || 12) * 1000;
      const ok = await this._playVoice(voice1, settings.volume, onEnded, durMs);
      if (!ok && typeof showToast === 'function') {
        showToast('⚠️ ' + (t('adhanPlayError') || 'No se pudo reproducir'), 3000);
      }
      return ok;
    }

    // Modo adhan completo (dos voces en secuencia, fallback incluido)
    const ok1 = await this._playVoice(voice1, settings.volume, null);
    if (!ok1) {
      // Intentar al menos la segunda voz (otra fuente puede funcionar)
      const ok2 = await this._playVoice(voice2, settings.volume, onEnded);
      if (!ok2 && typeof showToast === 'function') {
        showToast('⚠️ ' + (t('adhanPlayError') || 'No se pudo reproducir'), 3000);
      }
      return ok2;
    }
    const ok2 = await this._playVoice(voice2, settings.volume, onEnded);
    return ok2;
  },

  stop() {
    this.stopPreview();
    if (this._cutTimer) { clearTimeout(this._cutTimer); this._cutTimer = null; }
    if (this.audio) {
      try { this.audio.pause(); this.audio.currentTime = 0; this.audio.onended = null; this.audio.onerror = null; } catch (e) {}
      this.audio = null;
    }
  },
};

if (typeof window !== 'undefined') {
  window.AdhanService = AdhanService;
}
