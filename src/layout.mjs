import { SITE, NAV } from './data.mjs';

const year = new Date().getFullYear();

const logo = `
  <img src="{{root}}assets/img/logo-mark.svg" alt="" width="56" height="48">
  <span class="brand-text">
    <span class="brand-name">AKYA MANTAR</span>
    <span class="brand-sub">Dış Ticaret A.Ş.</span>
  </span>`;

function header(active) {
  const links = NAV.map((n) =>
    `<li><a href="{{root}}${n.href}"${n.key === active ? ' aria-current="page"' : ''}>${n.label}</a></li>`
  ).join('');
  return `
<a class="skip-link" href="#icerik">İçeriğe geç</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="{{root}}index.html" aria-label="Akya Mantar anasayfa">${logo}</a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="ana-menu" aria-label="Menüyü aç">
      <span></span><span></span><span></span>
    </button>
    <nav class="main-nav" id="ana-menu" aria-label="Ana menü">
      <ul>${links}</ul>
      <a class="btn btn-sm" href="{{root}}iletisim.html">Bilgi Alın</a>
    </nav>
  </div>
</header>`;
}

function footer() {
  return `
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <a class="brand brand-light" href="{{root}}index.html">${logo}</a>
      <p class="footer-about">Anadolu’nun ormanlarından toplanan doğa mantarlarını seçen, işleyen ve dünya pazarlarına ulaştıran ihracat firması.</p>
    </div>
    <div>
      <h3>Kurumsal</h3>
      <ul>
        <li><a href="{{root}}kurumsal.html#hakkimizda">Hakkımızda</a></li>
        <li><a href="{{root}}kurumsal.html#vizyon-misyon">Vizyon &amp; Misyon</a></li>
        <li><a href="{{root}}kurumsal.html#kalite">Kalite ve Sürdürülebilirlik</a></li>
      </ul>
    </div>
    <div>
      <h3>Ürünler</h3>
      <ul>
        <li><a href="{{root}}urunler.html">Tüm Ürünler</a></li>
        <li><a href="{{root}}urunler.html#sezon-takvimi">Sezon Takvimi</a></li>
        <li><a href="{{root}}urunler/ayi-mantari.html">Ayı Mantarı</a></li>
        <li><a href="{{root}}urunler/cam-mantari.html">Çam Mantarı</a></li>
      </ul>
    </div>
    <div>
      <h3>İletişim</h3>
      <address>
        <p>${SITE.address}</p>
        <p><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></p>
        <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
      </address>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© ${year} ${SITE.legalName} Tüm hakları saklıdır.</p>
  </div>
</footer>`;
}

export function page({ title, description, active, body, root = '' }) {
  const fullTitle = title ? `${title} | Akya Mantar` : 'Akya Mantar Dış Ticaret A.Ş. | Doğa Mantarı İhracatı';
  const html = `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><!-- Önizleme: site yayına alınınca kaldırın -->
<title>${fullTitle}</title>
<meta name="description" content="${description}">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#8E2B2B">
<link rel="icon" href="{{root}}assets/img/logo-mark.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{{root}}assets/css/style.css">
</head>
<body>
${header(active)}
<main id="icerik">
${body}
</main>
${footer()}
<script src="{{root}}assets/js/main.js" defer></script>
</body>
</html>
`;
  return html.replaceAll('{{root}}', root);
}

export function pageHero({ eyebrow, title, lead, crumbs = [] }) {
  const bc = crumbs.length
    ? `<nav class="breadcrumb" aria-label="Sayfa yolu"><ol>${crumbs
        .map((c, i) => (i === crumbs.length - 1 ? `<li aria-current="page">${c.label}</li>` : `<li><a href="{{root}}${c.href}">${c.label}</a></li>`))
        .join('')}</ol></nav>`
    : '';
  return `
<section class="page-hero">
  <div class="container">
    ${bc}
    ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>
</section>`;
}
