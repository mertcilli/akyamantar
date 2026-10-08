// Ürün fotoğrafı yokken kullanılan vektör illüstrasyonlar.
// Gerçek fotoğraf eklemek için: assets/img/urunler/<slug>.jpg koyun ve products.photo alanını doldurun.

const STEM = '#F4ECDD';
const LINE = '#4A2E22';

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.max(0, Math.min(255, v + amt));
  const r = c(n >> 16), g = c((n >> 8) & 255), b = c(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

const shapes = {
  cap: (c) => `
    <path d="M88 104 C86 128 84 148 82 166 L118 166 C116 148 114 128 112 104 Z" fill="${STEM}" stroke="${LINE}" stroke-width="2"/>
    <path d="M40 104 C40 70 68 50 100 50 C132 50 160 70 160 104 C160 110 154 112 146 112 L54 112 C46 112 40 110 40 104 Z" fill="${c}" stroke="${LINE}" stroke-width="2"/>
    <path d="M60 80 C70 68 86 62 100 62" fill="none" stroke="${shade(c, 40)}" stroke-width="5" stroke-linecap="round" opacity=".6"/>`,
  bolete: (c) => `
    <path d="M78 100 C66 130 70 160 84 168 L120 168 C134 160 136 130 122 100 Z" fill="${STEM}" stroke="${LINE}" stroke-width="2"/>
    <path d="M84 130 l8 6 M104 124 l8 6 M92 146 l8 6 M112 142 l6 6" stroke="${shade(STEM, -40)}" stroke-width="1.5"/>
    <path d="M30 100 C30 58 64 36 100 36 C136 36 170 58 170 100 C170 108 162 110 150 110 L50 110 C38 110 30 108 30 100 Z" fill="${c}" stroke="${LINE}" stroke-width="2"/>
    <path d="M40 104 C70 100 130 100 160 104 C158 112 150 114 140 114 L60 114 C50 114 42 112 40 104 Z" fill="#E9D27A" stroke="${LINE}" stroke-width="1.6"/>
    <path d="M56 70 C70 54 88 48 104 48" fill="none" stroke="${shade(c, 50)}" stroke-width="6" stroke-linecap="round" opacity=".5"/>`,
  funnel: (c) => `
    <path d="M92 110 C90 132 88 150 90 168 L112 168 C114 150 112 132 108 110 Z" fill="${shade(c, 20)}" stroke="${LINE}" stroke-width="2"/>
    <path d="M40 66 C56 60 76 74 100 70 C124 66 144 58 162 68 C150 84 128 104 110 116 L92 116 C72 104 52 86 40 66 Z" fill="${c}" stroke="${LINE}" stroke-width="2"/>
    <path d="M60 80 L94 112 M80 84 L98 112 M120 84 L104 112 M140 78 L108 112" stroke="${shade(c, -40)}" stroke-width="1.6" opacity=".7"/>`,
  trumpet: (c) => `
    <path d="M62 54 C76 48 90 58 100 56 C112 54 126 46 140 52 C128 86 116 130 112 168 L90 168 C86 130 74 86 62 54 Z" fill="${c}" stroke="${shade(c, 60)}" stroke-width="2"/>
    <ellipse cx="101" cy="56" rx="30" ry="7" fill="${shade(c, -20)}" stroke="${shade(c, 60)}" stroke-width="1.5"/>
    <path d="M90 80 C94 110 96 140 98 162" stroke="${shade(c, 45)}" stroke-width="3" fill="none" opacity=".5"/>`,
  morel: (c) => `
    <path d="M84 120 C82 140 82 156 84 168 L118 168 C120 156 120 140 116 120 Z" fill="${STEM}" stroke="${LINE}" stroke-width="2"/>
    <path d="M100 26 C128 34 140 80 134 120 C120 126 80 126 66 120 C60 80 72 34 100 26 Z" fill="${c}" stroke="${LINE}" stroke-width="2"/>
    <g fill="${shade(c, -45)}">
      <ellipse cx="88" cy="52" rx="6" ry="9"/><ellipse cx="108" cy="48" rx="6" ry="9"/>
      <ellipse cx="80" cy="78" rx="6" ry="10"/><ellipse cx="98" cy="74" rx="6" ry="10"/><ellipse cx="118" cy="74" rx="6" ry="10"/>
      <ellipse cx="78" cy="104" rx="6" ry="10"/><ellipse cx="96" cy="102" rx="6" ry="10"/><ellipse cx="114" cy="102" rx="6" ry="10"/><ellipse cx="128" cy="96" rx="4" ry="9"/>
    </g>`,
  truffle: (c) => `
    <path d="M48 120 C42 92 66 66 100 66 C136 66 160 92 152 124 C146 152 122 166 98 166 C70 166 52 150 48 120 Z" fill="${c}" stroke="${shade(c, 40)}" stroke-width="2"/>
    <g fill="${shade(c, 35)}">
      ${[[70,92],[90,80],[112,82],[132,96],[62,118],[84,106],[106,104],[128,118],[74,140],[98,130],[120,142],[96,154],[140,138]]
        .map(([x, y]) => `<path d="M${x} ${y - 5} l5 5 -5 5 -5 -5 Z"/>`).join('')}
    </g>
    <path d="M150 140 C162 128 176 136 172 152 C168 164 152 166 146 156 Z" fill="#F1E6D4" stroke="${LINE}" stroke-width="1.6"/>
    <path d="M152 146 C158 150 162 154 164 160 M160 140 C162 148 166 152 170 154" stroke="#8A6A55" stroke-width="1.2" fill="none"/>`,
  spiny: (c) => `
    <path d="M90 112 C86 134 86 152 88 168 L114 168 C116 152 116 134 112 112 Z" fill="${STEM}" stroke="${LINE}" stroke-width="2"/>
    <g stroke="${shade(c, -30)}" stroke-width="3" stroke-linecap="round">
      ${Array.from({ length: 14 }, (_, i) => { const x = 52 + i * 7.5; return `<line x1="${x}" y1="104" x2="${x + 1}" y2="${114 + (i % 3) * 3}"/>`; }).join('')}
    </g>
    <path d="M36 98 C38 66 66 52 100 52 C136 52 164 66 164 98 C164 106 156 108 146 108 L54 108 C44 108 36 106 36 98 Z" fill="${c}" stroke="${LINE}" stroke-width="2"/>
    <path d="M58 76 C70 64 86 60 100 60" fill="none" stroke="${shade(c, 40)}" stroke-width="5" stroke-linecap="round" opacity=".6"/>`,
};

export function illustration(p) {
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${p.name} illüstrasyonu">
    <ellipse cx="100" cy="170" rx="70" ry="9" fill="#000" opacity=".08"/>
    ${(shapes[p.shape] || shapes.cap)(p.color)}
    <path d="M30 172 C40 164 46 166 50 172 M150 172 C156 162 164 162 170 172 M58 172 C62 166 66 166 68 172" stroke="#4CA14A" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`;
}

export function productVisual(p) {
  return p.photo
    ? `<img src="{{root}}assets/img/urunler/${p.photo}" alt="${p.name} (${p.latin})" loading="lazy">`
    : illustration(p);
}
