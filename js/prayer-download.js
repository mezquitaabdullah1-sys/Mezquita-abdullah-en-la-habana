/* ============================================
   Prayer Times - Download as Image Feature
   ============================================ */

const PRAYER_ICONS_EMOJI = {
    Fajr: '🌅',
    Sunrise: '☀️',
    Dhuhr: '🌞',
    Asr: '🌇',
    Maghrib: '🌆',
    Isha: '🌙'
};

const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const WEEKDAYS_ES = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

async function populateDownloadCard() {
    const today = new Date();
    const lang = currentLanguage || 'es';
    
    // Format gregorian date
    const wd = WEEKDAYS_ES[today.getDay()];
    const dateStr = `${wd}, ${today.getDate()} ${MONTHS_ES[today.getMonth()]} ${today.getFullYear()}`;
    const dlGreg = document.getElementById('dlGregorianDate');
    if (dlGreg) dlGreg.textContent = dateStr;
    
    // Hijri (fetch)
    try {
        const ds = `${String(today.getDate()).padStart(2,'0')}-${String(today.getMonth()+1).padStart(2,'0')}-${today.getFullYear()}`;
        const r = await fetch(`https://api.aladhan.com/v1/gToH/${ds}`);
        const d = await r.json();
        if (d.data && d.data.hijri) {
            const h = d.data.hijri;
            const hStr = `${h.day} ${h.month.en} ${h.year} AH`;
            const dlH = document.getElementById('dlHijriDate');
            if (dlH) dlH.textContent = hStr;
        }
    } catch(e) { console.error(e); }
    
    // Prayer times
    try {
        const ds = `${String(today.getDate()).padStart(2,'0')}-${String(today.getMonth()+1).padStart(2,'0')}-${today.getFullYear()}`;
        const r = await fetch(`https://api.aladhan.com/v1/timings/${ds}?latitude=23.139272&longitude=-82.349244&method=3`);
        const d = await r.json();
        if (d.data && d.data.timings) {
            const t = d.data.timings;
            const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
            const grid = document.getElementById('dlPrayers');
            if (grid) {
                grid.innerHTML = prayers.map(p => `
                    <div class="dl-prayer-row">
                        <span class="dl-prayer-icon">${PRAYER_ICONS_EMOJI[p]}</span>
                        <span class="dl-prayer-name">${p}</span>
                        <span class="dl-prayer-time">${t[p]}</span>
                    </div>
                `).join('');
            }
        }
    } catch(e) { console.error(e); }
}

async function downloadPrayerImage() {
    const card = document.getElementById('dlCardInner');
    if (!card || typeof html2canvas === 'undefined') {
        alert('No se pudo generar la imagen. Inténtelo de nuevo.');
        return;
    }
    
    const btn = document.getElementById('downloadBtn');
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Generando...</span>';
    btn.disabled = true;
    
    try {
        const canvas = await html2canvas(card, {
            scale: 2,
            backgroundColor: null,
            useCORS: true,
            logging: false
        });
        
        const today = new Date();
        const fname = `mezquita-abdullah-prayer-${today.toISOString().split('T')[0]}.png`;
        
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fname;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    } catch(e) {
        console.error(e);
        alert('Error al generar la imagen. Intenta de nuevo.');
    }
    
    btn.innerHTML = originalHtml;
    btn.disabled = false;
}

async function sharePrayerImage() {
    const card = document.getElementById('dlCardInner');
    if (!card || typeof html2canvas === 'undefined') return;
    
    try {
        const canvas = await html2canvas(card, { scale: 2, backgroundColor: null, useCORS: true });
        canvas.toBlob(async (blob) => {
            const file = new File([blob], 'prayer-times.png', { type: 'image/png' });
            
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: 'Horarios de Oración - Mezquita Abdullah',
                        text: 'Horarios de oración de hoy - Mezquita Abdullah, La Habana, Cuba'
                    });
                } catch(e) {
                    if (e.name !== 'AbortError') console.error(e);
                }
            } else {
                // Fallback: open WhatsApp share
                const text = encodeURIComponent('Horarios de oración de hoy - Mezquita Abdullah, La Habana 🕌');
                window.open(`https://wa.me/?text=${text}`, '_blank');
            }
        });
    } catch(e) {
        console.error(e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('dlCardInner')) {
        // Wait a bit for the page to load prayer times
        setTimeout(populateDownloadCard, 800);
        
        document.getElementById('downloadBtn')?.addEventListener('click', downloadPrayerImage);
        document.getElementById('shareBtn')?.addEventListener('click', sharePrayerImage);
    }
});
