# Hızlı Deployment Rehberi

5 dakikada tüm siteleri deploy edin!

---

## 🎯 İki Deployment Yöntemi

### Yöntem 1: GitHub Entegrasyonu (ÖNERİLEN) ⭐

**Avantajlar:**
- ✅ Otomatik deployment (git push → otomatik deploy)
- ✅ Preview deployments
- ✅ Kolay rollback
- ✅ Versiyon kontrolü

**Adımlar:**
1. GitHub'da repository oluştur
2. Kodu push et
3. Vercel'de "Import Git Repository"
4. Otomatik deployment

**Detaylı Rehber:** [GIT_SETUP_GUIDE.md](GIT_SETUP_GUIDE.md)

### Yöntem 2: Vercel CLI (Manuel)

**Avantajlar:**
- ✅ Hızlı başlangıç
- ✅ Git gerekmez

**Dezavantajlar:**
- ❌ Her güncelleme için manuel deploy
- ❌ Versiyon kontrolü yok

---

## ⚡ Yöntem 1: GitHub ile Deployment (Önerilen)

### Adım 1: Git Başlat (1 dakika)

```bash
# Proje dizinine git
cd C:\Users\ucare\OneDrive\Masaüstü\projects\bakircilar-grup

# Git başlat
git init
git add .
git commit -m "Initial commit: Bakırcılar Grup websites"
```

### Adım 2: GitHub'a Push (2 dakika)

```bash
# GitHub'da repository oluşturun: bakircilar-grup

# Remote ekle (YOUR-USERNAME değiştirin)
git remote add origin https://github.com/YOUR-USERNAME/bakircilar-grup.git
git branch -M main
git push -u origin main
```

### Adım 3: Vercel'de Import (2 dakika)

1. https://vercel.com/new
2. **Import Git Repository** seçin
3. `bakircilar-grup` repository'sini seçin
4. Her site için:
   - Root Directory belirtin (örn: `apps/main`)
   - Environment variables ekleyin
   - Deploy tıklayın

**Detaylar:** [GIT_SETUP_GUIDE.md](GIT_SETUP_GUIDE.md)

---

## ⚡ Yöntem 2: Vercel CLI ile Deployment

### Adım 1: Vercel Kurulumu (1 dakika)

```bash
# Vercel CLI yükle
npm install -g vercel

# Login
vercel login
```

### Adım 2: Tüm Siteleri Deploy Et (3 dakika)

**Windows:**
```bash
cd C:\Users\ucare\OneDrive\Masaüstü\projects\bakircilar-grup
.\scripts\deploy-all-sites.bat
```

**Mac/Linux:**
```bash
cd ~/projects/bakircilar-grup
chmod +x scripts/deploy-all-sites.sh
./scripts/deploy-all-sites.sh
```

### Adım 3: Domain Ayarları (1 dakika)

Her domain için DNS panelinde:
```
A Record:
  Name: @
  Value: 76.76.21.21

CNAME Record:
  Name: www
  Value: cname.vercel-dns.com
```

**O kadar!** 24-48 saat içinde siteler yayında olacak.

---

## 🎯 Tek Tek Deploy

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

## 📋 Domain Listesi

Aşağıdaki domainleri hazır bulundurun:

- ✅ bakircilargrup.com
- ✅ bakircilarambalaj.com
- ✅ bakircilaryazilim.com
- ✅ bakircilardanismanlik.com
- ✅ bakircilaremlak.com
- ✅ bakircilaroto.com

---

## 🔧 Vercel Dashboard Ayarları

Her proje için:

1. **Settings** → **Environment Variables**
2. Ekle:
   ```
   NEXT_PUBLIC_API_URL = https://api.bakircilargrup.com/api
   NEXT_PUBLIC_SITE_URL = https://[domain]
   ```

3. **Settings** → **Domains**
4. Domain ekle ve SSL aktif olana kadar bekle

---

## ✅ Test Checklist

Deploy sonrası test:

- [ ] Preview URL açılıyor mu?
- [ ] Custom domain çalışıyor mu?
- [ ] SSL (HTTPS) aktif mi?
- [ ] 4 dil çalışıyor mu? (TR/EN/DE/ES)
- [ ] İletişim formu çalışıyor mu?
- [ ] Mobil görünüm düzgün mü?

---

## 🆘 Sorun mu Var?

**Build hatası:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Domain çalışmıyor:**
- DNS'i kontrol et: `nslookup domain.com`
- 24-48 saat bekle

**SSL yok:**
- 24 saat bekle
- Vercel'de domain durumunu kontrol et

---

## 📞 Yardım

Detaylı bilgi için:
- `SITE_DEPLOYMENT_GUIDE.md` - Tam rehber
- `DOMAIN_REFERENCE.md` - DNS ayarları
- `DEPLOYMENT.md` - Backend deployment

---

**Kolay gelsin!** 🚀
