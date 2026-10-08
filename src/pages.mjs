import { SITE, PRODUCTS, FORMS, MONTHS } from './data.mjs';
import { pageHero } from './layout.mjs';
import { productVisual } from './illustration.mjs';

const formTags = (p) => p.forms.map((f) => `<span class="tag">${FORMS[f]}</span>`).join('');

const seasonText = (p) => {
  const m = p.season;
  return m.length === 1 ? MONTHS[m[0] - 1] : `${MONTHS[m[0] - 1]} – ${MONTHS[m[m.length - 1] - 1]}`;
};

function productCard(p, root = '') {
  return `
<article class="product-card" data-forms="${p.forms.join(' ')}">
  <a href="${root}urunler/${p.slug}.html" class="product-card-link">
    <div class="product-visual">${productVisual(p)}</div>
    <div class="product-card-body">
      <p class="latin">${p.latin}</p>
      <h3>${p.name}</h3>
      <p class="trade">${p.trade}</p>
      <p class="summary">${p.summary}</p>
      <div class="card-meta">
        <span class="season-chip" title="Hasat sezonu">${seasonText(p)}</span>
        <div class="tags">${formTags(p)}</div>
      </div>
    </div>
  </a>
</article>`;
}

function seasonRow(p, root = '') {
  const cells = MONTHS.map((m, i) => `<td class="${p.season.includes(i + 1) ? 'on' : ''}"><span class="sr-only">${p.season.includes(i + 1) ? 'Sezon' : ''}</span></td>`).join('');
  return `<tr><th scope="row"><a href="${root}urunler/${p.slug}.html">${p.name}</a><small>${p.latin}</small></th>${cells}</tr>`;
}

const seasonTable = (root = '') => `
<div class="table-scroll">
  <table class="season-table">
    <caption class="sr-only">Ürünlerin aylara göre hasat sezonu</caption>
    <thead><tr><th scope="col">Ürün</th>${MONTHS.map((m) => `<th scope="col">${m}</th>`).join('')}</tr></thead>
    <tbody>${PRODUCTS.map((p) => seasonRow(p, root)).join('')}</tbody>
  </table>
</div>`;

