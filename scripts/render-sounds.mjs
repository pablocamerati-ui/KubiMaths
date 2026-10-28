// Genera los sonidos de KUBI (WAV mono, 22.050 Hz) sin depender de archivos externos.
// Uso: npm run sonidos
import { mkdirSync, writeFileSync } from 'node:fs';

const SR = 22050;
const nota = (f, ms, { vol = 0.35, forma = 'suave' } = {}) => ({ f, ms, vol, forma });

function sintetizar(notas, { cola = 60 } = {}) {
  const muestras = [];
  for (const n of notas) {
    const len = Math.round((SR * n.ms) / 1000);
    for (let i = 0; i < len; i++) {
      const t = i / SR;
      // Ataque corto y caída exponencial: sonido tipo "campanita" amable.
      const ataque = Math.min(1, i / (SR * 0.006));
      const caida = Math.exp(-3.2 * (i / len));
      const base = Math.sin(2 * Math.PI * n.f * t);
      const armonico = n.forma === 'brillante' ? 0.28 * Math.sin(2 * Math.PI * n.f * 2 * t) : 0.12 * Math.sin(2 * Math.PI * n.f * 3 * t);
      muestras.push(n.vol * ataque * caida * (base + armonico));
    }
  }
  for (let i = 0; i < (SR * cola) / 1000; i++) muestras.push(0);
  return muestras;
}

function wav(muestras) {
  const datos = Buffer.alloc(muestras.length * 2);
  muestras.forEach((m, i) => datos.writeInt16LE(Math.round(Math.max(-1, Math.min(1, m)) * 32767), i * 2));
  const h = Buffer.alloc(44);
  h.write('RIFF', 0);
  h.writeUInt32LE(36 + datos.length, 4);
  h.write('WAVE', 8);
  h.write('fmt ', 12);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); // PCM
  h.writeUInt16LE(1, 22); // mono
  h.writeUInt32LE(SR, 24);
  h.writeUInt32LE(SR * 2, 28);
  h.writeUInt16LE(2, 32);
  h.writeUInt16LE(16, 34);
  h.write('data', 36);
  h.writeUInt32LE(datos.length, 40);
  return Buffer.concat([h, datos]);
}

const SONIDOS = {
  // Mi5 → Si5: subida alegre.
  acierto: sintetizar([nota(659, 90), nota(988, 170, { forma: 'brillante' })]),
  // Sol4 → Mi4: bajada suave, sin castigar.
  error: sintetizar([nota(392, 110, { vol: 0.25 }), nota(330, 190, { vol: 0.22 })]),
  // Do5 Mi5 Sol5 Do6: fanfarria corta al terminar una misión.
  celebracion: sintetizar([nota(523, 90), nota(659, 90), nota(784, 90), nota(1047, 320, { forma: 'brillante' })]),
  // Sol5 Do6 Mi6: chispa de logro.
  logro: sintetizar([nota(784, 80, { forma: 'brillante' }), nota(1047, 80, { forma: 'brillante' }), nota(1319, 260, { forma: 'brillante' })]),
  // Toque breve para botones.
  toque: sintetizar([nota(1200, 28, { vol: 0.18 })], { cola: 10 }),
};

mkdirSync('assets/sonidos', { recursive: true });
for (const [nombre, m] of Object.entries(SONIDOS)) {
  writeFileSync(`assets/sonidos/${nombre}.wav`, wav(m));
  console.log(`assets/sonidos/${nombre}.wav`, `${((m.length / SR) * 1000).toFixed(0)} ms`);
}
