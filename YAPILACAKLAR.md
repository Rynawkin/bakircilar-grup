# ✅ Sizin Yapmanız Gerekenler

Proje tamamen hazır! Şimdi sadece birkaç adım kaldı.

---

## 🎯 ŞU ANDA DURUM

```
✅ Tüm siteler kodlandı ve hazır
✅ Git repository oluşturuldu
✅ Tüm dosyalar commit edildi
✅ Deployment scriptleri hazır
✅ Dokümantasyon tamamlandı

⏳ GitHub'a push bekleniyor
⏳ Vercel deployment bekleniyor
```

---

## ADIM 1: GitHub'a Push (3 dakika) 🚀

### Yapmanız Gereken:

1. **GitHub'da repository oluşturun:**
   - https://github.com/new adresine gidin
   - Repository name: `bakircilar-grup`
   - **Private** seçin
   - ❌ README, .gitignore eklemeyin!
   - **Create repository** tıklayın

2. **Terminalde çalıştırın:**

   ```bash
   # GitHub'dan aldığınız URL'i kullanın
   # YOUR-USERNAME yerine kendi kullanıcı adınızı yazın
   git remote add origin https://github.com/YOUR-USERNAME/bakircilar-grup.git

   # Push edin
   git push -u origin main
   ```

   **Örnek:**
   ```bash
   # Kullanıcı adınız "mustafa" ise:
   git remote add origin https://github.com/mustafa/bakircilar-grup.git
   git push -u origin main
   ```

**✅ Tamamlandı mı?** GitHub'da dosyalarınızı görebilirsiniz.

---

## ADIM 2: Vercel'de Deployment (15 dakika) 🌐

**Detaylı Rehber:** `VERCEL_STEP_BY_STEP.md` dosyasını açın!

### Özet:

Her site için **6 kez** tekrarlayacaksınız:

1. https://vercel.com/new → Import Git Repository
2. `bakircilar-grup` repository'sini seçin
3. **Root Directory** belirtin (ÇOK ÖNEMLİ!)
4. Environment Variables ekleyin
5. Deploy tıklayın

### Root Directory (Her Site İçin):

| Site | Root Directory | Environment Variables |
|------|----------------|----------------------|
| Ana Holding | `apps/main` | NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SITE_URL |
| Ambalaj | `apps/ambalaj` | NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SITE_URL |
| Yazılım | `apps/yazilim` | NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SITE_URL |
| Danışmanlık | `apps/danismanlik` | NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SITE_URL |
| Emlak | `apps/emlak` | NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SITE_URL |
| Otomotiv | `apps/otomotiv` | NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SITE_URL |

**Environment Variables (Her Site İçin):**
```
NEXT_PUBLIC_API_URL = https://api.bakircilargrup.com/api
NEXT_PUBLIC_SITE_URL = https://[ilgili-domain]
```

**✅ Tamamlandı mı?** 6 Vercel projesi oluşturuldu ve deploy edildi.

---

## ADIM 3: Domain Ayarları (10 dakika + 24-48 saat DNS) 🌍

### Her Domain İçin DNS Panelinde:

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

### Vercel'de Domain Ekle:

Her proje için:
1. Project → Settings → Domains
2. Domain ekle
3. DNS ayarlarını yaptıktan sonra 24-48 saat bekle

**✅ Tamamlandı mı?** Tüm domainler eklendi ve DNS ayarlandı.

---

## 📋 Hızlı Checklist

### GitHub (3 dakika)
- [ ] GitHub'da `bakircilar-grup` repository'si oluşturdum
- [ ] `git remote add origin` komutunu çalıştırdım
- [ ] `git push -u origin main` ile kodu yükledim
- [ ] GitHub'da dosyaları görebiliyorum

### Vercel (15 dakika)
- [ ] Site 1: Ana Holding deploy edildi (apps/main)
- [ ] Site 2: Ambalaj deploy edildi (apps/ambalaj)
- [ ] Site 3: Yazılım deploy edildi (apps/yazilim)
- [ ] Site 4: Danışmanlık deploy edildi (apps/danismanlik)
- [ ] Site 5: Emlak deploy edildi (apps/emlak)
- [ ] Site 6: Otomotiv deploy edildi (apps/otomotiv)
- [ ] Her sitenin Preview URL'i çalışıyor

### Domain (10 dakika + bekleme)
- [ ] bakircilargrup.com DNS ayarlandı
- [ ] bakircilarambalaj.com DNS ayarlandı
- [ ] bakircilaryazilim.com DNS ayarlandı
- [ ] bakircilardanismanlik.com DNS ayarlandı
- [ ] bakircilaremlak.com DNS ayarlandı
- [ ] bakircilaroto.com DNS ayarlandı
- [ ] 24-48 saat DNS yayılması bekleniyor

---

## 📚 Yardımcı Dökümanlar

Herhangi bir sorun olursa:

| Dosya | Ne için? |
|-------|----------|
| **VERCEL_STEP_BY_STEP.md** | ⭐ Vercel deployment detaylı rehber |
| **DOMAIN_REFERENCE.md** | DNS ayarları detayları |
| **GIT_SETUP_GUIDE.md** | Git ve GitHub detaylı rehber |
| **QUICK_DEPLOY.md** | Hızlı özet |

---

## 🔄 Güncelleme Yapmak (Deployment Sonrası)

Deployment tamamlandıktan sonra, değişiklik yapmak için:

```bash
# Kod değişikliği yapın

# Git'e kaydedin
git add .
git commit -m "Değişiklik açıklaması"
git push

# ⚡ Vercel otomatik deploy eder!
```

---

## 🆘 Sorun mu Var?

### GitHub Push Hatası
- Username/password doğru mu?
- GitHub Token gerekebilir (Settings → Developer settings → Tokens)

### Vercel Build Hatası
- Root Directory doğru seçildi mi?
- Environment Variables eklendi mi?
- View Logs'da hatayı kontrol edin

### Domain Çalışmıyor
- DNS ayarları doğru mu?
- 24-48 saat beklediniz mi?
- Vercel'de domain durumunu kontrol edin (Settings → Domains)

---

## ⏱️ Tahmini Süreler

| İşlem | Süre |
|-------|------|
| GitHub'a push | 3 dakika |
| Vercel'de 6 site deployment | 15 dakika |
| Domain DNS ayarları | 10 dakika |
| DNS yayılması | 24-48 saat |
| SSL aktivasyonu | 1-24 saat |
| **TOPLAM (aktif çalışma)** | **~30 dakika** |
| **TOPLAM (DNS dahil)** | **~48 saat** |

---

## 🎯 Başarı Kriterleri

### Hemen Test Edilebilir:
- ✅ GitHub'da kod görünüyor
- ✅ Vercel'de 6 proje var
- ✅ Her sitenin Preview URL'i açılıyor
- ✅ Siteler çalışıyor (diller, menü, vb.)

### 48 Saat Sonra:
- ✅ Domainler çalışıyor
- ✅ SSL (HTTPS) aktif
- ✅ Tüm diller çalışıyor
- ✅ İletişim formu çalışıyor

---

## 🎉 Sonuç

**30 dakikalık işiniz var:**
1. ⏱️ GitHub'a push (3 dk)
2. ⏱️ Vercel deployment (15 dk)
3. ⏱️ Domain DNS ayarları (10 dk)

**Sonra:**
- ⏳ 24-48 saat DNS yayılması bekleyin
- ✅ Siteler canlı olacak!

---

**Başarılar!** 🚀

Herhangi bir sorunuz olursa `VERCEL_STEP_BY_STEP.md` dosyasına bakın.
