# Deployment Checklist

Bu checklist'i kullanarak deployment sürecini adım adım takip edin.

---

## 📋 Ön Hazırlık

### Hesaplar ve Araçlar

- [ ] Vercel hesabı oluşturuldu
- [ ] Vercel CLI kuruldu (`npm install -g vercel`)
- [ ] Vercel'e giriş yapıldı (`vercel login`)
- [ ] Domain sağlayıcı hesabı aktif
- [ ] Tüm 6 domain satın alındı

### Domainler

- [ ] bakircilargrup.com
- [ ] bakircilarambalaj.com
- [ ] bakircilaryazilim.com
- [ ] bakircilardanismanlik.com
- [ ] bakircilaremlak.com
- [ ] bakircilaroto.com

### Kod Hazırlığı

- [ ] Proje klonlandı/indirildi
- [ ] Dependencies yüklendi (`npm install`)
- [ ] Local test yapıldı (`npm run dev`)
- [ ] Build testi yapıldı (`npm run build`)

---

## 🚀 Deployment

### 1. Ana Holding (bakircilargrup.com)

- [ ] **Deploy:**
  ```bash
  cd apps/main
  vercel --prod
  ```
- [ ] Deployment başarılı
- [ ] Preview URL kaydedildi
- [ ] Vercel Project Name: `bakircilar-grup-main`

- [ ] **Vercel Dashboard Ayarları:**
  - [ ] Settings → Domains → `bakircilargrup.com` eklendi
  - [ ] Settings → Domains → `www.bakircilargrup.com` eklendi
  - [ ] Settings → Environment Variables:
    ```
    NEXT_PUBLIC_API_URL = https://api.bakircilargrup.com/api
    NEXT_PUBLIC_SITE_URL = https://bakircilargrup.com
    ```

- [ ] **DNS Ayarları:**
  - [ ] A Record: @ → 76.76.21.21
  - [ ] CNAME: www → cname.vercel-dns.com

- [ ] **Test:**
  - [ ] Preview URL çalışıyor
  - [ ] Custom domain bağlandı (24-48 saat sonra)
  - [ ] SSL aktif
  - [ ] 4 dil çalışıyor (TR/EN/DE/ES)

---

### 2. Ambalaj (bakircilarambalaj.com)

- [ ] **Deploy:**
  ```bash
  cd apps/ambalaj
  vercel --prod
  ```
- [ ] Deployment başarılı
- [ ] Preview URL kaydedildi
- [ ] Vercel Project Name: `bakircilar-ambalaj`

- [ ] **Vercel Dashboard Ayarları:**
  - [ ] Settings → Domains → `bakircilarambalaj.com` eklendi
  - [ ] Settings → Environment Variables:
    ```
    NEXT_PUBLIC_API_URL = https://api.bakircilargrup.com/api
    NEXT_PUBLIC_SITE_URL = https://bakircilarambalaj.com
    ```

- [ ] **DNS Ayarları:**
  - [ ] A Record: @ → 76.76.21.21
  - [ ] CNAME: www → cname.vercel-dns.com

- [ ] **Test:**
  - [ ] Preview URL çalışıyor
  - [ ] Custom domain bağlandı
  - [ ] SSL aktif
  - [ ] 4 dil çalışıyor

---

### 3. Yazılım (bakircilaryazilim.com)

- [ ] **Deploy:**
  ```bash
  cd apps/yazilim
  vercel --prod
  ```
- [ ] Deployment başarılı
- [ ] Preview URL kaydedildi
- [ ] Vercel Project Name: `bakircilar-yazilim`

- [ ] **Vercel Dashboard Ayarları:**
  - [ ] Settings → Domains → `bakircilaryazilim.com` eklendi
  - [ ] Settings → Environment Variables:
    ```
    NEXT_PUBLIC_API_URL = https://api.bakircilargrup.com/api
    NEXT_PUBLIC_SITE_URL = https://bakircilaryazilim.com
    ```

- [ ] **DNS Ayarları:**
  - [ ] A Record: @ → 76.76.21.21
  - [ ] CNAME: www → cname.vercel-dns.com

- [ ] **Test:**
  - [ ] Preview URL çalışıyor
  - [ ] Custom domain bağlandı
  - [ ] SSL aktif
  - [ ] 4 dil çalışıyor

---

### 4. Danışmanlık (bakircilardanismanlik.com)

- [ ] **Deploy:**
  ```bash
  cd apps/danismanlik
  vercel --prod
  ```
