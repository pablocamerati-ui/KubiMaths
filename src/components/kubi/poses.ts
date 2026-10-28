/**
 * Poses oficiales de KUBI (diseño canónico 1.0).
 *
 * Todas las poses comparten exactamente la misma anatomía: cuerpo-cubo,
 * dos extensiones superiores asimétricas, dos brazos, dos piernas y el
 * núcleo-rombo con hendidura en el pecho. Aquí solo cambian brazos,
 * ojos, cejas, boca y efectos. Coordenadas en un lienzo de 240 × 270.
 */

export type KubiExpression =
  | 'neutral'
  | 'feliz'
  | 'saludando'
  | 'pensando'
  | 'sorprendido'
  | 'celebrando'
  | 'concentrado'
  | 'animando'
  | 'confundido'
  | 'orgulloso';

export type Arm = {
  /** Trazo del brazo (desde el hombro). */
  d: string;
  /** Centro de la mano. */
  hand: [number, number];
  handR?: number;
  /** true si el brazo se dibuja delante del cuerpo. */
  front?: boolean;
};

export type Eye =
  | {
      type: 'open';
      white: [number, number, number, number]; // cx, cy, rx, ry
      pupil: [number, number, number, number];
      glint: [number, number, number]; // cx, cy, r
    }
  | { type: 'closed'; d: string };

export type Mouth =
  | { type: 'line'; d: string }
  | { type: 'open'; d: string }
  | { type: 'o'; cx: number; cy: number; rx: number; ry: number };

export type Pose = {
  arms: [Arm, Arm];
  eyes: [Eye, Eye];
  brows: [string, string];
  mouth: Mouth;
  /** Radio del brillo turquesa del núcleo. */
  glow?: number;
  /** Aura dorada de recompensa detrás del núcleo. */
  gold?: boolean;
  /** Destellos amarillos [x, y, tamaño] (solo momentos de recompensa). */
  sparkles?: Array<[number, number, number]>;
  /** Burbujas turquesa de pensamiento. */
  bubbles?: boolean;
  /** Desplazamiento vertical (salto). */
  lift?: number;
  /** Inclinación en grados. */
  tilt?: number;
};

const openEye = (
  cx: number,
  cy: number,
  pdx = 3,
  pdy = 4,
  size: Partial<{ rx: number; ry: number; prx: number; pry: number; g: number }> = {}
): Eye => {
  const rx = size.rx ?? 21;
  const ry = size.ry ?? 26;
  const prx = size.prx ?? 12;
  const pry = size.pry ?? 15;
  const px = cx + pdx;
  const py = cy + pdy;
  return {
    type: 'open',
    white: [cx, cy, rx, ry],
    pupil: [px, py, prx, pry],
    glint: [px + 4, py - 7, size.g ?? 4.5],
  };
};

const ARMS_DOWN: [Arm, Arm] = [
  { d: 'M50 150 Q30 160 27 184', hand: [26, 189] },
  { d: 'M190 150 Q210 160 213 184', hand: [214, 189] },
];

const BROWS_NEUTRAL: [string, string] = ['M80 95 Q92 89 104 94', 'M136 94 Q148 89 160 95'];
const BROWS_UP: [string, string] = ['M80 92 Q92 85 104 90', 'M136 90 Q148 85 160 92'];

const HAPPY_CLOSED: [Eye, Eye] = [
  { type: 'closed', d: 'M78 134 Q94 112 110 134' },
  { type: 'closed', d: 'M130 134 Q146 112 162 134' },
];

