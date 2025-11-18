# Git ve GitHub Kurulum Rehberi

Bu rehber, projeyi Git'e kaydetmek ve GitHub/GitLab'a yüklemek için adımları içerir.

---

## 🎯 Neden Git Kullanmalıyız?

✅ **Otomatik Deployment**: GitHub'a push → Vercel otomatik deploy eder
✅ **Versiyon Kontrolü**: Tüm değişiklikler kaydedilir
✅ **Kolay Güncelleme**: Kod değişikliği → push → otomatik deploy
✅ **Yedekleme**: Kod güvenle saklanır
✅ **İşbirliği**: Takım çalışması kolaylaşır

---

## 🚀 Adım 1: Git Repository Başlatma

### 1.1 Git Kontrolü

Git yüklü mü kontrol edin:

```bash
git --version
```

Eğer yüklü değilse: https://git-scm.com/download/win

### 1.2 Git Başlat

```bash
# Proje dizinine git
cd C:\Users\ucare\OneDrive\Masaüstü\projects\bakircilar-grup

# Git başlat
git init

# Git kullanıcı bilgileri (ilk kez kullanıyorsanız)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 1.3 İlk Commit

```bash
# Tüm dosyaları stage'e ekle
git add .

# İlk commit
git commit -m "Initial commit: Bakırcılar Grup web siteleri"
```

---

## 📦 Adım 2: GitHub Repository Oluşturma

### 2.1 GitHub'da Yeni Repository

1. https://github.com adresine gidin
2. Sağ üstte **+** → **New repository**
3. Repository ayarları:
   - **Name:** `bakircilar-grup` (veya istediğiniz isim)
   - **Description:** Bakırcılar Grup Corporate Websites Monorepo
   - **Visibility:** Private (önerilir) veya Public
   - **❌ Initialize with README** - İşaretlemeyin!
   - **❌ Add .gitignore** - İşaretlemeyin! (zaten var)
   - **❌ Choose a license** - İşaretlemeyin!

4. **Create repository** tıklayın

### 2.2 Local Repository'yi GitHub'a Bağla

GitHub'ın verdiği komutları kullanın:

```bash
# Remote ekle (GitHub'dan kopyalayın)
git remote add origin https://github.com/YOUR-USERNAME/bakircilar-grup.git

# veya SSH kullanıyorsanız:
git remote add origin git@github.com:YOUR-USERNAME/bakircilar-grup.git

# Main branch'i ayarla
git branch -M main

# İlk push
git push -u origin main
```

**Not:** `YOUR-USERNAME` kısmını kendi GitHub kullanıcı adınızla değiştirin.

---

## 🔗 Adım 3: Vercel - GitHub Entegrasyonu

### 3.1 Vercel'de Yeni Proje (Git Import)

Her site için:

1. **Vercel Dashboard** → https://vercel.com/new
2. **Import Git Repository** seçin
3. GitHub'ı bağlayın (ilk kez kullanıyorsanız)
4. Repository'yi seçin: `bakircilar-grup`

### 3.2 Ana Holding (bakircilargrup.com)

**Configure Project:**
- **Framework Preset:** Next.js
- **Root Directory:** `apps/main` ← **ÖNEMLİ!**
- **Build Command:** `cd ../.. && npm install && cd apps/main && npm run build`
- **Output Directory:** `.next`
- **Install Command:** `cd ../.. && npm install`

**Environment Variables:**
```env
NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL=https://bakircilargrup.com
```

**Deploy** tıklayın!

### 3.3 Diğer Siteler

Her site için **3.1** ve **3.2** adımlarını tekrarlayın:

#### Ambalaj
- **Root Directory:** `apps/ambalaj`
- **Build Command:** `cd ../.. && npm install && cd apps/ambalaj && npm run build`
- **Environment Variables:**
  ```env
  NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
  NEXT_PUBLIC_SITE_URL=https://bakircilarambalaj.com
  ```

#### Yazılım
- **Root Directory:** `apps/yazilim`
- **Build Command:** `cd ../.. && npm install && cd apps/yazilim && npm run build`
- **Environment Variables:**
  ```env
  NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
  NEXT_PUBLIC_SITE_URL=https://bakircilaryazilim.com
  ```

#### Danışmanlık
- **Root Directory:** `apps/danismanlik`
- **Build Command:** `cd ../.. && npm install && cd apps/danismanlik && npm run build`
- **Environment Variables:**
  ```env
  NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
  NEXT_PUBLIC_SITE_URL=https://bakircilardanismanlik.com
  ```

#### Emlak
- **Root Directory:** `apps/emlak`
- **Build Command:** `cd ../.. && npm install && cd apps/emlak && npm run build`
- **Environment Variables:**
  ```env
  NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
  NEXT_PUBLIC_SITE_URL=https://bakircilaremlak.com
  ```

#### Otomotiv
- **Root Directory:** `apps/otomotiv`
- **Build Command:** `cd ../.. && npm install && cd apps/otomotiv && npm run build`
- **Environment Variables:**
  ```env
  NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
  NEXT_PUBLIC_SITE_URL=https://bakircilaroto.com
  ```

---

## ✅ Adım 4: Domain Ayarları

Her Vercel projesinde:

1. **Settings** → **Domains**
2. Custom domain ekle
3. DNS ayarlarını yap (önceki rehberlere bakın)

---

## 🔄 Güncellemeler Nasıl Yapılır?

### Değişiklik Yaptığınızda:

```bash
# Değişiklikleri kontrol et
git status