- [ ] Deployment başarılı
- [ ] Preview URL kaydedildi
- [ ] Vercel Project Name: `bakircilar-danismanlik`

- [ ] **Vercel Dashboard Ayarları:**
  - [ ] Settings → Domains → `bakircilardanismanlik.com` eklendi
  - [ ] Settings → Environment Variables:
    ```
    NEXT_PUBLIC_API_URL = https://api.bakircilargrup.com/api
    NEXT_PUBLIC_SITE_URL = https://bakircilardanismanlik.com
    ```

- [ ] **DNS Ayarları:**
  - [ ] A Record: @ → 76.76.21.21
  - [ ] CNAME: www → cname.vercel-dns.com

- [ ] **Test:**
  - [ ] Preview URL çalışıyor
  - [ ] Custom domain bağlandı
  - [ ] SSL aktif
  - [ ] 4 dil çalışıyor

---

### 5. Emlak (bakircilaremlak.com)

- [ ] **Deploy:**
  ```bash
  cd apps/emlak
  vercel --prod
  ```
- [ ] Deployment başarılı
- [ ] Preview URL kaydedildi
- [ ] Vercel Project Name: `bakircilar-emlak`

- [ ] **Vercel Dashboard Ayarları:**
  - [ ] Settings → Domains → `bakircilaremlak.com` eklendi
  - [ ] Settings → Environment Variables:
    ```
    NEXT_PUBLIC_API_URL = https://api.bakircilargrup.com/api
    NEXT_PUBLIC_SITE_URL = https://bakircilaremlak.com
    ```

- [ ] **DNS Ayarları:**
  - [ ] A Record: @ → 76.76.21.21
  - [ ] CNAME: www → cname.vercel-dns.com

- [ ] **Test:**
  - [ ] Preview URL çalışıyor
  - [ ] Custom domain bağlandı
  - [ ] SSL aktif
  - [ ] 4 dil çalışıyor

---

### 6. Otomotiv (bakircilaroto.com)

- [ ] **Deploy:**
  ```bash
  cd apps/otomotiv
  vercel --prod
  ```
- [ ] Deployment başarılı
- [ ] Preview URL kaydedildi
- [ ] Vercel Project Name: `bakircilar-otomotiv`

- [ ] **Vercel Dashboard Ayarları:**
  - [ ] Settings → Domains → `bakircilaroto.com` eklendi
  - [ ] Settings → Environment Variables:
    ```
    NEXT_PUBLIC_API_URL = https://api.bakircilargrup.com/api
    NEXT_PUBLIC_SITE_URL = https://bakircilaroto.com
    ```

- [ ] **DNS Ayarları:**
  - [ ] A Record: @ → 76.76.21.21
  - [ ] CNAME: www → cname.vercel-dns.com

- [ ] **Test:**
  - [ ] Preview URL çalışıyor
  - [ ] Custom domain bağlandı
  - [ ] SSL aktif
  - [ ] 4 dil çalışıyor

---

## 🔍 Genel Test (Tüm Siteler)

### Fonksiyonel Testler

Her site için:

- [ ] **Anasayfa:**
  - [ ] Hero section görünüyor
  - [ ] Animasyonlar çalışıyor
  - [ ] İstatistikler görünüyor
  - [ ] CTA butonları çalışıyor

- [ ] **Navigasyon:**
  - [ ] Menü çalışıyor
  - [ ] Alt menüler açılıyor
  - [ ] Dil değiştirme çalışıyor
  - [ ] Mobil menü çalışıyor

- [ ] **Dil Desteği:**
  - [ ] Türkçe (/tr) çalışıyor
  - [ ] İngilizce (/en) çalışıyor
  - [ ] Almanca (/de) çalışıyor
  - [ ] İspanyolca (/es) çalışıyor
  - [ ] Dil geçişi sorunsuz

- [ ] **İletişim Formu:**
  - [ ] Form görünüyor
  - [ ] Validasyon çalışıyor
  - [ ] Submit çalışıyor (API bağlı ise)
  - [ ] Başarı/hata mesajları gösteriliyor

- [ ] **WhatsApp Butonu:**
  - [ ] Buton görünüyor
  - [ ] Tıklandığında WhatsApp açılıyor
  - [ ] Mobilde çalışıyor

- [ ] **Footer:**
  - [ ] Tüm linkler çalışıyor
  - [ ] Sosyal medya linkleri doğru
  - [ ] İletişim bilgileri doğru

