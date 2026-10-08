// Statik siteyi dist/ klasörüne üretir:  node build.mjs
import { mkdirSync, writeFileSync, rmSync, cpSync } from 'node:fs';
import { PRODUCTS } from './src/data.mjs';
import { page } from './src/layout.mjs';
import * as P from './src/pages.mjs';

const OUT = 'dist';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(`${OUT}/urunler`, { recursive: true });
cpSync('assets', `${OUT}/assets`, { recursive: true });

const pages = [
  ['index.html', { active: 'home', description: 'Akya Mantar Dış Ticaret A.Ş. — Türkiye’nin doğa mantarlarını seçen, işleyen ve dünya pazarlarına ihraç eden firma.', body: P.home() }],
  ['kurumsal.html', { title: 'Kurumsal', active: 'kurumsal', description: 'Akya Mantar hakkında: hakkımızda, vizyon ve misyon, değerlerimiz, kalite ve sürdürülebilirlik.', body: P.kurumsal() }],
  ['urunler.html', { title: 'Ürünler', active: 'urunler', description: 'Ayı mantarı, çam mantarı, sarıkız, kuzugöbeği, kanlıca, borazan, kirpi mantarı ve yaz trüfü hakkında bilgiler ve sezon takvimi.', body: P.urunler() }],
  ['iletisim.html', { title: 'İletişim', active: 'iletisim', description: 'Akya Mantar iletişim bilgileri ve iletişim formu.', body: P.iletisim() }],
  ...PRODUCTS.map((p) => [`urunler/${p.slug}.html`, {
    title: `${p.name} (${p.latin})`, active: 'urunler', root: '../',
    description: `${p.name} (${p.latin}, ${p.trade}): ${p.summary}`, body: P.urunDetay(p),
  }]),
];

for (const [file, opts] of pages) {
  writeFileSync(`${OUT}/${file}`, page(opts));
  console.log('✓', file);
}