/* ---------------- ANASAYFA ---------------- */
export function home() {
  const featured = ['ayi-mantari', 'cam-mantari', 'sarikiz-mantari', 'kuzugobegi-mantari']
    .map((s) => PRODUCTS.find((p) => p.slug === s));
  return `
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Doğa mantarı ihracatı</p>
      <h1>Anadolu ormanlarının mantarlarını <em>dünya sofralarına</em> taşıyoruz.</h1>
      <p class="lead">Akya Mantar; Türkiye’nin farklı yörelerinde, mevsiminde toplanan yenilebilir doğa mantarlarını seçer, işler ve uluslararası pazarlara ulaştırır.</p>
      <div class="hero-actions">
        <a class="btn" href="urunler.html">Ürünlerimiz</a>
        <a class="btn btn-ghost" href="kurumsal.html">Bizi Tanıyın</a>
      </div>
    </div>
    <div class="hero-visual" aria-hidden="true">
      <div class="hero-disc">
        <img src="assets/img/logo-mark.svg" alt="">
      </div>
      <div class="hero-badge hero-badge-1"><strong>8+</strong><span>doğa mantarı türü</span></div>
      <div class="hero-badge hero-badge-2"><strong>Yıl boyu</strong><span>kurutulmuş ve dondurulmuş ürünle tedarik</span></div>
    </div>
  </div>
</section>

<section class="stats" aria-label="Türkiye mantar potansiyeli">
  <div class="container stats-grid">
    <div><strong>20 milyon hektar</strong><span>Türkiye’deki orman alanı, mantarlar için geniş bir yetişme ortamı</span></div>
    <div><strong>~40</strong><span>yenebilen mantar türü doğadan toplanıyor</span></div>
    <div><strong>~25</strong><span>türün ticareti yapılıyor; pazarda satılıyor ya da ihraç ediliyor</span></div>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div>
      <p class="eyebrow">Neden Türkiye?</p>
      <h2>Zengin bir flora, eşsiz bir mantar potansiyeli</h2>
    </div>
    <div class="prose">
      <p>Ülkemiz, sahip olduğu flora ve iklim koşulları sayesinde doğa mantarları bakımından oldukça zengindir. Yenebilen mantar türleri pek çok yörede, yetiştikleri mevsimde toplanır; ya yemeklik olarak kullanılır ya da ticareti yapılır.</p>
      <p>Türkiye; 20 milyon hektarlık orman alanı, geniş tarım arazileri ve kırlık alanlarıyla mantarlar için çok elverişli bir yetişme ortamına sahiptir. Ekonomik değeri olan mantar türlerini tanıyıp koruyarak bu potansiyelden en iyi şekilde faydalanmak, Akya Mantar’ın çıkış noktasıdır.</p>
      <a class="text-link" href="kurumsal.html">Kurumsal sayfamız <span aria-hidden="true">→</span></a>
    </div>
  </div>
</section>

<section class="section section-tint">
  <div class="container">
    <div class="section-head">
      <div>
        <p class="eyebrow">Ürünlerimiz</p>
        <h2>Mevsiminde toplanan doğa mantarları</h2>
      </div>
      <a class="text-link" href="urunler.html">Tüm ürünler <span aria-hidden="true">→</span></a>
    </div>
    <div class="product-grid">${featured.map((p) => productCard(p)).join('')}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center">
      <div>
        <p class="eyebrow">Süreç</p>
        <h2>Ormandan ihracata</h2>
      </div>
    </div>
    <ol class="process">
      <li><span class="step">01</span><h3>Toplama</h3><p>Yöre toplayıcılarıyla, mevsiminde ve doğaya zarar vermeden hasat.</p></li>
      <li><span class="step">02</span><h3>Seçim &amp; Sınıflandırma</h3><p>Tür doğrulaması, boy, renk ve kalite kriterlerine göre ayrıştırma.</p></li>
      <li><span class="step">03</span><h3>İşleme</h3><p>Taze paketleme, kurutma, dondurma veya salamura olarak hazırlama.</p></li>
      <li><span class="step">04</span><h3>Soğuk Zincir &amp; Sevkiyat</h3><p>İzlenebilir partilerle, soğuk zincir korunarak alıcıya teslim.</p></li>
    </ol>
  </div>
</section>

<section class="cta">
  <div class="container cta-inner">
    <div>
      <h2>Ürünlerimiz ve sezon durumu hakkında bilgi alın</h2>
      <p>Tür, sunum şekli ve sezon bilgileri için ekibimizle iletişime geçin.</p>
    </div>
    <a class="btn btn-light" href="iletisim.html">İletişime Geçin</a>
  </div>
</section>`;
}

