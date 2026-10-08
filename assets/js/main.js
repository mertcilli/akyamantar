(() => {
  // Header gölgesi
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobil menü
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('ana-menu');
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Menüyü aç' : 'Menüyü kapat');
    nav.classList.toggle('open', !open);
  });

  // Ürün filtresi
  const chips = document.querySelectorAll('.chip[data-filter]');
  const cards = document.querySelectorAll('#urun-listesi .product-card');
  const empty = document.querySelector('.empty-state');
  chips.forEach((chip) => chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    let shown = 0;
    cards.forEach((card) => {
      const match = f === 'hepsi' || card.dataset.forms.split(' ').includes(f);
      card.hidden = !match;
      if (match) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }));

  // Kurumsal alt menü aktif bölüm
  const subLinks = document.querySelectorAll('.subnav a');
  if (subLinks.length && 'IntersectionObserver' in window) {
    const map = new Map([...subLinks].map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          subLinks.forEach((a) => a.classList.remove('active'));
          map.get(e.target.id)?.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  // İletişim formu (sunucu olmadan e-posta istemcisini açar)
  const form = document.getElementById('iletisim-formu');
  if (form) {
    const urun = new URLSearchParams(location.search).get('urun');
    if (urun) form.urun.value = urun;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const err = form.querySelector('.form-error');
      let ok = true;
      ['ad', 'eposta', 'mesaj'].forEach((n) => {
        const el = form.elements[n];
        const valid = el.value.trim() && (n !== 'eposta' || el.checkValidity());
        el.setAttribute('aria-invalid', String(!valid));
        if (!valid) ok = false;
      });
      err.hidden = ok;
      if (!ok) return;

      const f = form.elements;
      const urunAdi = f.urun.value ? f.urun.options[f.urun.selectedIndex].text : 'Genel bilgi';
      const subject = `Web sitesi bilgi talebi – ${urunAdi}`;
      const body = [
        `Ad Soyad: ${f.ad.value}`,
        `Firma: ${f.firma.value}`,
        `E-posta: ${f.eposta.value}`,
        `Telefon: ${f.telefon.value}`,
        `Ürün: ${urunAdi}`,
        '',
        f.mesaj.value,
      ].join('\n');
      location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
