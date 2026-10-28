// Genera assets/icon.png y assets/splash-icon.png desde el SVG oficial de KUBI.
// Uso: npm run icons
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';

const front = readFileSync(new URL('../assets/kubi/vista-frontal.svg', import.meta.url), 'utf8');
const inner = front.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

const compose = ({ bg, x, y, w, h, viewBox }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">` +
  (bg ? `<rect width="1024" height="1024" fill="${bg}"/>` : '') +
  `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${viewBox}">${inner}</svg></svg>`;

const render = (svg, file) => {
  const png = new Resvg(svg, { fitTo: { mode: 'original' }, background: 'rgba(0,0,0,0)' }).render().asPng();
  writeFileSync(new URL(`../assets/${file}`, import.meta.url), png);
  console.log(`assets/${file}`, png.length, 'bytes');
};

// Ícono: fondo opaco (iOS no admite transparencia en el ícono).
render(compose({ bg: '#F7F8FF', x: 82, y: 42, w: 860, h: 939, viewBox: '0 12 240 262' }), 'icon.png');
// Pantalla de carga: KUBI con fondo transparente.
render(compose({ bg: null, x: 132, y: 37, w: 760, h: 950, viewBox: '0 0 240 300' }), 'splash-icon.png');