/* ---------------- KURUMSAL ---------------- */
export function kurumsal() {
  return `
${pageHero({
  eyebrow: 'Kurumsal',
  title: 'Doğadan gelen değeri özenle taşıyoruz',
  lead: 'Akya Mantar Dış Ticaret A.Ş., Türkiye’nin doğa mantarlarını tanıyan, koruyan ve dünya pazarına kazandıran bir ihracat firmasıdır.',
  crumbs: [{ href: 'index.html', label: 'Anasayfa' }, { label: 'Kurumsal' }],
})}

<nav class="subnav" aria-label="Kurumsal bölümler">
  <div class="container">
    <a href="#hakkimizda">Hakkımızda</a>
    <a href="#vizyon-misyon">Vizyon &amp; Misyon</a>
    <a href="#degerlerimiz">Değerlerimiz</a>
    <a href="#kalite">Kalite ve Sürdürülebilirlik</a>
  </div>
</nav>

<section class="section" id="hakkimizda">
  <div class="container split">
    <div>
      <p class="eyebrow">Hakkımızda</p>
      <h2>Anadolu’nun mantar zenginliğini ekonomiye kazandırıyoruz</h2>
    </div>
    <div class="prose">
      <p>Ülkemiz, sahip olduğu flora ve iklim koşulları sayesinde doğa mantarları bakımından oldukça zengindir. Yenebilen mantar türleri pek çok yörede, yetiştikleri mevsimde toplanır; ya yemeklik olarak kullanılır ya da ticareti yapılır.</p>
      <p>Türkiye; 20 milyon hektarlık orman alanı, geniş tarım arazileri ve kırlık alanlarıyla mantarlar için çok elverişli bir yetişme ortamına sahiptir. Ancak bu potansiyelden henüz tam olarak yararlandığımız söylenemez. Ekonomik değeri olan mantar türlerini tanımak, korumak ve bu türlerden en iyi şekilde yararlanmanın yollarını bulmak zorundayız.</p>
      <p>Araştırmalara göre bugün 40 civarında yenebilen mantar türü doğadan toplanmaktadır. Bunların 25’e yakını pazarlarda satılmakta ya da yurt dışına ihraç edilmektedir.</p>
      <p>Akya Mantar olarak bu potansiyeli; yöre toplayıcılarıyla kurduğumuz güvenilir ilişkiler, titiz seçim ve işleme süreçlerimiz, uluslararası alıcılarla sürdürdüğümüz uzun soluklu iş birlikleri sayesinde değere dönüştürüyoruz.</p>
    </div>
  </div>
</section>

<section class="section section-tint" id="vizyon-misyon">
  <div class="container two-cards">
    <article class="info-card">
      <p class="eyebrow">Vizyonumuz</p>
      <h2>Türk doğa mantarlarının dünyadaki güvenilir adresi olmak</h2>
      <p>Türkiye’nin mantar çeşitliliğini uluslararası pazarlarda kalitesiyle tanınan bir marka değerine dönüştürmek.</p>
    </article>
    <article class="info-card">
      <p class="eyebrow">Misyonumuz</p>
      <h2>Doğayı koruyarak değer üretmek</h2>
      <p>Ekonomik değeri olan mantar türlerini tanımak, sürdürülebilir şekilde toplanmasını sağlamak ve yüksek kalite standartlarıyla işleyerek alıcılarımıza zamanında ulaştırmak.</p>
    </article>
  </div>
</section>

<section class="section" id="degerlerimiz">
  <div class="container">
    <div class="section-head center"><div><p class="eyebrow">Değerlerimiz</p><h2>Çalışma ilkelerimiz</h2></div></div>
    <div class="values">
      <div><h3>Doğaya saygı</h3><p>Mantarın yetiştiği ekosistemi korumak, gelecek sezonların teminatıdır.</p></div>
      <div><h3>Kalite</h3><p>Tür doğrulamasından sevkiyata kadar her adımda tutarlı standartlar.</p></div>
      <div><h3>İzlenebilirlik</h3><p>Her partinin toplandığı yöre ve tarih bilgisiyle kayıt altında tutulması.</p></div>
      <div><h3>Güvenilirlik</h3><p>Açık iletişim, zamanında teslimat ve uzun soluklu iş birlikleri.</p></div>
    </div>
  </div>
</section>

<section class="section section-tint" id="kalite">
  <div class="container split">
    <div>
      <p class="eyebrow">Kalite ve Sürdürülebilirlik</p>
      <h2>Ormandan sofraya kontrollü bir süreç</h2>
    </div>
    <div class="prose">
      <p>Doğa mantarları hassas ürünlerdir; kaliteleri toplandıkları andan itibaren nasıl taşındıklarına ve işlendiklerine bağlıdır. Bu nedenle süreçlerimizi her aşamada kontrol altında tutuyoruz.</p>
      <ul class="check-list">
        <li><strong>Tür doğrulama:</strong> Teslim alınan her parti, deneyimli personel tarafından tür bazında kontrol edilir.</li>
        <li><strong>Sınıflandırma:</strong> Ürünler boy, renk, sertlik ve bütünlük kriterlerine göre ayrılır.</li>
        <li><strong>Hijyenik işleme:</strong> Temizleme, kurutma ve dondurma işlemleri gıda güvenliği kurallarına uygun yapılır.</li>
        <li><strong>Soğuk zincir:</strong> Taze ve dondurulmuş ürünlerde sıcaklık zinciri sevkiyata kadar korunur.</li>
        <li><strong>Sürdürülebilir toplama:</strong> Toplayıcılar, mantarın yetiştiği alanı ve misel yapısını koruyan yöntemler konusunda bilgilendirilir.</li>
      </ul>
      <!-- Sertifikalar (ör. HACCP, ISO 22000, BRC) varsa buraya eklenebilir. -->
    </div>
  </div>
</section>

<section class="cta">
  <div class="container cta-inner">
    <div><h2>Birlikte çalışalım</h2><p>Ürün ve sezon bilgisi için bizimle iletişime geçin.</p></div>
    <a class="btn btn-light" href="iletisim.html">İletişim</a>
  </div>
</section>`;
}