# Değişen dosyaları stage'e ekle
git add .

# Commit oluştur
git commit -m "Anasayfa hero section güncellendi"

# GitHub'a push et
git push origin main
```

**🎉 Vercel otomatik olarak yeni versiyonu deploy eder!**

### Vercel'de Deployment İzleme:

1. https://vercel.com/dashboard
2. İlgili projeye tıklayın
3. **Deployments** sekmesinde son deployment'ı görebilirsiniz
4. Build loglarını inceleyebilirsiniz

---

## 📋 Vercel Deployment Ayarları (Her Proje İçin)

### Settings → Git

- **Production Branch:** `main`
- **Deploy Hooks:** İsteğe bağlı

### Settings → Environment Variables

Her ortam için aynı değerleri ekleyin:
- Production
- Preview
- Development

---

## 🌿 Branch Stratejisi (Gelişmiş)

### Ana Branch: main
- Production deployment
- Sadece test edilmiş kod

### Geliştirme: development
```bash
# Yeni branch oluştur
git checkout -b development

# Değişiklik yap ve commit et
git add .
git commit -m "Yeni özellik eklendi"

# Push et
git push origin development
```

Vercel otomatik olarak **Preview Deployment** oluşturur.

### Merge İşlemi:
```bash
# main branch'e geç
git checkout main

# development'ı merge et
git merge development

# Push et (production deploy olur)
git push origin main
```

---

## 🔒 Güvenlik

### .gitignore Kontrol

Aşağıdakilerin `.gitignore`'da olduğundan emin olun:

```
# Environment files
.env
.env*.local
.env.production

# Dependencies
node_modules/

# Build files
.next/
dist/
build/

# Vercel
.vercel/

# IDE
.vscode/
.idea/
```

### Hassas Bilgiler

❌ **Asla commit etmeyin:**
- `.env` dosyaları
- API keys
- Şifreler
- SSL sertifikaları

✅ **Vercel Environment Variables kullanın**

---

## 🆘 Sorun Giderme

### Build Hatası

```bash
# Local'de test et
npm run build

# Vercel'de logları incele
# Dashboard → Deployments → Failed deployment → View Logs
```

### Git Push Hatası

```bash
# Force push (dikkatli kullanın!)
git push -f origin main

# veya pull + merge
git pull origin main
git push origin main
```

### Vercel Deploy Edilmiyor

1. GitHub entegrasyonunu kontrol edin
2. Branch adını kontrol edin (main mi?)
3. Build command'ları doğru mu?
4. Environment variables ekli mi?

---

## 📊 Vercel Proje Listesi

Toplam 6 Vercel projesi oluşturulmalı:

| # | Proje Adı | Repository | Root Directory | Domain |
|---|-----------|------------|----------------|---------|
| 1 | bakircilar-grup-main | bakircilar-grup | apps/main | bakircilargrup.com |
| 2 | bakircilar-ambalaj | bakircilar-grup | apps/ambalaj | bakircilarambalaj.com |
| 3 | bakircilar-yazilim | bakircilar-grup | apps/yazilim | bakircilaryazilim.com |
| 4 | bakircilar-danismanlik | bakircilar-grup | apps/danismanlik | bakircilardanismanlik.com |
| 5 | bakircilar-emlak | bakircilar-grup | apps/emlak | bakircilaremlak.com |
| 6 | bakircilar-otomotiv | bakircilar-grup | apps/otomotiv | bakircilaroto.com |

**Not:** Hepsi aynı repository'den, sadece farklı klasörlerden deploy edilir.

---

## ✨ Avantajlar

### Otomatik Deployment:
```
Kod Değişikliği → git push → Vercel otomatik build → Deploy
```

### Preview Deployments:
- Her pull request için otomatik preview URL
- Test etmeden production'a gitmez

### Rollback:
- Herhangi bir önceki versiyona tek tıkla geri dönüş
- Vercel Dashboard → Deployments → ... → Promote to Production

---

## 🎯 Hızlı Başlangıç Özeti

```bash
# 1. Git başlat
git init
git add .
git commit -m "Initial commit"

# 2. GitHub'a push
git remote add origin https://github.com/YOUR-USERNAME/bakircilar-grup.git
git branch -M main
git push -u origin main

# 3. Vercel'de Import Git Repository
# Her site için Root Directory belirt

# 4. Domain ekle ve DNS ayarla

# 5. Güncellemeler için:
git add .
git commit -m "Güncelleme mesajı"
git push origin main
```

---

## 📞 Yardım

**GitHub Docs:** https://docs.github.com
**Vercel Git Integration:** https://vercel.com/docs/concepts/git
**Git Tutorial:** https://git-scm.com/book/en/v2

---

**Başarılar!** 🚀

Artık GitHub üzerinden otomatik deployment yapabilirsiniz.
