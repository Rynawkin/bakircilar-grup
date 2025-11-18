# Vercel Deployment - Adım Adım Rehber

Projeniz Git'e kaydedildi ve deployment için tamamen hazır! Şimdi GitHub'a yükleyip Vercel'de deploy edeceğiz.

---

## 📦 Durum: GIT HAZIR ✅

```
✅ Git repository başlatıldı
✅ Tüm dosyalar commit edildi (223 dosya)
✅ Main branch oluşturuldu
⏳ GitHub'a push bekleniyor
```

---

## ADIM 1: GitHub Repository Oluşturma (2 dakika)

### 1.1 GitHub'a Gidin

1. Tarayıcıda açın: https://github.com
2. Sağ üst köşede **+** butonuna tıklayın
3. **New repository** seçin

### 1.2 Repository Ayarları

**Önemli: Aşağıdaki ayarları TAM OLARAK yapın!**

```
Repository name: bakircilar-grup
Description: Bakırcılar Grup Corporate Websites - 6 Sites
```

**Görünürlük:**
- ⭐ **Private** seçin (önerilir) - Sadece siz görebilirsiniz
- VEYA **Public** - Herkes görebilir

**Initialize this repository:**
- ❌ **Add a README file** - İŞARETLEMEYİN! (zaten var)
- ❌ **Add .gitignore** - İŞARETLEMEYİN! (zaten var)
- ❌ **Choose a license** - İŞARETLEMEYİN!

### 1.3 Repository Oluştur

**Create repository** butonuna tıklayın.

---

## ADIM 2: GitHub'a Push (1 dakika)

Repository oluşturulduktan sonra GitHub size komutlar gösterecek. Aşağıdaki komutu kullanın:

### 2.1 Sizin GitHub Username'inizi Alın

GitHub'da oluşturduğunuz repository sayfasında **HTTPS** URL'ini kopyalayın.

Örnek: `https://github.com/YOUR-USERNAME/bakircilar-grup.git`

### 2.2 Terminalde Çalıştırın

**Aşağıdaki komutu kendi GitHub username'iniz ile çalıştırın:**

```bash
# YOUR-USERNAME kısmını değiştirin!
git remote add origin https://github.com/YOUR-USERNAME/bakircilar-grup.git

# Push edin
git push -u origin main
```

**Örnek:**
```bash
# Eğer username'iniz "mustafa" ise:
git remote add origin https://github.com/mustafa/bakircilar-grup.git
git push -u origin main
```

### 2.3 GitHub Doğrulama

GitHub username ve password (veya token) isteyecek:
- **Username:** GitHub kullanıcı adınız
- **Password:** GitHub şifreniz VEYA Personal Access Token

**Not:** 2021'den sonra GitHub şifre yerine token istiyor. Token oluşturmak için:
- GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token

---

## ADIM 3: Vercel'de Import Git Repository (5 dakika)

Artık GitHub'da kodunuz var. Şimdi Vercel'de her siteyi ayrı ayrı deploy edeceğiz.

### 3.1 Vercel'e Gidin

1. https://vercel.com adresine gidin
2. **Sign Up** veya **Log In** yapın
   - GitHub ile giriş yapın (önerilir)

### 3.2 GitHub'ı Vercel'e Bağlayın

İlk kez kullanıyorsanız:
1. **Import Git Repository** seçeneğinde
2. **Install Vercel on GitHub** tıklayın
3. Repository'nizi seçin: `bakircilar-grup`
4. **Install** tıklayın

---

## ADIM 4: Site 1 - Ana Holding (bakircilargrup.com)

### 4.1 Import Project

1. Vercel Dashboard: https://vercel.com/new
2. **Import Git Repository** seçin
3. `bakircilar-grup` repository'sini bulun
4. **Import** tıklayın

### 4.2 Configure Project

**ÖNEMLI: Aşağıdaki ayarları DİKKATLİCE yapın!**

```
Project Name: bakircilar-grup-main
Framework Preset: Next.js
```

**Root Directory:**
```
apps/main
```
↑ **ÇOK ÖNEMLİ!** Bu klasörü seçin. "Edit" butonuna tıklayıp `apps/main` yazın.

**Build and Output Settings:**
- Build Command: `cd ../.. && npm install && cd apps/main && npm run build`
- Output Directory: `.next`
- Install Command: `cd ../.. && npm install`

### 4.3 Environment Variables

**Environment Variables** bölümünde **Add** tıklayın:

```
Name: NEXT_PUBLIC_API_URL
Value: https://api.bakircilargrup.com/api
```

**Add** tekrar tıklayın:

```
Name: NEXT_PUBLIC_SITE_URL
Value: https://bakircilargrup.com
```

### 4.4 Deploy

**Deploy** butonuna tıklayın!

