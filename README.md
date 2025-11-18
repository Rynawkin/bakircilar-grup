# Bakırcılar Grup - Corporate Websites Monorepo

Bakırcılar Grup ve alt şirketleri için geliştirilmiş kurumsal web siteleri ve backend API projesi.

## 📁 Proje Yapısı

```
bakircilar-grup/
├── apps/                          # Frontend uygulamaları
│   ├── main/                      # bakircilargrup.com
│   ├── ambalaj/                   # bakircilarambalaj.com
│   ├── yazilim/                   # bakircilaryazilim.com
│   ├── danismanlik/               # bakircilardanismanlik.com
│   ├── emlak/                     # bakircilaremlak.com
│   ├── otomotiv/                  # bakircilaroto.com
│   └── yolpilot/                  # yolpilot.com
├── packages/                      # Paylaşılan paketler
│   ├── ui/                        # Ortak UI componentleri
│   ├── i18n/                      # Çok dilli destek (TR/EN/DE/ES)
│   └── config/                    # Ortak konfigürasyonlar
├── backend/                       # Backend API (Express + MongoDB)
│   ├── src/
│   │   ├── models/               # MongoDB modelleri
│   │   ├── controllers/          # API controller'ları
│   │   ├── routes/               # API routes
│   │   ├── middleware/           # Middleware'ler
│   │   └── utils/                # Yardımcı fonksiyonlar
│   └── Dockerfile                # Docker image
└── scripts/                       # Yardımcı scriptler
```

## 🚀 Teknoloji Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **i18n**: next-intl (TR, EN, DE, ES)
- **Monorepo**: Turborepo + npm workspaces

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB
- **Cache**: Redis
- **File Upload**: Multer
- **Email**: Brevo (Sendinblue)
- **Authentication**: JWT
- **Security**: Helmet, Rate Limiting

## 🛠️ Kurulum

### Gereksinimler
- Node.js 18+
- npm 9+
- MongoDB 7+
- Redis (opsiyonel)

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd bakircilar-grup
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Environment Variables
Her uygulama için `.env.local` dosyası oluşturun:

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/bakircilar-grup

# Redis (Optional)
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=7d

# Brevo Email
BREVO_API_KEY=your-brevo-api-key
BREVO_SENDER_EMAIL=noreply@bakircilargrup.com

# Google Maps
GOOGLE_MAPS_API_KEY=your-google-maps-key

# reCAPTCHA
RECAPTCHA_SECRET_KEY=your-recaptcha-secret

# DigitalOcean Spaces
DO_SPACES_ENDPOINT=fra1.digitaloceanspaces.com
DO_SPACES_KEY=your-key
DO_SPACES_SECRET=your-secret
DO_SPACES_BUCKET=bakircilar-grup

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### 4. Development Sunucularını Başlatın

#### Tüm frontend uygulamaları:
```bash
npm run dev
```

#### Tek bir site:
```bash
npm run dev:main        # Port 3000
npm run dev:ambalaj     # Port 3001
npm run dev:yazilim     # Port 3002
npm run dev:danismanlik # Port 3003
npm run dev:emlak       # Port 3004
npm run dev:otomotiv    # Port 3005
npm run dev:yolpilot    # Port 3006
```

#### Backend API:
```bash
npm run dev:backend     # Port 5000
```

## 📦 Build & Deployment

### 🚀 Hızlı Deployment (İki Yöntem)

#### Yöntem 1: GitHub Entegrasyonu (ÖNERİLEN) ⭐

**Otomatik deployment - Git push yaptığınızda Vercel otomatik deploy eder**

```bash
# 1. Git başlat ve GitHub'a push
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/bakircilar-grup.git
git push -u origin main

# 2. Vercel'de Import Git Repository
# https://vercel.com/new → Import Git Repository
# Her site için Root Directory belirt (apps/main, apps/ambalaj, vb.)

# 3. Güncellemeler için sadece:
git add .
git commit -m "Güncelleme"
git push
# Vercel otomatik deploy eder!
```

**Detaylı Rehber:** [GIT_SETUP_GUIDE.md](GIT_SETUP_GUIDE.md)

#### Yöntem 2: Vercel CLI (Manuel)

**Windows:**
```bash
.\scripts\deploy-all-sites.bat
```

**Mac/Linux:**
```bash
chmod +x scripts/deploy-all-sites.sh
./scripts/deploy-all-sites.sh
```

### 📚 Deployment Dokümantasyonu

Detaylı deployment talimatları için:

- **[GIT_SETUP_GUIDE.md](GIT_SETUP_GUIDE.md)** - ⭐ GitHub entegrasyonu (Önerilen)
- **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - 5 dakikada hızlı deployment
- **[SITE_DEPLOYMENT_GUIDE.md](SITE_DEPLOYMENT_GUIDE.md)** - Detaylı adım adım rehber
- **[DOMAIN_REFERENCE.md](DOMAIN_REFERENCE.md)** - DNS ve domain yapılandırması
- **[DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)** - Deployment özet raporu
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Backend deployment rehberi

