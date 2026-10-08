# Akya Mantar — Kurumsal Web Sitesi

Statik site. Kaynak `src/` + `assets/`, çıktı `dist/` (sunucuya yüklenecek klasör).

```bash
npm run build   # dist/ üretir
npm run serve   # derler + http://localhost:8080
```

## Düzenleme
- Firma bilgileri (telefon, e-posta, adres, harita): `src/data.mjs` → `SITE`
- Ürünler: `src/data.mjs` → `PRODUCTS` (yeni ürün eklenince detay sayfası otomatik oluşur)
- Ürün fotoğrafı: `assets/img/urunler/<dosya>.jpg` koy, ürüne `photo: '<dosya>.jpg'` ekle
- Logo: `assets/img/logo-mark.svg` (şu an geçici çizim — orijinal dosyayla değiştir)
- Sayfa metinleri: `src/pages.mjs`, ortak header/footer: `src/layout.mjs`
- Stil: `assets/css/style.css`

## Yayın (GitHub Pages)
Önizleme: https://mertcilli.github.io/akyamantar/ — `gh-pages` dalından yayınlanır.

```bash
npm run deploy   # derler + dist/ klasörünü gh-pages dalına yükler
```