⏳ Build süreci 2-3 dakika sürer. Bekleyin...

✅ Deploy tamamlandığında **Preview URL** göreceksiniz.
Örnek: `https://bakircilar-grup-main-xxx.vercel.app`

### 4.5 Domain Ekle (Opsiyonel - Şimdilik Atlayabilirsiniz)

Deployment başarılı olduktan sonra:

1. Project Settings → Domains
2. **Add** tıklayın
3. `bakircilargrup.com` yazın
4. **Add** tıklayın
5. DNS ayarlarını gösterecek (bunu sonra yaparsınız)

---

## ADIM 5: Site 2 - Ambalaj (bakircilarambalaj.com)

**Aynı repository'den yeni bir proje oluşturacağız!**

### 5.1 Yeni Proje Oluştur

1. Vercel Dashboard: https://vercel.com/new
2. **Import Git Repository** seçin
3. AYNI `bakircilar-grup` repository'sini seçin
4. **Import** tıklayın

### 5.2 Configure Project

```
Project Name: bakircilar-ambalaj
Framework Preset: Next.js
```

**Root Directory:**
```
apps/ambalaj
```
↑ **DİKKAT!** Bu sefer `apps/ambalaj` seçin!

**Build and Output Settings:**
- Build Command: `cd ../.. && npm install && cd apps/ambalaj && npm run build`
- Output Directory: `.next`
- Install Command: `cd ../.. && npm install`

### 5.3 Environment Variables

```
NEXT_PUBLIC_API_URL = https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL = https://bakircilarambalaj.com
```

### 5.4 Deploy

**Deploy** tıklayın ve bekleyin!

---

## ADIM 6: Site 3 - Yazılım (bakircilaryazilim.com)

### 6.1 Yeni Proje

1. https://vercel.com/new
2. `bakircilar-grup` repository → Import

### 6.2 Configure

```
Project Name: bakircilar-yazilim
Root Directory: apps/yazilim
Build Command: cd ../.. && npm install && cd apps/yazilim && npm run build
```

### 6.3 Environment Variables

```
NEXT_PUBLIC_API_URL = https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL = https://bakircilaryazilim.com
```

### 6.4 Deploy

Deploy tıklayın!

---

## ADIM 7: Site 4 - Danışmanlık (bakircilardanismanlik.com)

### 7.1 Yeni Proje

1. https://vercel.com/new
2. `bakircilar-grup` repository → Import

### 7.2 Configure

```
Project Name: bakircilar-danismanlik
Root Directory: apps/danismanlik
Build Command: cd ../.. && npm install && cd apps/danismanlik && npm run build
```

### 7.3 Environment Variables

```
NEXT_PUBLIC_API_URL = https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL = https://bakircilardanismanlik.com
```

### 7.4 Deploy

Deploy tıklayın!

---

## ADIM 8: Site 5 - Emlak (bakircilaremlak.com)

### 8.1 Yeni Proje

1. https://vercel.com/new
2. `bakircilar-grup` repository → Import

### 8.2 Configure

```
Project Name: bakircilar-emlak
Root Directory: apps/emlak
Build Command: cd ../.. && npm install && cd apps/emlak && npm run build
```

### 8.3 Environment Variables

```
NEXT_PUBLIC_API_URL = https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL = https://bakircilaremlak.com
```

### 8.4 Deploy

Deploy tıklayın!

---

## ADIM 9: Site 6 - Otomotiv (bakircilaroto.com)

### 9.1 Yeni Proje

1. https://vercel.com/new
2. `bakircilar-grup` repository → Import

### 9.2 Configure

```
Project Name: bakircilar-otomotiv
Root Directory: apps/otomotiv
Build Command: cd ../.. && npm install && cd apps/otomotiv && npm run build
```

### 9.3 Environment Variables

```
NEXT_PUBLIC_API_URL = https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL = https://bakircilaroto.com
```

### 9.4 Deploy

Deploy tıklayın!

---

## ✅ Deployment Tamamlandı!

Artık 6 siteniz de Vercel'de deploy edildi!

### Preview URL'leriniz:

Her sitenin kendi URL'si var:

1. Ana Holding: `https://bakircilar-grup-main-xxx.vercel.app`
2. Ambalaj: `https://bakircilar-ambalaj-xxx.vercel.app`
3. Yazılım: `https://bakircilar-yazilim-xxx.vercel.app`
4. Danışmanlık: `https://bakircilar-danismanlik-xxx.vercel.app`
5. Emlak: `https://bakircilar-emlak-xxx.vercel.app`
6. Otomotiv: `https://bakircilar-otomotiv-xxx.vercel.app`

---

## ADIM 10: Domain Bağlama (Domainler Hazır Olduğunda)

Her site için:

### 10.1 Vercel'de Domain Ekle