### Frontend (Vercel)

Her site için ayrı Vercel projesi:

```bash
# Ana site
cd apps/main
vercel --prod

# Ambalaj
cd apps/ambalaj
vercel --prod

# Yazılım
cd apps/yazilim
vercel --prod

# Danışmanlık
cd apps/danismanlik
vercel --prod

# Emlak
cd apps/emlak
vercel --prod

# Otomotiv
cd apps/otomotiv
vercel --prod
```

**Siteler ve Domainler:**

| Site | Domain | Port (Dev) |
|------|--------|-----------|
| Ana Holding | bakircilargrup.com | 3000 |
| Ambalaj | bakircilarambalaj.com | 3001 |
| Yazılım | bakircilaryazilim.com | 3002 |
| Danışmanlık | bakircilardanismanlik.com | 3003 |
| Emlak | bakircilaremlak.com | 3004 |
| Otomotiv | bakircilaroto.com | 3005 |
| Yolpilot | yolpilot.com | 3006 |

### Backend (DigitalOcean)

#### Docker ile:
```bash
cd backend
docker build -t bakircilar-api .
docker run -p 5000:5000 --env-file .env bakircilar-api
```

#### Docker Compose ile (Full stack):
```bash
cd backend
docker-compose up -d
```

### DNS Yapılandırması

Her domain için aşağıdaki DNS kayıtlarını ekleyin:

```
A Record:
  Type: A
  Name: @
  Value: 76.76.21.21

CNAME Record:
  Type: CNAME
  Name: www
  Value: cname.vercel-dns.com
```

Detaylı DNS ayarları için: [DOMAIN_REFERENCE.md](DOMAIN_REFERENCE.md)

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Bakırcılar Grup**: Lacivert (#1e3a8a) + Altın (#fbbf24)
- **Ambalaj**: Mavi (#3b82f6)
- **Yazılım**: Mor (#8b5cf6)
- **Danışmanlık**: Yeşil (#10b981)
- **Emlak**: Turuncu (#f97316)
- **Otomotiv**: Kırmızı (#ef4444)
- **Yolpilot**: Mavi (#2563eb)

### UI Componentleri
Tüm ortak componentler `packages/ui` içinde:
- Button
- Card
- Container
- Header
- Footer
- Hero
- ContactForm
- WhatsAppButton

## 🔒 Güvenlik

- ✅ Helmet.js (HTTP headers)
- ✅ Rate limiting
- ✅ CORS yapılandırması
- ✅ JWT authentication
- ✅ bcrypt password hashing
- ✅ File upload validation
- ✅ reCAPTCHA integration
- ✅ SQL injection prevention (MongoDB)
- ✅ XSS protection

## 📧 Email Entegrasyonu

Brevo (eski Sendinblue) kullanılıyor:
- İletişim form onayları
- İş başvurusu bildirimleri
- Admin bildirimleri

## 🗄️ Database Modelleri

- **User**: Admin kullanıcıları
- **News**: Haberler/Blog yazıları
- **Job**: İş ilanları
- **Application**: İş başvuruları
- **Contact**: İletişim form mesajları

## 🔄 API Endpoints

### Public Endpoints
- `GET /api/news` - Haberler
- `GET /api/jobs` - İş ilanları
- `POST /api/contact` - İletişim formu
- `POST /api/jobs/:id/apply` - İş başvurusu

### Protected Endpoints (Admin)
- `POST /api/auth/login` - Login
- `POST /api/news` - Haber oluştur
- `GET /api/contact` - Mesajları listele
- `PATCH /api/contact/:id` - Mesaj durumu güncelle

## 🌐 Çok Dilli Destek

4 dil destekleniyor:
- 🇹🇷 Türkçe (varsayılan)
- 🇬🇧 İngilizce
- 🇩🇪 Almanca
- 🇪🇸 İspanyolca

URL yapısı: `/{locale}/path` (örn: `/tr/about`, `/en/about`)

## 📊 Performans

- ✅ Redis caching
- ✅ Image optimization (Next.js)
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Gzip compression
- ✅ CDN ready

## 🧪 Test

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Build test
npm run build
```

## 📝 Scripts

```json
{
  "dev": "turbo run dev",
  "build": "turbo run build",
  "lint": "turbo run lint",
  "dev:main": "npm run dev --workspace=apps/main",
  "dev:backend": "npm run dev --workspace=backend"
}
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje Bakırcılar Grup'a aittir. Tüm hakları saklıdır.

## 📞 İletişim

- **Website**: https://bakircilargrup.com
- **Email**: info@bakircilargrup.com
- **Phone**: +90 XXX XXX XX XX

## 🙏 Teşekkürler

Bu proje aşağıdaki açık kaynak projelerini kullanmaktadır:
- Next.js
- React
- Tailwind CSS
- Express.js
- MongoDB
- Redis
- Ve diğerleri...

---

© 2024 Bakırcılar Grup. Tüm hakları saklıdır.