/* ---------------- ÜRÜNLER ---------------- */
export function urunler() {
  const filters = [['hepsi', 'Tümü'], ...Object.entries(FORMS)]
    .map(([k, v], i) => `<button type="button" class="chip" data-filter="${k}" aria-pressed="${i === 0}">${v}</button>`).join('');
  return `
${pageHero({
  eyebrow: 'Ürünler',
  title: 'Doğa mantarlarımız',
  lead: 'Türkiye’nin farklı ekolojik bölgelerinde, mevsiminde toplanan yenilebilir mantar türleri hakkında bilgi edinin.',
  crumbs: [{ href: 'index.html', label: 'Anasayfa' }, { label: 'Ürünler' }],
})}

<section class="section">
  <div class="container">
    <div class="filter-bar" role="group" aria-label="Sunum şekline göre filtrele">${filters}</div>
    <div class="product-grid" id="urun-listesi">${PRODUCTS.map((p) => productCard(p)).join('')}</div>
    <p class="empty-state" hidden>Bu sunum şeklinde ürün bulunmuyor.</p>
  </div>
</section>

<section class="section section-tint" id="sezon-takvimi">
  <div class="container">
    <div class="section-head">
      <div>
        <p class="eyebrow">Sezon Takvimi</p>
        <h2>Hangi mantar, hangi ayda?</h2>
      </div>
      <p class="muted">Sezonlar yağış ve sıcaklığa bağlı olarak yıldan yıla birkaç hafta değişebilir.</p>
    </div>
    ${seasonTable()}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head center"><div><p class="eyebrow">Sunum Şekilleri</p><h2>İhtiyaca göre işleme</h2></div></div>
    <div class="values">
      <div><h3>Taze</h3><p>Toplandığı gün sınıflandırılır, soğuk zincirle en kısa sürede sevk edilir.</p></div>
      <div><h3>Kurutulmuş</h3><p>Bütün veya dilim halinde, kontrollü ortamda kurutulur; böylece raf ömrü uzar.</p></div>
      <div><h3>Dondurulmuş</h3><p>Bütün, dilim veya küp halinde hızla dondurulur; sezon dışında da tedarik edilebilir.</p></div>
      <div><h3>Salamura</h3><p>Uygun türler tuzlu suda işlenerek dayanıklı hale getirilir.</p></div>
    </div>
  </div>
</section>`;
}

/* ---------------- ÜRÜN DETAY ---------------- */
export function urunDetay(p) {
  const others = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  const bar = MONTHS.map((m, i) => `<li class="${p.season.includes(i + 1) ? 'on' : ''}"><span>${m}</span></li>`).join('');
  return `
<section class="page-hero product-hero">
  <div class="container product-hero-grid">
    <div>
      <nav class="breadcrumb" aria-label="Sayfa yolu"><ol>
        <li><a href="../index.html">Anasayfa</a></li>
        <li><a href="../urunler.html">Ürünler</a></li>
        <li aria-current="page">${p.name}</li>
      </ol></nav>
      <p class="latin">${p.latin}</p>
      <h1>${p.name}</h1>
      <p class="trade">${p.trade}${p.otherNames.length ? ` · Diğer adları: ${p.otherNames.join(', ')}` : ''}</p>
      <p class="lead">${p.summary}</p>
    </div>
    <div class="product-visual product-visual-lg">${productVisual(p)}</div>
  </div>
</section>

<section class="section">
  <div class="container detail-grid">
    <div class="prose">
      <h2>Ürün hakkında</h2>
      ${p.description.map((d) => `<p>${d}</p>`).join('')}

      <h2>Özellikler</h2>
      <dl class="spec-list">${p.features.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>

      <h2>Kullanım alanları</h2>
      <p>${p.usage}</p>

      <h2>Hasat sezonu</h2>
      <ol class="season-bar" aria-label="Hasat ayları: ${p.season.map((m) => MONTHS[m - 1]).join(', ')}">${bar}</ol>
    </div>

    <aside class="facts">
      <h2>Kısa bilgi</h2>
      <dl>
        <div><dt>Latince adı</dt><dd><em>${p.latin}</em></dd></div>
        <div><dt>Ticari adı</dt><dd>${p.trade}</dd></div>
        <div><dt>Sezon</dt><dd>${seasonText(p)}</dd></div>
        <div><dt>Yetiştiği bölgeler</dt><dd>${p.regions.join(', ')}</dd></div>
        <div><dt>Sunum şekilleri</dt><dd class="tags">${formTags(p)}</dd></div>
      </dl>
      <a class="btn btn-block" href="../iletisim.html?urun=${p.slug}">Bu ürün hakkında bilgi alın</a>
    </aside>
  </div>
</section>

<section class="section section-tint">
  <div class="container">
    <div class="section-head">
      <div><p class="eyebrow">Diğer ürünler</p><h2>Bunlar da ilginizi çekebilir</h2></div>
      <a class="text-link" href="../urunler.html">Tüm ürünler <span aria-hidden="true">→</span></a>
    </div>
    <div class="product-grid product-grid-3">${others.map((o) => productCard(o, '../')).join('')}</div>
  </div>
</section>`;
}