1. Proje sayfasını açın (örn: bakircilar-grup-main)
2. **Settings** → **Domains**
3. **Add** tıklayın
4. Domain'i yazın (örn: `bakircilargrup.com`)
5. **Add** tıklayın

### 10.2 DNS Ayarları

Vercel size DNS ayarlarını gösterecek:

**A Record ekleyin:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**CNAME ekleyin (www için):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 10.3 SSL Bekle

- DNS yayılması: 24-48 saat
- SSL aktivasyonu: 1-24 saat
- Otomatik olur, bekleyin

---

## 🎯 Hızlı Referans Tablosu

| # | Site | Vercel Project | Root Directory | Domain |
|---|------|----------------|----------------|---------|
| 1 | Ana Holding | bakircilar-grup-main | apps/main | bakircilargrup.com |
| 2 | Ambalaj | bakircilar-ambalaj | apps/ambalaj | bakircilarambalaj.com |
| 3 | Yazılım | bakircilar-yazilim | apps/yazilim | bakircilaryazilim.com |
| 4 | Danışmanlık | bakircilar-danismanlik | apps/danismanlik | bakircilardanismanlik.com |
| 5 | Emlak | bakircilar-emlak | apps/emlak | bakircilaremlak.com |
| 6 | Otomotiv | bakircilar-otomotiv | apps/otomotiv | bakircilaroto.com |

---

## 🔄 Güncelleme Yapmak

Artık kod değişikliği yaptığınızda:

```bash
# Değişiklik yapın

# Git'e kaydedin
git add .
git commit -m "Anasayfa güncellendi"
git push

# ⚡ Vercel otomatik deploy eder! (30-60 saniye)
```

---

## 🆘 Sorun Giderme

### Build Hatası

1. Vercel'de Deployment → View Logs
2. Hatayı okuyun
3. Kodu düzeltin
4. `git push` yapın (otomatik tekrar deploy olur)

### Domain Çalışmıyor

1. DNS ayarlarını kontrol edin
2. 24-48 saat bekleyin
3. Vercel → Settings → Domains → SSL durumunu kontrol edin

### Environment Variables Eksik

1. Vercel → Settings → Environment Variables
2. Değişkenleri ekleyin
3. Redeploy edin: Deployments → ... → Redeploy

---

## 📋 Checklist

Her site için işaretleyin:

**Ana Holding:**
- [ ] Vercel'de proje oluşturuldu
- [ ] Root Directory: `apps/main` seçildi
- [ ] Environment Variables eklendi
- [ ] Deploy başarılı
- [ ] Preview URL test edildi
- [ ] Domain eklendi (opsiyonel)

**Ambalaj:**
- [ ] Vercel'de proje oluşturuldu
- [ ] Root Directory: `apps/ambalaj` seçildi
- [ ] Environment Variables eklendi
- [ ] Deploy başarılı
- [ ] Preview URL test edildi
- [ ] Domain eklendi (opsiyonel)

**Yazılım:**
- [ ] Vercel'de proje oluşturuldu
- [ ] Root Directory: `apps/yazilim` seçildi
- [ ] Environment Variables eklendi
- [ ] Deploy başarılı
- [ ] Preview URL test edildi
- [ ] Domain eklendi (opsiyonel)

**Danışmanlık:**
- [ ] Vercel'de proje oluşturuldu
- [ ] Root Directory: `apps/danismanlik` seçildi
- [ ] Environment Variables eklendi
- [ ] Deploy başarılı
- [ ] Preview URL test edildi
- [ ] Domain eklendi (opsiyonel)

**Emlak:**
- [ ] Vercel'de proje oluşturuldu
- [ ] Root Directory: `apps/emlak` seçildi
- [ ] Environment Variables eklendi
- [ ] Deploy başarılı
- [ ] Preview URL test edildi
- [ ] Domain eklendi (opsiyonel)

**Otomotiv:**
- [ ] Vercel'de proje oluşturuldu
- [ ] Root Directory: `apps/otomotiv` seçildi
- [ ] Environment Variables eklendi
- [ ] Deploy başarılı
- [ ] Preview URL test edildi
- [ ] Domain eklendi (opsiyonel)

---

## 🎉 Tebrikler!

Tüm siteleriniz başarıyla deploy edildi!

**Sonraki Adımlar:**
1. ✅ Preview URL'leri test edin
2. ✅ Domainleri bağlayın
3. ✅ DNS ayarlarını yapın
4. ✅ 24-48 saat bekleyin (DNS yayılması)
5. ✅ SSL aktif olana kadar bekleyin
6. ✅ Production URL'leri test edin

**Destek:**
- Vercel Docs: https://vercel.com/docs
- Domain ayarları: DOMAIN_REFERENCE.md
- DNS ayarları: GIT_SETUP_GUIDE.md

---

**Başarılar!** 🚀
