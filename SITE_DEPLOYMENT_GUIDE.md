# Site Deployment Rehberi

Bu rehber, Bakırcılar Grup altı şirket web sitesini Vercel'e deploy etmek için adım adım talimatları içerir.

## 📋 Siteler ve Domainler

| Site | Port (Dev) | Domain | Klasör |
|------|-----------|---------|---------|
| **Ana Holding** | 3000 | bakircilargrup.com | apps/main |
| **Ambalaj** | 3001 | bakircilarambalaj.com | apps/ambalaj |
| **Yazılım** | 3002 | bakircilaryazilim.com | apps/yazilim |
| **Danışmanlık** | 3003 | bakircilardanismanlik.com | apps/danismanlik |
| **Emlak** | 3004 | bakircilaremlak.com | apps/emlak |
| **Otomotiv** | 3005 | bakircilaroto.com | apps/otomotiv |

**Not:** Yolpilot (yolpilot.com) zaten hazır olduğu için bu rehbere dahil edilmemiştir.

---

## 🚀 Hızlı Deployment (Tek Komut)

Her siteyi ayrı ayrı deploy etmek için:

```bash
# Ana Holding
cd apps/main && vercel --prod

# Ambalaj
cd apps/ambalaj && vercel --prod

# Yazılım
cd apps/yazilim && vercel --prod

# Danışmanlık
cd apps/danismanlik && vercel --prod

# Emlak
cd apps/emlak && vercel --prod

# Otomotiv
cd apps/otomotiv && vercel --prod
```

---

## 📝 Detaylı Deployment Adımları

### 1. Ön Hazırlık

#### A) Vercel CLI Kurulumu
```bash
npm install -g vercel
```

#### B) Vercel Login
```bash
vercel login
```

#### C) Proje Dizinine Git
```bash
cd C:\Users\ucare\OneDrive\Masaüstü\projects\bakircilar-grup
```

---

### 2. Her Site için Deployment

Her site için aşağıdaki adımları tekrarlayın:

#### **Site 1: Ana Holding (bakircilargrup.com)**

```bash
# Klasöre git
cd apps/main

# İlk deployment (test)
vercel

# Production deployment
vercel --prod
```

**Vercel Dashboard Ayarları:**
- **Project Name:** bakircilar-grup-main
- **Framework:** Next.js
- **Root Directory:** `apps/main`
- **Build Command:** `cd ../.. && npm install && cd apps/main && npm run build`
- **Output Directory:** `.next`
- **Install Command:** `cd ../.. && npm install`

**Environment Variables (Vercel Dashboard):**
```
NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL=https://bakircilargrup.com
```

**Custom Domain Ayarları:**
1. Vercel Dashboard → Project Settings → Domains
2. `bakircilargrup.com` ekle
3. `www.bakircilargrup.com` ekle (redirect to non-www)

---

#### **Site 2: Ambalaj (bakircilarambalaj.com)**

```bash
# Ana dizine dön
cd ../..

# Klasöre git
cd apps/ambalaj

# Deployment
vercel --prod
```

**Vercel Dashboard Ayarları:**
- **Project Name:** bakircilar-ambalaj
- **Framework:** Next.js
- **Root Directory:** `apps/ambalaj`
- **Build Command:** `cd ../.. && npm install && cd apps/ambalaj && npm run build`

**Environment Variables:**
```
NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL=https://bakircilarambalaj.com
```

**Custom Domain:** `bakircilarambalaj.com`

---

#### **Site 3: Yazılım (bakircilaryazilim.com)**

```bash
cd ../..
cd apps/yazilim
vercel --prod
```

**Vercel Dashboard Ayarları:**
- **Project Name:** bakircilar-yazilim
- **Root Directory:** `apps/yazilim`
- **Build Command:** `cd ../.. && npm install && cd apps/yazilim && npm run build`

**Environment Variables:**
```
NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL=https://bakircilaryazilim.com
```

**Custom Domain:** `bakircilaryazilim.com`

---

#### **Site 4: Danışmanlık (bakircilardanismanlik.com)**

```bash
cd ../..
cd apps/danismanlik
vercel --prod
```

**Vercel Dashboard Ayarları:**
- **Project Name:** bakircilar-danismanlik
- **Root Directory:** `apps/danismanlik`
- **Build Command:** `cd ../.. && npm install && cd apps/danismanlik && npm run build`

**Environment Variables:**
```
NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL=https://bakircilardanismanlik.com
```

**Custom Domain:** `bakircilardanismanlik.com`

---

#### **Site 5: Emlak (bakircilaremlak.com)**

```bash
cd ../..
cd apps/emlak
vercel --prod
```

**Vercel Dashboard Ayarları:**
- **Project Name:** bakircilar-emlak
- **Root Directory:** `apps/emlak`
- **Build Command:** `cd ../.. && npm install && cd apps/emlak && npm run build`

**Environment Variables:**
```
NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL=https://bakircilaremlak.com
```

**Custom Domain:** `bakircilaremlak.com`

---

#### **Site 6: Otomotiv (bakircilaroto.com)**

```bash
cd ../..
cd apps/otomotiv
vercel --prod
```

**Vercel Dashboard Ayarları:**
- **Project Name:** bakircilar-otomotiv
- **Root Directory:** `apps/otomotiv`
- **Build Command:** `cd ../.. && npm install && cd apps/otomotiv && npm run build`

**Environment Variables:**
```
NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL=https://bakircilaroto.com
```

**Custom Domain:** `bakircilaroto.com`

---

## 🌐 Domain Yönlendirme Ayarları

Her domain için DNS kayıtlarını aşağıdaki gibi yapılandırın:

