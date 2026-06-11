// 🧭 Cálculo Qibla
const Qibla = {
  // Bearing inicial great-circle
  calculateBearing(lat, lng) {
    const toRad = d => d * Math.PI / 180;
    const toDeg = r => r * 180 / Math.PI;

    const lat1 = toRad(lat);
    const lat2 = toRad(CONFIG.KAABA.lat);
    const dLon = toRad(CONFIG.KAABA.lng - lng);

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    let bearing = toDeg(Math.atan2(y, x));
    return (bearing + 360) % 360;
  },

  // Distancia haversine en km
  distance(lat, lng) {
    const toRad = d => d * Math.PI / 180;
    const R = 6371;
    const lat1 = toRad(lat);
    const lat2 = toRad(CONFIG.KAABA.lat);
    const dLat = toRad(CONFIG.KAABA.lat - lat);
    const dLon = toRad(CONFIG.KAABA.lng - lng);

    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  },

  // Ángulo de la flecha a mostrar
  arrowAngle(qiblaBearing, deviceHeading) {
    return ((qiblaBearing - deviceHeading) % 360 + 360) % 360;
  },

  isAligned(arrowAngle, tolerance = 5) {
    return arrowAngle <= tolerance || arrowAngle >= 360 - tolerance;
  },
};