### Teknik Testler

Her site için:

- [ ] **Performance:**
  - [ ] Sayfa yükleme hızı < 3 saniye
  - [ ] Images optimize edilmiş
  - [ ] Bundle size makul

- [ ] **SEO:**
  - [ ] Meta taglar var
  - [ ] Title doğru
  - [ ] Description var
  - [ ] Open Graph tagları var
  - [ ] Sitemap erişilebilir (/sitemap.xml)
  - [ ] robots.txt var (/robots.txt)

- [ ] **SSL/Güvenlik:**
  - [ ] HTTPS çalışıyor
  - [ ] SSL sertifikası aktif
  - [ ] Mixed content hatası yok
  - [ ] Güvenlik başlıkları var

- [ ] **Responsive:**
  - [ ] Mobil görünüm düzgün
  - [ ] Tablet görünüm düzgün
  - [ ] Desktop görünüm düzgün

### Browser Testi

Her site için test edin:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## 📊 Deployment Sonrası

### Analytics ve Monitoring

- [ ] **Google Analytics:**
  - [ ] Tracking ID her siteye eklendi
  - [ ] Test edildi (gerçek zamanlı veri)

- [ ] **Google Search Console:**
  - [ ] Her domain eklendi
  - [ ] Ownership doğrulandı
  - [ ] Sitemap gönderildi

- [ ] **Vercel Analytics:**
  - [ ] Aktif edildi
  - [ ] Data geliyor

### Sosyal Medya

- [ ] **Open Graph:**
  - [ ] Facebook'ta test edildi
  - [ ] Twitter'da test edildi
  - [ ] LinkedIn'de test edildi

### Email Testleri

- [ ] **İletişim Formu:**
  - [ ] Form gönderimi çalışıyor
  - [ ] Email alınıyor
  - [ ] Otomatik cevap gönderiliyor

- [ ] **Kariyer Başvurusu:**
  - [ ] Başvuru formu çalışıyor
  - [ ] CV upload çalışıyor
  - [ ] Email bildirimi geliyor

---

## 🔒 Güvenlik Kontrolleri

- [ ] Environment variables güvenli
- [ ] API keys doğru yapılandırılmış
- [ ] CORS ayarları doğru
- [ ] Rate limiting aktif
- [ ] reCAPTCHA çalışıyor (varsa)

---

## 📝 Dokümantasyon

- [ ] Deployment tarihi kaydedildi
- [ ] Preview URL'leri kaydedildi
- [ ] Production URL'leri kaydedildi
- [ ] Vercel project ID'leri kaydedildi
- [ ] DNS ayarları dokümante edildi

---

## 🎉 Final Checklist

### Tüm Siteler İçin:

- [ ] 6 site başarıyla deploy edildi
- [ ] Tüm domainler DNS ayarlandı
- [ ] SSL sertifikaları aktif
- [ ] Environment variables ayarlandı
- [ ] Test checklist tamamlandı
- [ ] Analytics kuruldu
- [ ] Search Console yapılandırıldı
- [ ] Dokumentasyon tamamlandı

### Sorumluluk:

- [ ] Client'a teslim edildi
- [ ] Eğitim verildi (güncelleme nasıl yapılır)
- [ ] Destek kanalları belirlendi
- [ ] Monitoring kuruldu

---

## 📞 Deployment Sonrası İletişim

### Client'a İletilecek Bilgiler:

**Vercel Dashboard:**
- URL: https://vercel.com/dashboard
- Login: [Client email]

**Site URL'leri:**
- Ana Holding: https://bakircilargrup.com
- Ambalaj: https://bakircilarambalaj.com
- Yazılım: https://bakircilaryazilim.com
- Danışmanlık: https://bakircilardanismanlik.com
- Emlak: https://bakircilaremlak.com
- Otomotiv: https://bakircilaroto.com

**Destek Dokümantasyonu:**
- QUICK_DEPLOY.md
- SITE_DEPLOYMENT_GUIDE.md
- DOMAIN_REFERENCE.md
- DEPLOYMENT_SUMMARY.md

---

## ✅ İmza

**Deployment Yapan:**
- İsim: _______________
- Tarih: _______________
- İmza: _______________

**Teslim Alan (Client):**
- İsim: _______________
- Tarih: _______________
- İmza: _______________

---

**Son Güncelleme:** 2024-11-18
**Versiyon:** 1.0.0