### Vercel A Kaydı
Tüm domainler için aynı IP'yi kullanın:
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

### WWW Yönlendirmesi (Opsiyonel)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Domain Listesi
Her birini Vercel Dashboard'da ekleyin:
- ✅ bakircilargrup.com
- ✅ bakircilarambalaj.com
- ✅ bakircilaryazilim.com
- ✅ bakircilardanismanlik.com
- ✅ bakircilaremlak.com
- ✅ bakircilaroto.com

---

## 🔧 Domain Sağlayıcı Ayarları

Domain sağlayıcınızda (GoDaddy, Namecheap, vb.) DNS yönetim paneline girin:

### Örnek: GoDaddy

1. **My Products** → **Domains** → Domain seç
2. **DNS Management** → **DNS Records**
3. A kaydı ekle:
   - **Type:** A
   - **Name:** @
   - **Value:** 76.76.21.21
   - **TTL:** 1 Hour

4. CNAME ekle (www için):
   - **Type:** CNAME
   - **Name:** www
   - **Value:** cname.vercel-dns.com
   - **TTL:** 1 Hour

5. **Save** tıklayın

### Örnek: Namecheap

1. **Domain List** → **Manage**
2. **Advanced DNS**
3. **Add New Record:**
   - **Type:** A Record
   - **Host:** @
   - **Value:** 76.76.21.21
   - **TTL:** Automatic

4. **Add New Record:**
   - **Type:** CNAME
   - **Host:** www
   - **Value:** cname.vercel-dns.com
   - **TTL:** Automatic

5. **Save All Changes**

---

## 🔒 SSL Sertifikaları

Vercel otomatik olarak Let's Encrypt SSL sertifikası sağlar. Domain eklendikten 24 saat içinde aktif hale gelir.

**Kontrol:**
1. Vercel Dashboard → Project → Settings → Domains
2. Her domain yanında **SSL** durumu **Active** olmalı

---

## ✅ Deployment Checklist

Her site için:

### Pre-Deployment
- [ ] `.env.example` dosyası mevcut
- [ ] `vercel.json` yapılandırılmış
- [ ] Domain satın alındı
- [ ] Vercel hesabı aktif

### Deployment
- [ ] `vercel --prod` çalıştırıldı
- [ ] Build başarılı
- [ ] Preview URL'i çalışıyor

### Post-Deployment
- [ ] Domain DNS ayarları yapıldı
- [ ] Vercel'de custom domain eklendi
- [ ] SSL aktif
- [ ] Site yayında ve çalışıyor
- [ ] 4 dil (TR/EN/DE/ES) çalışıyor
- [ ] API bağlantısı test edildi

---

## 🎯 Test Adımları

Her site için:

1. **Preview URL Test:**
```bash
# Deploy sonrası Vercel'in verdiği URL'i açın
https://bakircilar-xxx.vercel.app
```

2. **Domain Test:**
```bash
# DNS yayılmasını bekleyin (24-48 saat)
https://bakircilargrup.com
```

3. **SSL Test:**
```bash
# HTTPS çalışmalı
https://bakircilargrup.com
```

4. **Çok Dilli Test:**
```bash
https://bakircilargrup.com/tr
https://bakircilargrup.com/en
https://bakircilargrup.com/de
https://bakircilargrup.com/es
```

5. **API Test:**
- İletişim formunu doldurun
- Haber listesine bakın
- Kariyer sayfasını kontrol edin

---

## 🔄 Güncelleme Yapmak

Değişiklik yaptıktan sonra:

```bash
# Değişiklikleri yap
# Test et
npm run dev

# Deploy et
cd apps/[site-name]
vercel --prod
```

**Otomatik Deployment:**
GitHub/GitLab'a push yapıldığında Vercel otomatik deploy eder (kurulum yapılmışsa).

---

## 🆘 Sorun Giderme

### Build Hatası

```bash
# Dependencies temizle
rm -rf node_modules package-lock.json
npm install

# Local build test
npm run build
```

### Domain Çalışmıyor

1. DNS yayılmasını kontrol et: `nslookup bakircilargrup.com`
2. 24-48 saat bekle
3. Vercel Dashboard'da domain durumunu kontrol et

### SSL Hatası

1. Domain DNS kayıtları doğru mu kontrol et
2. 24 saat bekle
3. Vercel support ile iletişime geç

### 404 Hatası

1. Routing yapılandırmasını kontrol et
2. `next.config.js` kontrol et
3. Middleware yapılandırmasını kontrol et

---

## 📊 Deployment Maliyeti

**Vercel:**
- Hobby Plan: **$0/mo** (her site için)
- Pro Plan: **$20/mo** (her site için)

**Toplam (6 site):**
- Hobby: **$0/mo**
- Pro: **$120/mo**

**Önerilen:** Başlangıç için Hobby Plan yeterlidir.

---

## 🔗 Faydalı Linkler

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)

---

## 📞 Destek

**Teknik Sorunlar:**
- Vercel Support: https://vercel.com/support
- GitHub Issues: Repository Issues

**Domain Sorunları:**
- Domain sağlayıcınızın support ekibi

---

## ✨ Deployment Sonrası

Tüm siteler yayına alındıktan sonra:

1. ✅ Her siteyi test edin
2. ✅ Google Search Console'a ekleyin
3. ✅ Google Analytics kurun
4. ✅ Sitemap gönderin
5. ✅ robots.txt kontrol edin
6. ✅ Monitoring kurun (Vercel Analytics)

---

**Hazırlayan:** Bakırcılar Grup IT Team
**Güncelleme:** 2024-11-18
**Versiyon:** 1.0.0
