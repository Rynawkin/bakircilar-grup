/* Bakırcılar hesap makineleri — ortak çekirdek (tarayıcıda ve Node testlerinde aynı dosya).
   Hiçbir veri kaydetmez, ağ isteği yapmaz. WhatsApp bağlantısı yalnız kullanıcı tıklayınca açılır. */
(function (kok, fabrika) {
  var api = fabrika();
  kok.HesapOrtak = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  var WA_NUMARA = "908507566267";   // 0850 756 62 67 — yayından önce hedef hesap ayrıca doğrulanmalı
  var ESIK_YUZDE = 0.5;             // fark bu oranı aşmıyorsa "kazanan" gösterilmez
  var TOLERANS_YUZDE = 2;           // bunun altındaki farkta etiket toleransı notu eklenir

  /* ---------- Türkçe sayı okuma ----------
     "1.250,50" -> 1250.5 · "0,77" -> 0.77 · "1.250" -> 1250 · "1.5" / "0.770" -> ondalık (uyarı ile) */
  function sayiOku(metin) {
    var s = String(metin == null ? "" : metin).replace(/\s+/g, "");
    if (s === "") return { bos: true, deger: null, hata: null, not: null };
    if (/^[+]/.test(s)) s = s.slice(1);
    if (/^[-−]/.test(s)) return { bos: false, deger: null, hata: "Eksi değer girilemez.", not: null };
    if (!/^[0-9.,]+$/.test(s)) return { bos: false, deger: null, hata: "Yalnız rakam, nokta ve virgül kullanın.", not: null };
    var not = null, temiz;
    var virgul = (s.match(/,/g) || []).length;
    if (virgul > 1) return { bos: false, deger: null, hata: "Birden fazla virgül var.", not: null };
    if (virgul === 1) {
      var parca = s.split(","), tam = parca[0], ondalik = parca[1];
      if (tam.indexOf(".") >= 0) {
        if (!/^[1-9]\d{0,2}(\.\d{3})+$/.test(tam)) return { bos: false, deger: null, hata: "Binlik ayırıcı noktalar hatalı.", not: null };
        tam = tam.replace(/\./g, "");
      }
      if (ondalik.indexOf(".") >= 0) return { bos: false, deger: null, hata: "Virgülden sonra nokta olamaz.", not: null };
      if (tam === "" && ondalik === "") return { bos: false, deger: null, hata: "Sayı okunamadı.", not: null };
      if (/^[1-9]\d{0,2}$/.test(parca[0]) && /^\d{3}$/.test(ondalik))   // "1,250": Türkçede 1,25; binlik sanılmış olabilir
        not = "Virgül ondalık olarak okundu; binlik ayırmak için nokta kullanın (ör. 1.250).";
      temiz = (tam || "0") + "." + (ondalik || "0");
    } else if (s.indexOf(".") >= 0) {
      if (/^[1-9]\d{0,2}(\.\d{3})+$/.test(s)) {
        temiz = s.replace(/\./g, "");
      } else if ((s.match(/\./g) || []).length === 1) {
        temiz = s; not = "Nokta ondalık ayırıcı olarak okundu; Türkçe yazımda virgül kullanın.";
      } else {
        return { bos: false, deger: null, hata: "Noktalar hatalı yerde.", not: null };
      }
    } else {
      temiz = s;
    }
    var d = Number(temiz);
    if (!isFinite(d)) return { bos: false, deger: null, hata: "Sayı okunamadı.", not: null };
    return { bos: false, deger: d, hata: null, not: not };
  }

  /* Alan denetimi. sinir: { min, max, tamSayi, sifirOlur } — min dahil değildir (sifirOlur ile 0 kabul edilir) */
  function alanDenetle(sinir, metin) {
    var r = sayiOku(metin);
    if (r.bos || r.hata) return r;
    var altSinirGecti = sinir.sifirOlur ? r.deger >= 0 : r.deger > (sinir.min || 0);
    if (!altSinirGecti) return { bos: false, deger: null, hata: sinir.sifirOlur ? "Eksi olamaz." : "0'dan büyük olmalı.", not: r.not };
    if (sinir.tamSayi && Math.floor(r.deger) !== r.deger) return { bos: false, deger: null, hata: "Tam sayı olmalı.", not: r.not };
    if (sinir.altindaOlmali != null && !(r.deger < sinir.altindaOlmali)) return { bos: false, deger: null, hata: sinir.altindaMesaj || "Değer çok büyük.", not: r.not };
    if (r.deger > sinir.max) return { bos: false, deger: null, hata: "Bu değer çok büyük görünüyor; kontrol edin.", not: r.not };
    return r;
  }

  /* ---------- Tam kesir aritmetiği: HesapOrtak.tam ----------
     2. dalganın kaynak/tam_kesir.js dosyasıyla aynı kod (16.10.2026 13:25 sürümü; TamKesir ile aynı adlar ve davranış).
     Kayan nokta işlemlerinde artık kalabilir (1 − 0,9885 = 0,0114999…; 3 × 0,175 = 0,5249999…) ve "yarım yukarı" yuvarlamayı
     bozar; tam değerle hesaplayan araçlar gösterdikleri her sayıyı ve kararı buradan alır. Aşağıdaki eski işlevler değişmedi. */
  var tam = (function () {
    function on(n) { var r = 1n; for (var i = 0; i < n; i++) r *= 10n; return r; }
    /* sayı ya da kesir → { p, q } (BigInt). Sayı en kısa ondalık yazımından okunur: 1250.5 → 12505/10; 1e-7 → 1/10⁷ */
    function kesir(x) {
      if (x && typeof x === "object") return x;
      var m = /^(\d+)(?:\.(\d+))?(?:e([+-]?\d+))?$/.exec(String(x));
      if (!m) throw new Error("Sayı kesre çevrilemedi: " + x);
      var rakam = BigInt(m[1] + (m[2] || "")), olcek = (m[2] || "").length - (m[3] ? parseInt(m[3], 10) : 0);
      return olcek >= 0 ? { p: rakam, q: on(olcek) } : { p: rakam * on(-olcek), q: 1n };
    }
    function kCarp(a, b) { a = kesir(a); b = kesir(b); return { p: a.p * b.p, q: a.q * b.q }; }
    function kBol(a, b) { a = kesir(a); b = kesir(b); return { p: a.p * b.q, q: a.q * b.p }; }
    function kTopla(a, b) { a = kesir(a); b = kesir(b); return { p: a.p * b.q + b.p * a.q, q: a.q * b.q }; }
    function kCikar(a, b) { a = kesir(a); b = kesir(b); return { p: a.p * b.q - b.p * a.q, q: a.q * b.q }; }
    function kKiyas(a, b) { a = kesir(a); b = kesir(b); var f = a.p * b.q - b.p * a.q; return f > 0n ? 1 : f < 0n ? -1 : 0; }
    function kSayi(a) { a = kesir(a); return Number(a.p) / Number(a.q); }
    var SIFIR = { p: 0n, q: 1n }, YARIM = { p: 1n, q: 2n }, BIR = { p: 1n, q: 1n }, IKI = { p: 2n, q: 1n }, YUZ = { p: 100n, q: 1n };
    function sadele(x) {   // en sade kesir (ortak bölen atılır)
      var r = kesir(x), a = r.p < 0n ? -r.p : r.p, b = r.q;
      while (b) { var t = a % b; a = b; b = t; }
      return a > 1n ? { p: r.p / a, q: r.q / a } : r;
    }
    function tavan(x) { var r = kesir(x); return (r.p + r.q - 1n) / r.q; }   // sıfır ya da pozitif kesrin yukarı yuvarlanmışı (BigInt)

    /* Yuvarlama yarım yukarı (değerler sıfır ya da pozitif); sonuç: değerin 10^d katı, tam sayı (BigInt) */
    function yuvarla(x, d) { var r = kesir(x), k = on(d); return (r.p * k * 2n + r.q) / (2n * r.q); }
    function trBicim(n, d, esnek) {   // BigInt (değer × 10^d) → Türkçe yazım: binlik nokta, ondalık virgül
      var s = n.toString(); while (s.length <= d) s = "0" + s;
      var tam = s.slice(0, s.length - d), ond = d ? s.slice(s.length - d) : "";
      if (esnek) ond = ond.replace(/0+$/, "");
      tam = tam.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return ond ? tam + "," + ond : tam;
    }
    function yaz(x, d) { return trBicim(yuvarla(x, d), d, false); }          // tam d ondalık
    function yazEsnek(x, d) { return trBicim(yuvarla(x, d), d, true); }      // en çok d ondalık, gereksiz sıfırsız
    function adetYaz(n) { return trBicim(BigInt(n), 0, false); }              // tam sayı, binlik noktalı (1.500)
    function girdiYaz(x) { var r = kesir(x); return yazEsnek(r, r.q.toString().length - 1); }   // yazıldığı gibi (65 · 65,25 · 0,0005)
    /* Ondalığı sonlu bir değer yuvarlamadan, gereksiz sıfırsız (18,75 · 1.200 · 888,84). Ondalığı sonsuzsa 10 ondalığa yuvarlanır
       (girdilerden çarpma ve 10'un kuvvetlerine bölmeyle çıkan değerlerde olmaz). */
    function ondalikYaz(x) {
      var r = sadele(x), q = r.q, iki = 0, bes = 0;
      while (q % 2n === 0n) { q /= 2n; iki++; }
      while (q % 5n === 0n) { q /= 5n; bes++; }
      return yazEsnek(r, q === 1n ? Math.max(iki, bes) : 10);
    }

    /* Sıfırdan büyük bir değer ekranda hiçbir zaman "0,000" görünmez: ilk anlamlı rakam görünene kadar ondalık artar (en çok 10). */
    function anlamliBasamak(degerler, taban) {
      var d = taban;
      while (d < 10 && degerler.some(function (v) { return kKiyas(v, SIFIR) > 0 && yuvarla(v, d) === 0n; })) d++;
      return d;
    }
    function ayirt(x, y, d) { while (d < 10 && yaz(x, d) === yaz(y, d)) d++; return d; }   // kazanan varsa iki değer ekranda da ayrı
    /* Gösterim ondalığı: sıfırdan büyük değer 0 görünmez VE (ayir doğruysa, yani kazanan varken) iki değer ekranda ayrı görünür; iki koşul
       BİRLİKTE sağlanana dek taban'dan artar (en çok 10). Önce ayırt sonra anlamlı yapmak çok küçük değerlerde ikisini yeniden aynı
       gösterebilir (0,00049 / 0,00051: 3 ondalıkta ayrı, 4'te ikisi de 0,0005); bu yüzden ikisi sabitlenene dek sırayla uygulanır. */
    function ayirtAnlamli(x, y, taban, ayir) {
      var d = taban, onceki = -1;
      while (d !== onceki && d < 10) { onceki = d; d = anlamliBasamak([x, y], d); if (ayir) d = ayirt(x, y, d); }
      return d;
    }
    function birimTaban(degerler) { return degerler.some(function (v) { return kKiyas(v, BIR) < 0; }) ? 3 : 2; }   // 1 TL altı varsa 3 ondalık
    function tutarYaz(x) { return yaz(x, anlamliBasamak([kesir(x)], 2)); }   // TL tutarı: 2 ondalık; çok küçükse anlamlı rakama kadar
    function girdiTlYaz(x) {   // girilen fiyat: tamsa ondalıksız, kuruşluysa 2 ondalık; daha incelikli yazıldıysa yazıldığı gibi
      var r = kesir(x);
      if ((r.p * 100n) % r.q !== 0n) return girdiYaz(r);
      return yaz(r, r.p % r.q === 0n ? 0 : 2);
    }

    /* n × birim tutarı, birim ekrandaki d ondalığa yuvarlanıp çarpılınca farklı bir TL tutarı veriyorsa doğru: ekranda ve mesajda
       "oransal tutar yuvarlanmamış fiyatla hesaplandı" notu çıkar (kullanıcı tablodaki fiyatla çarpınca farkı görüp şaşırmasın). */
    function yuvarlamaCarpimFarki(birim, d, n) {
      var y = { p: yuvarla(birim, d), q: on(d) };
      return tutarYaz(kCarp(birim, n)) !== tutarYaz(kCarp(y, n));
    }

    /* A/B karşılaştırması (simetrik, tam kesirle). Kural çekirdekle aynı: fark %0,5'i geçmiyorsa (tam %0,5 dahil) kazanan yok.
       ta, tb: iki birim maliyetin tam değeri. Dönüş: karar + farklar (tam ve bilgi amaçlı kayan nokta) */
    function karsilastir(ta, tb) {
      var sira = kKiyas(ta, tb), pahali = sira >= 0 ? ta : tb, ucuz = sira >= 0 ? tb : ta;
      var fark = kCikar(pahali, ucuz), farkYuzde = kCarp(kBol(fark, pahali), YUZ);
      var ayni = sira === 0, esit = ayni || kKiyas(farkYuzde, YARIM) <= 0;
      return { esit: esit, ayni: ayni, dusuk: esit ? null : (sira < 0 ? "A" : "B"), farkTam: fark, farkYuzdeTam: farkYuzde,
               fark: kSayi(fark), farkYuzde: kSayi(farkYuzde) };
    }
    /* Yüzde: bir ondalık. Yuvarlanan değer eşiğin yanlış tarafına düşecekse (%0,5'in üstü ≤ 0,5; %2'nin altı ≥ 2; %100'ün altı ≥ 100
       görünürse) 2–4 ondalık; 4'te de düşüyorsa gerçek tarafa (0,5 < p < 1 ise yukarı, değilse aşağı). %100 eşiği: %99,99… fark
       "%100,0 daha düşük" (bedava gibi) görünmez. */
    function yuzdeYaz(p) {
      var ust = kKiyas(p, YARIM) > 0, altIki = kKiyas(p, IKI) < 0, altYuz = kKiyas(p, YUZ) < 0;
      for (var b = 1; b <= 4; b++) {
        var n = yuvarla(p, b), r = { p: n, q: on(b) };
        if (!((ust && kKiyas(r, YARIM) <= 0) || (altIki && kKiyas(r, IKI) >= 0) || (altYuz && kKiyas(r, YUZ) >= 0))) return trBicim(n, b, false);
      }
      var t = kesir(p), k4 = on(4), alt = t.p * k4 / t.q, tamMi = (t.p * k4) % t.q === 0n;
      return trBicim(ust && kKiyas(p, BIR) < 0 && !tamMi ? alt + 1n : alt, 4, false);
    }

    return { on: on, kesir: kesir, kCarp: kCarp, kBol: kBol, kTopla: kTopla, kCikar: kCikar, kKiyas: kKiyas, kSayi: kSayi,
             SIFIR: SIFIR, YARIM: YARIM, BIR: BIR, IKI: IKI, YUZ: YUZ, sadele: sadele, tavan: tavan, yuvarla: yuvarla, trBicim: trBicim,
             yaz: yaz, yazEsnek: yazEsnek, adetYaz: adetYaz, girdiYaz: girdiYaz, ondalikYaz: ondalikYaz,
             anlamliBasamak: anlamliBasamak, ayirt: ayirt, ayirtAnlamli: ayirtAnlamli, birimTaban: birimTaban,
             tutarYaz: tutarYaz, girdiTlYaz: girdiTlYaz, yuvarlamaCarpimFarki: yuvarlamaCarpimFarki, karsilastir: karsilastir, yuzdeYaz: yuzdeYaz };
  })();

  /* ---------- Gösterim ---------- */
  function sayiYaz(x, basamak) {
    return new Intl.NumberFormat("tr-TR", { minimumFractionDigits: basamak, maximumFractionDigits: basamak }).format(x);
  }
  function sayiYazEsnek(x, enCok) {   // gereksiz sıfır yazmadan: 92,25 · 553,5 · 600
    return new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: enCok == null ? 3 : enCok }).format(x);
  }
  function tlYaz(x) { return sayiYaz(x, Math.abs(x % 1) > 1e-9 ? 2 : 0); }
  function birimBasamak(fiyatlar) {   // iki üründen biri 1 TL altındaysa 3, değilse 2 ondalık
    return Math.min.apply(null, fiyatlar) < 1 ? 3 : 2;
  }
  function asagiYaz(x, basamak) {   // aşağı yuvarlayarak: 4,96 palet → "4,9" (yanında "tam 4" ile çelişmesin)
    var k = Math.pow(10, basamak);
    return sayiYaz(Math.floor((x + 1e-9) * k) / k, basamak);   // tam sayı da floor(x + 1e-9) ile bulunur: ikisi aynı payla
  }
  /* Yüzde: bir ondalık; eşiklerin (%0,5 ve %2) yanlış tarafında görünecekse daha çok ondalık (0,54 → "0,54"; 1,96 → "1,96").
     Eşiğe 4 ondalıktan da yakınsa gerçek tarafa yuvarlanır: 0,50003 → "0,5001"; 1,99996 → "1,9999". */
  function yuzdeYaz(p) {
    for (var b = 1; b <= 4; b++) {
      var k = Math.pow(10, b), r = Math.round(p * k) / k;
      if (!((p > ESIK_YUZDE && r <= ESIK_YUZDE) || (p < TOLERANS_YUZDE && r >= TOLERANS_YUZDE))) return sayiYaz(p, b);
    }
    return sayiYaz(p > ESIK_YUZDE && p < 1 ? Math.ceil(p * 1e4) / 1e4 : Math.floor(p * 1e4) / 1e4, 4);
  }

  /* ---------- A/B karşılaştırması (düşük olan maliyet) ----------
     Simetrik. Karar yalnız gerçek farka göre verilir: fark %0,5'i aşmıyorsa kazanan gösterilmez.
     taban: o ölçünün normal ondalık sayısı. Kazanan varsa ondalık, iki değer ekranda da farklı görünene kadar artırılır
     (basamak; en çok 10); böylece "1,20 / 1,20" yazıp birini düşük gösteren bir sonuç çıkmaz. */
  function ayirtBasamak(a, b, taban) {   // gerçekçi değerlerde en çok 1–2 ek ondalık; uç değerlerde 10 ondalığa kadar
    var d = taban;
    while (d < 10 && sayiYaz(a, d) === sayiYaz(b, d)) d++;
    return d;
  }
  function karsilastir(aDeger, bDeger, taban) {
    var pahali = Math.max(aDeger, bDeger), ucuz = Math.min(aDeger, bDeger);
    var farkYuzde = (pahali - ucuz) / pahali * 100, t = taban == null ? 2 : taban;
    var ayni = Math.abs(pahali - ucuz) <= 1e-12 * pahali;
    var esit = ayni || farkYuzde <= ESIK_YUZDE + 1e-9;   // 1e-9: kayan nokta payı (tam %0,5 kazanan sayılmaz)
    return { esit: esit, ayni: ayni, farkYuzde: farkYuzde, dusuk: esit ? null : (aDeger < bDeger ? "A" : "B"), fark: pahali - ucuz,
             toleransNotu: !esit && farkYuzde < TOLERANS_YUZDE - 1e-9, basamak: esit ? t : ayirtBasamak(aDeger, bDeger, t) };
  }
  /* Tam kesirle A/B karşılaştırması: eski karsilastir'la aynı alanlar (esit, ayni, farkYuzde, dusuk, fark, toleransNotu, basamak);
     tam değerler görünmeyen "tam" alanında (JSON'a girmez). ta, tb: tam değerler. Karar ve ondalık 2. dalga araçlarıyla aynı kural:
     fark %0,5'i geçmiyorsa (tam %0,5 dahil) kazanan yok; sıfırdan büyük değer 0 görünmez ve kazanan varsa iki değer ekranda ayrı
     görünür (iki koşul birlikte sağlanana dek ondalık artar: tam.ayirtAnlamli). */
  function karsilastirTam(ta, tb, taban) {
    var t = taban == null ? 2 : taban, k = tam.karsilastir(ta, tb);
    var sonuc = { esit: k.esit, ayni: k.ayni, farkYuzde: k.farkYuzde, dusuk: k.dusuk, fark: k.fark,
                  toleransNotu: !k.esit && tam.kKiyas(k.farkYuzdeTam, TOLERANS_YUZDE) < 0,
                  basamak: tam.ayirtAnlamli(ta, tb, t, !k.esit) };
    Object.defineProperty(sonuc, "tam", { value: { fark: k.farkTam, farkYuzde: k.farkYuzdeTam } });
    return sonuc;
  }
  var ESIK_METNI = "fark %" + sayiYaz(ESIK_YUZDE, 1) + "'i geçmiyor";
  function ekDe(harf) { return harf === "A" ? "A'da" : "B'de"; }
  function kararCumlesi(k, olcuAdi) {   // "Metre başına maliyet B'de %6,7 daha düşük." (karsilastirTam sonucunda yüzde tam değerden)
    if (k.ayni) return olcuAdi + " aynı.";
    if (k.esit) return olcuAdi + " neredeyse aynı (" + ESIK_METNI + ").";
    return olcuAdi + " " + ekDe(k.dusuk) + " %" + (k.tam ? tam.yuzdeYaz(k.tam.farkYuzde) : yuzdeYaz(k.farkYuzde)) + " daha düşük.";
  }
  /* Mesajın fiyat cümlesi (çöp poşeti aracıyla aynı): örnek fiyatlar kaldıysa bunu açıkça söyler; KDV kapsamı iki teklif için birlikte */
  function fiyatCumlesi(ikiTeklif, kdv, ornek) {
    var kapsam = "(" + (ikiTeklif ? "iki teklif de " : "") + (kdv === "haric" ? "KDV hariç" : "KDV dahil") + ")";
    return ornek ? "Bu hesapta sayfadaki hayali örnek fiyatlar var; gerçek teklif değildir " + kapsam + "."
                 : (ikiTeklif ? "Fiyatlar benim girdiğim değerlerdir " : "Fiyat benim girdiğim değerdir ") + kapsam + ".";
  }

  function waBaglanti(numara, metin) { return "https://wa.me/" + numara + "?text=" + encodeURIComponent(metin); }

  /* ---------- Arayüz yardımcıları (yalnız tarayıcıda) ---------- */
  var NB = " ";
  function kacir(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function alanHTML(o) {   // o: { id, etiket, birim, mod, yer, ipucu, zorunlu }
    return '<div class="hk-alan"><label for="' + o.id + '">' + o.etiket + (o.birim ? '<span class="hk-gizli"> (' + o.birim + ")</span>" : "") + "</label>" +
      '<div class="hk-kutu"><input id="' + o.id + '" inputmode="' + (o.mod || "decimal") + '" autocomplete="off" placeholder="' + kacir(o.yer || "") +
      '" aria-describedby="' + o.id + '_i"' + (o.deger != null ? ' value="' + kacir(o.deger) + '"' : "") + ">" +
      (o.birim ? '<span class="hk-birim" aria-hidden="true">' + o.birim + "</span>" : "") + "</div>" +
      '<div class="hk-ipucu" id="' + o.id + '_i">' + (o.ipucu || "") + "</div></div>";
  }
  function secimHTML(ad, secenekler, etiket, ipucu) {   // radyo düğmeli bölmeli seçim
    return '<fieldset class="hk-secim-alan"><legend>' + etiket + '</legend><div class="hk-secim" role="radiogroup">' +
      secenekler.map(function (s) {
        return '<label><input type="radio" name="' + ad + '" value="' + s.deger + '"' + (s.secili ? " checked" : "") + "><span>" + s.etiket + "</span></label>";
      }).join("") + "</div>" + (ipucu ? '<p class="hk-ipucu">' + ipucu + "</p>" : "") + "</fieldset>";
  }
  function deger(kokEl, id) { var el = kokEl.querySelector("#" + id); return el ? el.value : ""; }
  function secili(kokEl, ad) { var el = kokEl.querySelector('input[name="' + ad + '"]:checked'); return el ? el.value : null; }
  function alanYaz(kokEl, id, sonuc) {
    var el = kokEl.querySelector("#" + id), ip = kokEl.querySelector("#" + id + "_i");
    if (!el || !ip) return;
    if (ip.dataset.ilk == null) ip.dataset.ilk = ip.innerHTML;
    if (sonuc && sonuc.hata) { el.setAttribute("aria-invalid", "true"); ip.className = "hk-hata"; ip.textContent = sonuc.hata; }
    else if (sonuc && sonuc.not) { el.removeAttribute("aria-invalid"); ip.className = "hk-okunus"; ip.textContent = sonuc.not + " Okunan: " + sayiYazEsnek(sonuc.girilen != null ? sonuc.girilen : sonuc.deger); }
    else { el.removeAttribute("aria-invalid"); ip.className = "hk-ipucu"; ip.innerHTML = ip.dataset.ilk; }
  }
  function ozetYazici(kokEl) {   // ekran okuyucuya yalnız kısa sonuç cümlesi; yazma durunca bir kez
    var zaman = null, el = kokEl.querySelector(".hk-ozet");
    return function (metin) { clearTimeout(zaman); zaman = setTimeout(function () { if (el) el.textContent = metin; }, 700); };
  }
  function waAyarla(aEl, metin) {
    if (metin) { aEl.href = waBaglanti(WA_NUMARA, metin); aEl.setAttribute("aria-disabled", "false"); }
    else { aEl.href = "#"; aEl.setAttribute("aria-disabled", "true"); }
  }
  var WA_SIMGE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.6-4.5A8.4 8.4 0 1 1 20.5 11.6Z"/></svg>';
  function paylasHTML() {
    return '<section class="hk-paylas"><a class="hk-wa" href="#" target="_blank" rel="noopener noreferrer" aria-disabled="true">' + WA_SIMGE + "Hesabı WhatsApp'ta aç</a>" +
      '<p class="hk-ipucu hk-orta">Bu sayfa girdiğiniz rakamları kaydetmez. Düğmeye basmadıkça hiçbir yere göndermez; basınca mesaj WhatsApp\'ta hazır açılır, göndermek size kalır.</p>' +
      '<details class="hk-onizleme"><summary>Açılacak mesajı göster</summary><pre class="hk-mesaj">—</pre></details></section>';
  }
  function girisHTML(o) {   // o: { ustEtiket, baslik, aciklama }
    return '<section class="hk-giris"><p class="hk-ust-etiket">' + o.ustEtiket + "</p><h1>" + o.baslik + "</h1>" +
      '<p class="hk-aciklama">' + o.aciklama + "</p>" +
      '<div class="hk-hizli"><button type="button" class="hk-ornek-dugme">Örnek değerlerle dene</button><button type="button" class="hk-temizle">Temizle</button></div>' +
      '<p class="hk-ornek-isaret">Örnek değerler gösteriliyor. Bunlar hayali değerlerdir; gerçek bir ürün ya da satış fiyatı değildir. Kendi teklifinizi yazın.</p></section>';
  }
  function kdvHTML() {
    return secimHTML("kdv", [{ deger: "dahil", etiket: "KDV dahil", secili: true }, { deger: "haric", etiket: "KDV hariç" }],
      "Yazdığınız fiyatların hepsi", "Tüm fiyatları aynı esasla girin; sayfa KDV hesaplamaz.");
  }
  /* Ortak olay bağlama: her girişte yeniden hesap; örnek doldur; temizle; boş WhatsApp tıklamasını engelle */
  function olaylariBagla(kokEl, hesapla, ornekDoldur) {
    kokEl.addEventListener("input", function (e) { if (e.target.matches("input, select")) hesapla(); });
    kokEl.addEventListener("change", function (e) { if (e.target.matches("select, input[type=radio], input[type=checkbox]")) hesapla(); });
    kokEl.querySelector(".hk-ornek-dugme").addEventListener("click", function () { ornekDoldur(); hesapla(); });
    kokEl.querySelector(".hk-temizle").addEventListener("click", function () {
      kokEl.querySelectorAll("input:not([type=radio]):not([type=checkbox])").forEach(function (i) { i.value = i.dataset.varsayilan || ""; });
      kokEl.querySelectorAll("select").forEach(function (s) { s.selectedIndex = 0; });
      kokEl.querySelectorAll("input[type=radio]").forEach(function (r) { r.checked = r.defaultChecked; });
      kokEl.querySelectorAll("input[type=checkbox]").forEach(function (c) { c.checked = c.defaultChecked; });
      hesapla(); var ilk = kokEl.querySelector("input[inputmode]"); if (ilk) ilk.focus();
    });
    kokEl.querySelector(".hk-wa").addEventListener("click", function (e) { if (this.getAttribute("aria-disabled") === "true") e.preventDefault(); });
  }

  return { WA_NUMARA: WA_NUMARA, ESIK_YUZDE: ESIK_YUZDE, TOLERANS_YUZDE: TOLERANS_YUZDE, ESIK_METNI: ESIK_METNI, NB: NB,
           sayiOku: sayiOku, alanDenetle: alanDenetle, sayiYaz: sayiYaz, sayiYazEsnek: sayiYazEsnek, tlYaz: tlYaz, asagiYaz: asagiYaz,
           yuzdeYaz: yuzdeYaz, birimBasamak: birimBasamak, ayirtBasamak: ayirtBasamak, karsilastir: karsilastir, ekDe: ekDe,
           kararCumlesi: kararCumlesi, waBaglanti: waBaglanti, tam: tam, karsilastirTam: karsilastirTam, fiyatCumlesi: fiyatCumlesi,
           kacir: kacir, alanHTML: alanHTML, secimHTML: secimHTML, deger: deger, secili: secili, alanYaz: alanYaz,
           ozetYazici: ozetYazici, waAyarla: waAyarla, paylasHTML: paylasHTML, girisHTML: girisHTML, kdvHTML: kdvHTML,
           olaylariBagla: olaylariBagla };
});
