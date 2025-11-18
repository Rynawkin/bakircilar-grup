# Deployment Guide - Bakırcılar Grup

Bu dokümanda projenin Vercel (Frontend) ve DigitalOcean (Backend) üzerinde nasıl deploy edileceği anlatılmaktadır.

## 📋 İçindekiler

1. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
2. [Backend Deployment (DigitalOcean)](#backend-deployment-digitalocean)
3. [Domain Yapılandırması](#domain-yapılandırması)
4. [SSL Sertifikaları](#ssl-sertifikaları)
5. [Environment Variables](#environment-variables)
6. [Monitoring & Logging](#monitoring--logging)

---

## 🎨 Frontend Deployment (Vercel)

### Gereksinimler
- Vercel hesabı
- GitHub/GitLab repository (önerilir)

### Her Site İçin Ayrı Deployment

#### 1. Ana Site (bakircilargrup.com)

```bash
# Vercel CLI yükle
npm i -g vercel

# Ana siteye git
cd apps/main

# Login
vercel login

# İlk deployment
vercel

# Production deployment
vercel --prod
```

**Vercel Dashboard Ayarları:**
- **Framework Preset**: Next.js
- **Root Directory**: `apps/main`
- **Build Command**: `cd ../.. && npm install && cd apps/main && npm run build`
- **Output Directory**: `.next`
- **Install Command**: `cd ../.. && npm install`

**Environment Variables:**
```env
NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
```

**Custom Domain:**
- bakircilargrup.com
- www.bakircilargrup.com (redirect to non-www)

---

#### 2. Alt Şirket Siteleri

Her alt şirket için yukarıdaki adımları tekrarlayın:

| Site | Port (Dev) | Domain | Vercel Project |
|------|-----------|---------|----------------|
| Ambalaj | 3001 | bakircilarambalaj.com | bakircilar-ambalaj |
| Yazılım | 3002 | bakircilaryazilim.com | bakircilar-yazilim |
| Danışmanlık | 3003 | bakircilardanismanlik.com | bakircilar-danismanlik |
| Emlak | 3004 | bakircilaremlak.com | bakircilar-emlak |
| Otomotiv | 3005 | bakircilaroto.com | bakircilar-otomotiv |
| Yolpilot | 3006 | yolpilot.com | yolpilot |

**Her site için:**
```bash
cd apps/{site-name}
vercel --prod
```

---

## 🖥️ Backend Deployment (DigitalOcean)

### Droplet Oluşturma

1. **DigitalOcean Dashboard** → **Create** → **Droplets**

2. **Droplet Özellikleri:**
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Basic
   - **CPU Options**: Regular (2 GB RAM, 1 CPU)
   - **Datacenter**: Frankfurt (fra1)
   - **Authentication**: SSH Key (önerilir)

3. **Firewall Kuralları:**
   - SSH (22)
   - HTTP (80)
   - HTTPS (443)
   - Custom (5000) - API port

---

### Sunucu Kurulumu

#### 1. Sunucuya Bağlan
```bash
ssh root@your-droplet-ip
```

#### 2. Sistem Güncellemeleri
```bash
apt update && apt upgrade -y
```

#### 3. Docker Kurulumu
```bash
# Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Docker Compose
apt install docker-compose -y

# Docker servisini başlat
systemctl start docker
systemctl enable docker
```

#### 4. Node.js Kurulumu (Docker kullanmıyorsanız)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
npm install -g pm2
```

---

### MongoDB Kurulumu

#### A) DigitalOcean Managed Database (Önerilir)

1. **Dashboard** → **Databases** → **Create Database**
2. **Engine**: MongoDB
3. **Plan**: Basic (1 GB RAM, 10 GB Disk)
4. **Region**: Frankfurt

**Connection String:**
```
mongodb://username:password@host:port/database?ssl=true
```

#### B) Self-Hosted MongoDB

```bash
# Docker ile MongoDB
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  -e MONGO_INITDB_DATABASE=bakircilar-grup \
  --restart unless-stopped \
  mongo:7.0
```

---

### Redis Kurulumu

```bash
# Docker ile Redis
docker run -d \
  --name redis \
  -p 6379:6379 \
  -v redis-data:/data \
  --restart unless-stopped \
  redis:7-alpine
```

---

### Backend Deployment

#### Yöntem 1: Docker (Önerilir)

```bash
# Projeyi sunucuya kopyala
cd /opt
git clone <repository-url> bakircilar-grup
cd bakircilar-grup/backend

# Environment variables
cp .env.example .env
nano .env  # Değerleri düzenle

# Docker ile build ve çalıştır
docker-compose up -d

# Logları kontrol et
docker-compose logs -f api
```

#### Yöntem 2: PM2

```bash
cd /opt/bakircilar-grup/backend

# Dependencies
npm install

# Build
npm run build

# PM2 ile çalıştır
pm2 start dist/server.js --name bakircilar-api

# Otomatik başlatma
pm2 startup
pm2 save

# Loglar
pm2 logs bakircilar-api
```

---

### Nginx Reverse Proxy

#### 1. Nginx Kurulumu
```bash
apt install nginx -y
```

#### 2. Nginx Konfigürasyonu
```bash
nano /etc/nginx/sites-available/bakircilar-api
```

```nginx
server {
    listen 80;
    server_name api.bakircilargrup.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    client_max_body_size 10M;
}
```

#### 3. Aktifleştir
```bash
ln -s /etc/nginx/sites-available/bakircilar-api /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## 🌐 Domain Yapılandırması

### DNS Kayıtları

**Vercel'e yönlendirmeler** (Frontend):

| Domain | Type | Value |
|--------|------|-------|
| bakircilargrup.com | A | 76.76.21.21 |
| www.bakircilargrup.com | CNAME | cname.vercel-dns.com |
| bakircilarambalaj.com | A | 76.76.21.21 |
| bakircilaryazilim.com | A | 76.76.21.21 |
| ... diğer domainler | A | 76.76.21.21 |

**DigitalOcean'a yönlendirme** (Backend):

| Domain | Type | Value |
|--------|------|-------|
| api.bakircilargrup.com | A | YOUR_DROPLET_IP |

---

## 🔒 SSL Sertifikaları

### Frontend (Vercel)
Vercel otomatik olarak SSL sağlar. Ekstra bir işlem gerekmez.

### Backend (Let's Encrypt)

```bash
# Certbot kurulumu
apt install certbot python3-certbot-nginx -y

# SSL sertifikası al
certbot --nginx -d api.bakircilargrup.com

# Otomatik yenileme
certbot renew --dry-run
```

---

## ⚙️ Environment Variables

### Frontend (Vercel Dashboard)

Her proje için:
```env
NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
```

### Backend (.env dosyası)

```env
PORT=5000
NODE_ENV=production

# MongoDB (DigitalOcean Managed Database)
MONGODB_URI=mongodb://username:password@host:port/database?ssl=true

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=super-secure-production-secret-key-change-this
JWT_EXPIRE=7d

# Brevo
BREVO_API_KEY=your-production-brevo-key
BREVO_SENDER_EMAIL=noreply@bakircilargrup.com
BREVO_SENDER_NAME=Bakırcılar Grup

# Google Maps
GOOGLE_MAPS_API_KEY=your-google-maps-key

# reCAPTCHA
RECAPTCHA_SECRET_KEY=your-recaptcha-secret

# DigitalOcean Spaces
DO_SPACES_ENDPOINT=fra1.digitaloceanspaces.com
DO_SPACES_KEY=your-production-key
DO_SPACES_SECRET=your-production-secret
DO_SPACES_BUCKET=bakircilar-grup-prod
DO_SPACES_REGION=fra1

# CORS
CORS_ORIGIN=https://bakircilargrup.com,https://bakircilarambalaj.com,https://bakircilaryazilim.com
```

---

## 📊 Monitoring & Logging

### PM2 Monitoring

```bash
# Status
pm2 status

# Logs
pm2 logs

# Monitoring dashboard
pm2 monit

# Restart
pm2 restart bakircilar-api

# Reload (zero downtime)
pm2 reload bakircilar-api
```

### Docker Monitoring

```bash
# Container status
docker ps

# Logs
docker-compose logs -f api

# Stats
docker stats

# Restart
docker-compose restart api
```

### Log Rotation

```bash
# PM2
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

# Docker
# docker-compose.yml içinde:
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

---

## 🔄 CI/CD (Opsiyonel)

### GitHub Actions

`.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to DigitalOcean
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.DROPLET_IP }}
          username: root
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /opt/bakircilar-grup/backend
            git pull
            docker-compose down
            docker-compose up -d --build
```

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] Tüm environment variables ayarlandı
- [ ] Domain DNS kayıtları yapılandırıldı
- [ ] SSL sertifikaları hazır
- [ ] Database bağlantısı test edildi
- [ ] Redis bağlantısı test edildi
- [ ] Brevo API key aktif
- [ ] Google Maps API key aktif
- [ ] reCAPTCHA keys hazır

### Deployment
- [ ] Frontend build başarılı
- [ ] Backend build başarılı
- [ ] Database migrations çalıştırıldı
- [ ] Vercel deployments tamamlandı
- [ ] DigitalOcean backend çalışıyor
- [ ] Nginx konfig test edildi
- [ ] SSL sertifikaları aktif

### Post-Deployment
- [ ] Tüm domainler çalışıyor
- [ ] API endpoints test edildi
- [ ] İletişim formu çalışıyor
- [ ] Email gönderimi test edildi
- [ ] File upload çalışıyor
- [ ] Çok dilli sistem çalışıyor
- [ ] WhatsApp entegrasyonu çalışıyor
- [ ] Monitoring kuruldu

---

## 🆘 Troubleshooting

### Frontend Sorunları

**Build hatası:**
```bash
# Dependencies yeniden yükle
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Vercel 404:**
- Middleware routing kontrol et
- next.config.js kontrol et

### Backend Sorunları

**Port 5000 kullanımda:**
```bash
lsof -i :5000
kill -9 <PID>
```

**MongoDB bağlantı hatası:**
```bash
# MongoDB durumu
docker ps | grep mongo
docker logs mongodb

# Connection string kontrol
echo $MONGODB_URI
```

**Memory hatası:**
```bash
# Swap alanı ekle
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

---

## 📞 Destek

Deployment sırasında sorun yaşarsanız:
- Backend logs: `pm2 logs` veya `docker-compose logs`
- Nginx logs: `/var/log/nginx/error.log`
- MongoDB logs: `docker logs mongodb`

---

✅ **Deployment tamamlandı! Siteye https://bakircilargrup.com adresinden erişebilirsiniz.**
