# Domain ve DNS Yapılandırma Referansı

Bu dokümanda tüm sitelerin domain bilgileri ve DNS ayarları bulunmaktadır.

---

## 📋 Tüm Siteler - Hızlı Bakış

| # | Site | Domain | Port | Vercel Project | Durum |
|---|------|--------|------|----------------|-------|
| 1 | Ana Holding | bakircilargrup.com | 3000 | bakircilar-grup-main | ⏳ |
| 2 | Ambalaj | bakircilarambalaj.com | 3001 | bakircilar-ambalaj | ⏳ |
| 3 | Yazılım | bakircilaryazilim.com | 3002 | bakircilar-yazilim | ⏳ |
| 4 | Danışmanlık | bakircilardanismanlik.com | 3003 | bakircilar-danismanlik | ⏳ |
| 5 | Emlak | bakircilaremlak.com | 3004 | bakircilar-emlak | ⏳ |
| 6 | Otomotiv | bakircilaroto.com | 3005 | bakircilar-otomotiv | ⏳ |
| 7 | Yolpilot | yolpilot.com | 3006 | yolpilot | ✅ Hazır |

**Durum Açıklaması:**
- ✅ Deploy edildi ve çalışıyor
- ⏳ Deploy bekliyor
- 🔧 Yapılandırma gerekiyor
- ❌ Sorun var

---

## 🌐 DNS Yapılandırma Tablosu

Tüm domainler için aşağıdaki DNS kayıtlarını ekleyin:

### Vercel A Kayıtları (Tüm Domainler İçin)

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600 (1 Hour)
```

### WWW Alt Domain (Opsiyonel)

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (1 Hour)
```

---

## 📊 Domain Detayları

### 1. bakircilargrup.com (Ana Holding)

**DNS Kayıtları:**
```
@ (root)    A        76.76.21.21
www         CNAME    cname.vercel-dns.com
```

**Vercel Ayarları:**
- Primary Domain: `bakircilargrup.com`
- Redirect: `www.bakircilargrup.com` → `bakircilargrup.com`

**Environment Variables:**
```env
NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL=https://bakircilargrup.com
```

**Deployment:**
```bash
cd apps/main
vercel --prod
```

---

### 2. bakircilarambalaj.com

**DNS Kayıtları:**
```
@ (root)    A        76.76.21.21
www         CNAME    cname.vercel-dns.com
```

**Vercel Ayarları:**
- Primary Domain: `bakircilarambalaj.com`

**Environment Variables:**
```env
NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL=https://bakircilarambalaj.com
```

**Deployment:**
```bash
cd apps/ambalaj
vercel --prod
```

---

### 3. bakircilaryazilim.com

**DNS Kayıtları:**
```
@ (root)    A        76.76.21.21
www         CNAME    cname.vercel-dns.com
```

**Vercel Ayarları:**
- Primary Domain: `bakircilaryazilim.com`

**Environment Variables:**
```env
NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL=https://bakircilaryazilim.com
```

**Deployment:**
```bash
cd apps/yazilim
vercel --prod
```

---

### 4. bakircilardanismanlik.com

**DNS Kayıtları:**
```
@ (root)    A        76.76.21.21
www         CNAME    cname.vercel-dns.com
```

**Vercel Ayarları:**
- Primary Domain: `bakircilardanismanlik.com`

**Environment Variables:**
```env
NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL=https://bakircilardanismanlik.com
```

**Deployment:**
```bash
cd apps/danismanlik
vercel --prod
```

---

### 5. bakircilaremlak.com

**DNS Kayıtları:**
```
@ (root)    A        76.76.21.21
www         CNAME    cname.vercel-dns.com
```

**Vercel Ayarları:**
- Primary Domain: `bakircilaremlak.com`

**Environment Variables:**
```env
NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL=https://bakircilaremlak.com
```

**Deployment:**
```bash
cd apps/emlak
vercel --prod
```

---

### 6. bakircilaroto.com

**DNS Kayıtları:**
```
@ (root)    A        76.76.21.21
www         CNAME    cname.vercel-dns.com
```

**Vercel Ayarları:**
- Primary Domain: `bakircilaroto.com`

**Environment Variables:**
```env
NEXT_PUBLIC_API_URL=https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL=https://bakircilaroto.com
```

**Deployment:**
```bash
cd apps/otomotiv
vercel --prod
```