export const POSES: Record<KubiExpression, Pose> = {
  neutral: {
    arms: ARMS_DOWN,
    eyes: [openEye(94, 128, 3, 4), openEye(146, 128, -3, 4)],
    brows: BROWS_NEUTRAL,
    mouth: { type: 'line', d: 'M108 165 Q120 176 132 165' },
  },
  feliz: {
    arms: [
      { d: 'M50 150 Q28 156 22 176', hand: [20, 181] },
      { d: 'M190 150 Q212 156 218 176', hand: [220, 181] },
    ],
    eyes: [openEye(94, 128, 2, 2), openEye(146, 128, -2, 2)],
    brows: BROWS_UP,
    mouth: { type: 'open', d: 'M104 160 Q120 184 136 160 Z' },
  },
  saludando: {
    arms: [
      { d: 'M50 140 Q26 124 28 98', hand: [29, 93] },
      { d: 'M190 150 Q210 160 213 184', hand: [214, 189] },
    ],
    eyes: [openEye(94, 128, 1, 2), openEye(146, 128, -3, 2)],
    brows: BROWS_UP,
    mouth: { type: 'open', d: 'M104 160 Q120 182 136 160 Z' },
  },
  pensando: {
    arms: [
      { d: 'M50 150 Q30 160 27 184', hand: [26, 189] },
      { d: 'M190 156 Q178 186 142 183', hand: [137, 181], front: true },
    ],
    eyes: [openEye(94, 128, 7, -6, { g: 4 }), openEye(146, 128, 5, -6, { g: 4 })],
    brows: ['M80 96 L104 96', 'M136 88 Q148 80 160 86'],
    mouth: { type: 'line', d: 'M102 169 Q111 165 120 168' },
    bubbles: true,
  },
  sorprendido: {
    arms: [
      { d: 'M50 140 Q30 128 30 106', hand: [30, 101] },
      { d: 'M190 140 Q210 128 210 106', hand: [210, 101] },
    ],
    eyes: [
      openEye(94, 130, 1, 2, { rx: 23, ry: 29, prx: 9, pry: 11, g: 3.5 }),
      openEye(146, 130, -1, 2, { rx: 23, ry: 29, prx: 9, pry: 11, g: 3.5 }),
    ],
    brows: ['M80 86 Q92 79 104 84', 'M136 84 Q148 79 160 86'],
    mouth: { type: 'o', cx: 120, cy: 172, rx: 8, ry: 10 },
  },
  celebrando: {
    arms: [
      { d: 'M52 138 Q34 112 40 82', hand: [41, 77] },
      { d: 'M188 138 Q206 112 200 82', hand: [199, 77] },
    ],
    eyes: HAPPY_CLOSED,
    brows: ['M80 98 Q92 92 104 97', 'M136 97 Q148 92 160 98'],
    mouth: { type: 'open', d: 'M100 156 Q120 186 140 156 Z' },
    glow: 28,
    sparkles: [
      [34, 40, 12],
      [206, 36, 14],
      [226, 122, 8],
      [14, 126, 8],
    ],
    lift: -12,
  },
  concentrado: {
    arms: [
      { d: 'M50 152 Q36 170 40 190', hand: [42, 194] },
      { d: 'M190 152 Q204 170 200 190', hand: [198, 194] },
    ],
    eyes: [
      openEye(94, 132, 2, 3, { ry: 21, prx: 11, pry: 13, g: 4 }),
      openEye(146, 132, -2, 3, { ry: 21, prx: 11, pry: 13, g: 4 }),
    ],
    brows: ['M80 98 Q93 100 106 106', 'M134 106 Q147 100 160 98'],
    mouth: { type: 'line', d: 'M110 170 L130 170' },
    glow: 24,
  },
  animando: {
    arms: [
      { d: 'M50 148 Q20 162 38 190', hand: [42, 193], front: true },
      { d: 'M190 142 Q212 118 206 92', hand: [206, 86], handR: 11 },
    ],
    eyes: [{ type: 'closed', d: 'M78 132 Q94 118 110 132' }, openEye(146, 128, -1, 2)],
    brows: ['M80 102 Q92 96 104 101', 'M136 90 Q148 84 160 90'],
    mouth: { type: 'open', d: 'M104 160 Q122 184 138 157 Z' },
    sparkles: [
      [226, 60, 10],
      [184, 58, 6],
    ],
  },
  confundido: {
    arms: [
      { d: 'M50 150 Q30 160 27 184', hand: [26, 189] },
      { d: 'M190 142 Q216 118 200 92', hand: [198, 88] },
    ],
    eyes: [openEye(94, 128, -3, -4, { g: 4 }), openEye(146, 128, 1, 7, { g: 4 })],
    brows: ['M80 90 Q92 83 104 89', 'M136 98 Q148 96 160 102'],
    mouth: { type: 'line', d: 'M106 168 Q113 162 120 168 Q127 174 134 168' },
    tilt: -6,
  },
  orgulloso: {
    arms: [
      { d: 'M48 148 Q20 160 36 190', hand: [40, 193], front: true },
      { d: 'M192 148 Q220 160 204 190', hand: [200, 193], front: true },
    ],
    eyes: [
      { type: 'closed', d: 'M78 124 Q94 138 110 124' },
      { type: 'closed', d: 'M130 124 Q146 138 162 124' },
    ],
    brows: ['M80 98 Q92 91 104 95', 'M136 95 Q148 91 160 98'],
    mouth: { type: 'line', d: 'M104 160 Q122 176 138 157' },
    gold: true,
    sparkles: [
      [196, 40, 12],
      [36, 53, 7],
      [150, 188, 6],
      [90, 206, 5],
    ],
  },
};

/** Destello de 4 puntas centrado en (x, y). */
export function sparklePath(x: number, y: number, s: number): string {
  return `M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s} Z`;
}

/** Núcleo-rombo con hendidura triangular (posición canónica en el pecho). */
export const CORE_PATH = 'M108 196 L115.5 186.5 L120 192 L124.5 186.5 L132 196 L120 209 Z';
export const CORE_GLINT_PATH = 'M112 196 L115.5 191.5 L117.5 194 Z';
export const EXT_TRIANGLE_PATH = 'M64 88 L78 40 Q84 22 95 35 L126 84 Z';

export const KUBI_EXPRESSIONS = Object.keys(POSES) as KubiExpression[];
