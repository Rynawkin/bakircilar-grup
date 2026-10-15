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
  var ESIK_METNI = "fark %" + sayiYaz(ESIK_YUZDE, 1) + "'i geçmiyor";
  function ekDe(harf) { return harf === "A" ? "A'da" : "B'de"; }
  function kararCumlesi(k, olcuAdi) {   // "Metre başına maliyet B'de %6,7 daha düşük."
    if (k.ayni) return olcuAdi + " aynı.";
    if (k.esit) return olcuAdi + " neredeyse aynı (" + ESIK_METNI + ").";
    return olcuAdi + " " + ekDe(k.dusuk) + " %" + yuzdeYaz(k.farkYuzde) + " daha düşük.";
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
           kararCumlesi: kararCumlesi, waBaglanti: waBaglanti,
           kacir: kacir, alanHTML: alanHTML, secimHTML: secimHTML, deger: deger, secili: secili, alanYaz: alanYaz,
           ozetYazici: ozetYazici, waAyarla: waAyarla, paylasHTML: paylasHTML, girisHTML: girisHTML, kdvHTML: kdvHTML,
           olaylariBagla: olaylariBagla };
});
