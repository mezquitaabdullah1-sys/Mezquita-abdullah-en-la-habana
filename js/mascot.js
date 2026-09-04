// 🧚 Mascot — Quba's friendly Islamic-inspired guide
// Renders animated mascot with 8 different poses
const Mascot = {
  POSES: ['idle', 'welcome', 'celebrate', 'encourage', 'thinking', 'shy', 'success', 'goodbye'],

  // Get HTML for a mascot in a given pose
  // size: small (60px), medium (140px), large (240px), xl (320px)
  // Uses <picture> with WebP + PNG fallback (86% smaller on modern browsers)
  render(pose = 'idle', size = 'medium', extraClass = '') {
    if (!this.POSES.includes(pose)) pose = 'idle';
    return `<picture>
      <source srcset="assets/mascot/${pose}.webp" type="image/webp">
      <img src="assets/mascot/${pose}.png" alt="Quba mascot ${pose}" class="mascot mascot-${size} ${extraClass}" loading="lazy">
    </picture>`;
  },

  // Render a mascot bubble: mascot + speech bubble next to it
  renderWithSpeech(pose, message, size = 'medium', side = 'right') {
    return `
      <div class="mascot-with-speech ${side === 'left' ? 'mascot-speech-left' : ''}">
        ${this.render(pose, size, 'mascot-pop-in')}
        <div class="mascot-speech-bubble">${message}</div>
      </div>
    `;
  },

  // Replace mascot dynamically (used to transition between poses)
  swap(container, newPose, newMessage = null) {
    const mascotImg = container.querySelector('.mascot');
    if (mascotImg) {
      mascotImg.style.transition = 'opacity 0.2s, transform 0.2s';
      mascotImg.style.opacity = '0';
      mascotImg.style.transform = 'scale(0.85)';
      // Actualizar <source webp> también si existe (usar picture)
      const source = mascotImg.parentElement?.querySelector('source');
      setTimeout(() => {
        if (source) source.srcset = `assets/mascot/${newPose}.webp`;
        mascotImg.src = `assets/mascot/${newPose}.png`;
        mascotImg.style.opacity = '1';
        mascotImg.style.transform = 'scale(1)';
      }, 200);
    }
    if (newMessage !== null) {
      const bubble = container.querySelector('.mascot-speech-bubble');
      if (bubble) bubble.innerHTML = newMessage;
    }
  },

  // Floating helper: show mascot in a corner with a tip
  showTip(message, pose = 'welcome', duration = 4500) {
    // Remove existing tip
    const existing = document.querySelector('.mascot-floating-tip');
    if (existing) existing.remove();

    const tip = document.createElement('div');
    tip.className = 'mascot-floating-tip';
    tip.innerHTML = `
      <button class="mascot-tip-close" onclick="this.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
      ${this.render(pose, 'small', 'mascot-bounce')}
      <div class="mascot-tip-text">${message}</div>
    `;
    document.body.appendChild(tip);

    if (duration > 0) {
      setTimeout(() => {
        tip.classList.add('fade-out');
        setTimeout(() => tip.remove(), 400);
      }, duration);
    }
  },

  // Celebrate with confetti + success pose
  celebrate(container, message = (typeof t === 'function' ? (t('wellDone') || '¡Bien hecho!') : '¡Bien hecho!')) {
    container.innerHTML = `
      <div class="celebration-overlay">
        ${this.renderWithSpeech('celebrate', message, 'large')}
        <div class="confetti-container">
          ${Array(30).fill(0).map((_, i) => `<div class="confetti" style="--i:${i}; --c:${this.confettiColor(i)}; --d:${Math.random() * 0.5}s;"></div>`).join('')}
        </div>
      </div>
    `;
  },

  confettiColor(i) {
    const colors = ['#D4AF37', '#0F4C3A', '#1A6B52', '#FFD700', '#FF7043', '#5C6BC0'];
    return colors[i % colors.length];
  },
};
