# 🚀 Quick Start Guide

Projeyi hızlıca çalıştırmak için bu adımları takip edin.

## 📋 Gereksinimler

- Node.js 18+ ([İndir](https://nodejs.org/))
- MongoDB 7+ ([İndir](https://www.mongodb.com/try/download/community))
- Git ([İndir](https://git-scm.com/))

## ⚡ 5 Dakikada Çalıştır

### 1. Projeyi İndirin
```bash
cd C:\Users\ucare\OneDrive\Masaüstü\projects
cd bakircilar-grup
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Backend Environment Variables
```bash
cd backend
copy .env.example .env
```

`.env` dosyasını açın ve en az şunları ayarlayın:
```env
MONGODB_URI=mongodb://localhost:27017/bakircilar-grup
JWT_SECRET=your-secret-key
```

### 4. MongoDB'yi Başlatın

**Windows:**
```bash
# MongoDB servisini başlat (Windows Services'den veya)
net start MongoDB
```

**Mac/Linux:**
```bash
mongod --dbpath /path/to/data/db
```

### 5. Sunucuları Başlatın

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Ana Site:**
```bash
cd apps/main
npm run dev
```

Site şu adreste çalışacak: **http://localhost:3000**

Backend API: **http://localhost:5000**

---

## 🎯 Diğer Siteleri Çalıştırma

```bash
# Terminal 3 - Ambalaj sitesi
cd apps/ambalaj
npm run dev
# http://localhost:3001

# Terminal 4 - Yazılım sitesi
cd apps/yazilim
npm run dev
# http://localhost:3002

# ...ve diğerleri
```

---

## 🔧 Varsayılan Admin Kullanıcısı Oluşturma

MongoDB shell'de:

```javascript
use bakircilar-grup

db.users.insertOne({
  email: "admin@bakircilargrup.com",
  password: "$2b$10$XYZ...", // bcrypt hash of "admin123"
  name: "Admin",
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Veya backend'de bir script çalıştırın:

```bash
cd backend
node -e "
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bakircilar-grup');

const User = require('./src/models/User').default;

bcrypt.hash('admin123', 10).then(hash => {
  User.create({
    email: 'admin@bakircilargrup.com',
    password: hash,
    name: 'Admin',
    role: 'admin',
    isActive: true
  }).then(() => {
    console.log('✅ Admin user created');
    process.exit(0);
  });
});
"
```

---

## 📱 Test Edilecek Özellikler

1. **Ana Sayfa**: http://localhost:3000
2. **Hakkımızda**: http://localhost:3000/about
3. **Şirketlerimiz**: http://localhost:3000/companies
4. **Haberler**: http://localhost:3000/news
5. **Kariyer**: http://localhost:3000/career
6. **İletişim**: http://localhost:3000/contact

7. **API Health Check**: http://localhost:5000/api/health
8. **API News**: http://localhost:5000/api/news
9. **API Jobs**: http://localhost:5000/api/jobs

---

## 🌐 Dil Değiştirme

URL'ye dil kodu ekleyin:
- Türkçe: http://localhost:3000/tr
- İngilizce: http://localhost:3000/en
- Almanca: http://localhost:3000/de
- İspanyolca: http://localhost:3000/es

---

## 🐛 Sorun Giderme

### Port zaten kullanımda
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### MongoDB bağlanamıyor
```bash
# MongoDB durumunu kontrol et
mongo --eval "db.adminCommand('ping')"

# Servis durumu
sc query MongoDB  # Windows
systemctl status mongod  # Linux
```

### npm install hatası
```bash
# Cache temizle
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build hatası
```bash
# TypeScript hatalarını kontrol et
npm run type-check

# Linting
npm run lint
```

---

## 📚 Sonraki Adımlar

1. **README.md** - Detaylı proje dokümantasyonu
2. **DEPLOYMENT.md** - Production'a çıkma rehberi
3. `backend/src/` - Backend kod yapısı
4. `packages/ui/` - Ortak UI componentleri
5. `packages/i18n/` - Çeviri dosyaları

---

## 💡 İpuçları

- **Hot Reload**: Kod değişiklikleri otomatik yansır
- **TypeScript**: Tüm dosyalar TypeScript ile yazılmış
- **Tailwind**: Utility-first CSS framework kullanıyoruz
- **Framer Motion**: Animasyonlar için
- **Monorepo**: Tüm projeler tek repository'de

---

## 🎉 Tamamlandı!

Projeniz çalışıyor! Geliştirmeye başlayabilirsiniz.

Sorularınız için: info@bakircilargrup.com