---

### 7. yolpilot.com (Zaten Hazır)

**Not:** Bu site zaten deploy edilmiş ve çalışıyor durumda.

---

## 🔧 Domain Sağlayıcı Özel Ayarları

### GoDaddy

1. My Products → Domains → Domain seç
2. DNS Management
3. DNS Records bölümüne git
4. Yukarıdaki A ve CNAME kayıtlarını ekle

### Namecheap

1. Domain List → Manage
2. Advanced DNS
3. Add New Record ile A ve CNAME kayıtlarını ekle

### Cloudflare (Eğer kullanıyorsanız)

**Önemli:** Cloudflare proxy kapalı olmalı!

1. DNS → Records
2. A kaydı ekle, **Proxy durumunu kapatın** (gri bulut)
3. CNAME ekle, proxy kapatın

---

## ✅ DNS Kontrol Komutları

Deploy sonrası DNS kayıtlarını kontrol etmek için:

```bash
# A kaydını kontrol et
nslookup bakircilargrup.com

# CNAME kontrol et
nslookup www.bakircilargrup.com

# DNS yayılma durumu kontrol et (online)
# https://dnschecker.org adresini kullanın
```

---

## 📅 DNS Yayılma Süreleri

| Kayıt Tipi | Ortalama Süre | Maksimum Süre |
|------------|---------------|---------------|
| A Record | 1-2 saat | 24 saat |
| CNAME | 1-2 saat | 24 saat |
| Tam DNS Yayılması | 4-8 saat | 48 saat |

---

## 🔒 SSL Sertifikaları

Vercel otomatik SSL sağlar:
- **Sağlayıcı:** Let's Encrypt
- **Yenileme:** Otomatik (90 günde bir)
- **Aktivasyon:** Domain eklendikten 1-24 saat içinde

**SSL Kontrolü:**
```
https://www.ssllabs.com/ssltest/analyze.html?d=bakircilargrup.com
```

---

## 📞 API Backend Domain

Tüm siteler aynı backend API'yi kullanır:

```
Domain: api.bakircilargrup.com
IP: [DigitalOcean Droplet IP]
```

**DNS Kaydı:**
```
Type: A
Name: api
Value: [YOUR_DROPLET_IP]
TTL: 3600
```

---

## 🚨 Sorun Giderme

### Domain Çalışmıyor

1. **DNS Kontrol:**
   ```bash
   nslookup bakircilargrup.com
   ```
   Sonuç: `76.76.21.21` olmalı

2. **DNS Cache Temizle:**
   ```bash
   # Windows
   ipconfig /flushdns

   # Mac/Linux
   sudo dscacheutil -flushcache
   ```

3. **Bekleme Süresi:**
   24-48 saat bekleyin (DNS yayılması için)

### SSL Aktif Değil

1. Vercel Dashboard → Domains → SSL durumu kontrol et
2. DNS kayıtları doğru mu kontrol et
3. 24 saat bekle
4. Vercel support ile iletişime geç

---

## 📝 Deployment Sonrası Checklist

Her domain için:

- [ ] DNS A kaydı eklendi (76.76.21.21)
- [ ] DNS CNAME eklendi (www)
- [ ] Vercel'de custom domain eklendi
- [ ] Environment variables ayarlandı
- [ ] Site deploy edildi
- [ ] DNS yayılması beklendi (24-48 saat)
- [ ] SSL aktif
- [ ] Site erişilebilir
- [ ] Tüm diller çalışıyor (TR/EN/DE/ES)
- [ ] API bağlantısı çalışıyor

---

## 🔗 Faydalı Linkler

**DNS Araçları:**
- [DNS Checker](https://dnschecker.org)
- [What's My DNS](https://whatsmydns.net)
- [MX Toolbox](https://mxtoolbox.com/SuperTool.aspx)

**SSL Araçları:**
- [SSL Labs](https://www.ssllabs.com/ssltest/)
- [SSL Checker](https://www.sslshopper.com/ssl-checker.html)

**Vercel:**
- [Dashboard](https://vercel.com/dashboard)
- [Documentation](https://vercel.com/docs)
- [Domain Setup Guide](https://vercel.com/docs/concepts/projects/custom-domains)

---

**Güncelleme:** 2024-11-18
**Hazırlayan:** Bakırcılar Grup IT Team