/* ---------------- İLETİŞİM ---------------- */
export function iletisim() {
  const options = PRODUCTS.map((p) => `<option value="${p.slug}">${p.name}</option>`).join('');
  const map = SITE.mapEmbed
    ? `<iframe src="${SITE.mapEmbed}" title="Akya Mantar konum haritası" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
    : `<div class="map-placeholder"><p>Harita, adres bilgisi eklendiğinde burada görünecek.</p></div>`;
  return `
${pageHero({
  eyebrow: 'İletişim',
  title: 'Bizimle iletişime geçin',
  lead: 'Ürünlerimiz, sezon durumu ve iş birliği talepleriniz için bize ulaşın.',
  crumbs: [{ href: 'index.html', label: 'Anasayfa' }, { label: 'İletişim' }],
})}

<section class="section">
  <div class="container contact-grid">
    <div class="contact-info">
      <div class="contact-item">
        <h2>Adres</h2>
        <address>${SITE.address}</address>
      </div>
      <div class="contact-item">
        <h2>Telefon</h2>
        <p><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></p>
      </div>
      <div class="contact-item">
        <h2>E-posta</h2>
        <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
      </div>
      <div class="contact-item">
        <h2>Çalışma saatleri</h2>
        <p>${SITE.hours}</p>
      </div>
    </div>

    <form class="contact-form" id="iletisim-formu" data-email="${SITE.email}" novalidate>
      <h2>Mesaj gönderin</h2>
      <div class="field-row">
        <div class="field">
          <label for="ad">Ad Soyad</label>
          <input id="ad" name="ad" autocomplete="name" required>
        </div>
        <div class="field">
          <label for="firma">Firma</label>
          <input id="firma" name="firma" autocomplete="organization">
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="eposta">E-posta</label>
          <input id="eposta" name="eposta" type="email" autocomplete="email" required>
        </div>
        <div class="field">
          <label for="telefon">Telefon</label>
          <input id="telefon" name="telefon" type="tel" autocomplete="tel">
        </div>
      </div>
      <div class="field">
        <label for="urun">İlgilendiğiniz ürün</label>
        <select id="urun" name="urun">
          <option value="">Genel bilgi</option>
          ${options}
        </select>
      </div>
      <div class="field">
        <label for="mesaj">Mesajınız</label>
        <textarea id="mesaj" name="mesaj" rows="5" required></textarea>
      </div>
      <p class="form-error" role="alert" hidden>Lütfen ad, geçerli bir e-posta ve mesaj alanlarını doldurun.</p>
      <button class="btn" type="submit">Gönder</button>
      <p class="form-note">Gönder’e bastığınızda e-posta uygulamanız mesajınızla birlikte açılır.</p>
    </form>
  </div>
</section>

<section class="map-section" aria-label="Konum">${map}</section>`;
}
