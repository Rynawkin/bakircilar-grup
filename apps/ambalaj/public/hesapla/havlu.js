/* Havlu metre fiyatı — hesap + ekran. Toplam metre = rulo × rulo metresi; metre fiyatı = koli fiyatı ÷ toplam metre. */
(function (kok, fabrika) {
  var O = kok.HesapOrtak || (typeof require === "function" ? require("./ortak.js") : null);
  var api = fabrika(O);
  kok.HavluHesap = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis, function (O) {
  "use strict";
  var T = O.tam;   // tam kesir aritmetiği (çekirdek; 2. dalganın tam_kesir.js'iyle aynı)

  var SINIR = {
    koliFiyati: { max: 1000000 }, ruloSayisi: { max: 500, tamSayi: true }, ruloMetre: { max: 5000 },
    hedefMetre: { max: 10000000 }, kat: { max: 6, tamSayi: true }, gramaj: { max: 200 }
  };
  function alanDenetle(ad, metin) { return O.alanDenetle(SINIR[ad], metin); }

  /* Gösterilen her sayı ve karar nesnenin görünmeyen "tam" alanındaki kesirden (çekirdek: tam kesir aritmetiği);
     kayan nokta alanları yalnız bilgi içindir. */
  function urunHesapla(koliFiyati, ruloSayisi, ruloMetre) {
    var toplam = T.kCarp(ruloSayisi, ruloMetre), metre = T.kBol(koliFiyati, toplam), yuz = T.kCarp(metre, 100);
    var u = { koliFiyati: koliFiyati, ruloSayisi: ruloSayisi, ruloMetre: ruloMetre,
              toplamMetre: T.kSayi(toplam), metreFiyati: T.kSayi(metre), yuzMetreFiyati: T.kSayi(yuz) };
    Object.defineProperty(u, "tam", { value: { koli: T.kesir(koliFiyati), toplam: toplam, metre: metre, yuz: yuz } });
    return u;
  }
  function hedefHesapla(urun, hedefMetre) {   // oransal maliyet ve tam koli alımı ayrı; tam koli yukarı yuvarlanır
    var koliAdet = Math.max(1, Number(T.tavan(T.kBol(hedefMetre, urun.tam.toplam))));
    var oransal = T.kCarp(hedefMetre, urun.tam.metre), tamKoli = T.kCarp(koliAdet, urun.tam.koli), elde = T.kCarp(koliAdet, urun.tam.toplam);
    var fazla = T.kCikar(elde, hedefMetre);
    var h = { hedefMetre: hedefMetre, oransalMaliyet: T.kSayi(oransal), koliAdet: koliAdet,
              tamKoliMaliyet: T.kSayi(tamKoli), eldeMetre: T.kSayi(elde), fazlaMetre: T.kSayi(fazla) };
    Object.defineProperty(h, "tam", { value: { oransal: oransal, tamKoli: tamKoli, elde: elde, fazla: fazla } });
    return h;
  }
  var metreBasamak = T.birimTaban;
  function karsilastir(a, b) {   // k.basamak: metre fiyatının gösterileceği ondalık (kazanan varsa iki değer ayrı görünür)
    var k = O.karsilastirTam(a.tam.metre, b.tam.metre, metreBasamak([a.tam.metre, b.tam.metre]));
    k.tam.bin = T.kCarp(k.tam.fark, 1000);
    k.binMetreFarki = T.kSayi(k.tam.bin);
    return k;
  }
  /* Ekranın, mesajın ve testlerin kullandığı tek gösterim kuralı: { k, basamak (metre fiyatı), yuzBasamak (100 m) } */
  function gosterim(a, b) {
    var k = b ? karsilastir(a, b) : null;
    return { k: k, basamak: k ? k.basamak : T.anlamliBasamak([a.tam.metre], metreBasamak([a.tam.metre])),
             yuzBasamak: T.anlamliBasamak(b ? [a.tam.yuz, b.tam.yuz] : [a.tam.yuz], 2) };
  }
  /* Kat / gramaj: yalnız karşılaştırılabilirlik notu; üstünlük iddiası üretmez. B teklifi tam değilse not yok. */
  function notlar(g) {
    if (g.karsilastirma === false) return [];
    var n = [], kA = g.katA, kB = g.katB;
    if (kA != null && kB != null) { if (kA !== kB) n.push("Kat sayıları farklı (A: " + kA + " kat, B: " + kB + " kat). Metre fiyatı kat, kalınlık ya da dayanım farkını göstermez."); }
    else if (kA != null || kB != null) n.push("Kat bilgisi yalnız bir üründe girildi; karşılaştırmak için ikisinde de etiketten yazın.");
    var gA = g.gramajA, gB = g.gramajB, eA = g.esasA || "bilinmiyor", eB = g.esasB || "bilinmiyor";
    if (gA != null && gB != null) {
      if (eA === "bilinmiyor" || eB === "bilinmiyor") n.push("Gramajın kat başına mı, toplam mı yazıldığı belli değil. Bu hâliyle karşılaştırılamaz.");
      else if (eA !== eB) n.push("Gramajlardan biri kat başına, diğeri toplam yazılmış. Bu hâliyle karşılaştırılamaz.");
      else if (gA !== gB) n.push("Gramajlar farklı (A: " + O.sayiYazEsnek(gA, 1) + " g/m², B: " + O.sayiYazEsnek(gB, 1) + " g/m², " +
                                 (eA === "kat" ? "kat başına" : "toplam") + "). Gramaj kalınlık değildir; tek başına kaliteyi göstermez.");
    } else if (gA != null || gB != null) n.push("Gramaj yalnız bir üründe girildi; karşılaştırmak için ikisinde de aynı esasla yazın.");
    return n;
  }
  function mesajMetni(s) {   // s.basamak / s.yuzBasamak: ekrandaki tabloyla aynı ondalıklar (gosterim)
    var b = s.basamak, satir = ["Merhaba, Bakırcılar havlu hesap sayfasında hesap yaptım:"];
    function urunSatiri(ad, u) {
      return ad + ": koli " + T.girdiTlYaz(u.koliFiyati) + " TL, " + T.adetYaz(u.ruloSayisi) + " rulo × " + O.sayiYazEsnek(u.ruloMetre) + " m = " +
             T.yazEsnek(u.tam.toplam, 3) + " m → metre " + T.yaz(u.tam.metre, b) + " TL (100 m: " + T.yaz(u.tam.yuz, s.yuzBasamak) + " TL)";
    }
    function kagitSatiri(ad, g) {
      if (!g || (g.kat == null && g.gramaj == null)) return null;
      var p = [];
      if (g.kat != null) p.push(g.kat + " kat");
      if (g.gramaj != null) p.push(O.sayiYazEsnek(g.gramaj, 1) + " g/m² (" + (g.esas === "kat" ? "kat başına" : g.esas === "toplam" ? "toplam" : "esası belirtilmedi") + ")");
      return ad + " kâğıt bilgisi: " + p.join(", ");
    }
    satir.push(urunSatiri("A", s.a));
    if (s.b) satir.push(urunSatiri("B", s.b));
    if (s.kagit) ["A", "B"].forEach(function (ad) { var k = kagitSatiri(ad, s.kagit[ad]); if (k) satir.push(k); });
    if (s.k) {
      if (s.k.ayni) satir.push("Metre fiyatları aynı.");
      else if (s.k.esit) satir.push("Metre fiyatları neredeyse aynı (" + O.ESIK_METNI + ").");
      else {
        satir.push("Metre başına maliyet " + O.ekDe(s.k.dusuk) + " %" + T.yuzdeYaz(s.k.tam.farkYuzde) + " daha düşük (1.000 m'de " + T.tutarYaz(s.k.tam.bin) + " TL fark).");
        if (s.k.toleransNotu) satir.push("Fark %" + O.TOLERANS_YUZDE + "'nin altında; etiketteki metre toleransı bu farkı değiştirebilir.");
      }
    }
    if (s.hedef) {
      satir.push("İhtiyaç: " + O.sayiYazEsnek(s.hedef.metre) + " m");
      s.hedef.sonuc.forEach(function (h) {
        satir.push("- " + h.ad + ": oransal " + T.tutarYaz(h.tam.oransal) + " TL; tam koli " + T.adetYaz(h.koliAdet) + " koli = " +
                   T.tutarYaz(h.tam.tamKoli) + " TL (" + T.yazEsnek(h.tam.elde, 3) + " m)");
      });
    }
    satir.push(O.fiyatCumlesi(!!s.b, s.kdv, s.ornek));
    satir.push("Rulo metreleri etiketteki değerdir; hesap kaliteyi ölçmez.");
    return satir.join("\n");
  }

  /* ---------- Ekran ---------- */
  var ORNEK = { A: { koliFiyati: "360", ruloSayisi: "12", ruloMetre: "50" }, B: { koliFiyati: "420", ruloSayisi: "6", ruloMetre: "125" }, hedefMetre: "2.500" };

  function baslat(kokEl) {
    var NB = O.NB;
    function kart(u) {
      function a(id, etiket, birim, mod, yer, ipucu) { return O.alanHTML({ id: id + u, etiket: etiket, birim: birim, mod: mod, yer: yer, ipucu: ipucu }); }
      return '<section class="hk-kart" data-u="' + u + '" aria-labelledby="hk-baslik' + u + '"><h2 id="hk-baslik' + u + '"><span class="hk-harf" aria-hidden="true">' + u + "</span>" +
        u + " teklifi" + (u === "B" ? ' <span class="hk-silik">(karşılaştırma için)</span>' : "") + "</h2>" +
        a("koliFiyati", "Koli fiyatı", "TL", "decimal", "ör. 600", "") +
        '<div class="hk-iki">' + a("ruloSayisi", "Kolideki rulo", "rulo", "numeric", "ör. 6", "") + a("ruloMetre", "Bir rulo", "m", "decimal", "ör. 130", "Etiketteki metre") + "</div>" +
        '<details><summary>Kâğıt bilgisi (isteğe bağlı)</summary><p class="hk-ipucu-genel">Bu bilgiler sonucu değiştirmez; yalnız iki ürünün aynı ölçüyle karşılaştırılıp karşılaştırılamayacağını not eder.</p>' +
        '<div class="hk-iki">' + a("kat", "Kat sayısı", "kat", "numeric", "ör. 2", "") + a("gramaj", "Gramaj", "g/m²", "decimal", "ör. 18", "") + "</div>" +
        '<div class="hk-alan"><label for="esas' + u + '">Gramaj neye göre yazılmış?</label><div class="hk-kutu"><select id="esas' + u + '">' +
        '<option value="bilinmiyor">Bilmiyorum / etikette yok</option><option value="kat">Kat başına</option><option value="toplam">Toplam (tüm katlar)</option></select></div></div>' +
        "</details></section>";
    }
    kokEl.innerHTML = O.girisHTML({ ustEtiket: "Metre Metin'in hesap makinesi", baslik: "Havlu: metre fiyatı",
        aciklama: "Koliye değil, metreye bakın. Etiketteki rulo sayısını ve rulo metresini yazın; iki teklifi kendi rakamlarınızla karşılaştırın." }) +
      O.kdvHTML() + kart("A") + kart("B") +
      '<section class="hk-kart"><h2>İhtiyacınız <span class="hk-silik">(isteğe bağlı)</span></h2>' +
      O.alanHTML({ id: "hedefMetre", etiket: "Toplam kaç metre havlu gerekiyor?", birim: "m", yer: "ör. 2.500", ipucu: "Oransal maliyet ile tam koli alım maliyeti ayrı gösterilir." }) + "</section>" +
      '<section class="hk-sonuc" aria-labelledby="hk-sonuc-baslik"></section><p class="hk-gizli hk-ozet" aria-live="polite"></p>' + O.paylasHTML() +
      '<footer class="hk-alt"><p>Sonuçlar yalnız girdiğiniz değerlere göre hesaplanır. Rulo metresi etiketteki değerdir; etikette tolerans (ör.' + NB + "±2" + NB + "m) olabilir. Sayfadaki örnek değerler hayalidir.</p>" +
      "<p>Metre fiyatı maliyeti karşılaştırır; kâğıdın kalitesini, dayanımını ya da işinize uygunluğunu ölçmez.</p></footer>";

    var ozetYaz = O.ozetYazici(kokEl), wa = kokEl.querySelector(".hk-wa"), sonucEl = kokEl.querySelector(".hk-sonuc");
    var ornekYuklu = false;   // "Örnek değerlerle dene" basıldı; Temizle ile biter
    function d(id) { return O.deger(kokEl, id); }
    function ornekMi() {   // fiyatlardan biri hâlâ hayali örnek fiyatsa sonuç örnek sayılır (başka alan değişse de)
      return ornekYuklu && ["A", "B"].some(function (u) { return d("koliFiyati" + u).trim() === ORNEK[u].koliFiyati; });
    }
    function urunOku(u) {
      var f = {}, tamam = true, bosSay = 0;
      ["koliFiyati", "ruloSayisi", "ruloMetre"].forEach(function (a) {
        var r = alanDenetle(a, d(a + u)); O.alanYaz(kokEl, a + u, r);
        if (r.bos) bosSay++;
        if (r.bos || r.hata) tamam = false; else f[a] = r.deger;
      });
      var kat = alanDenetle("kat", d("kat" + u)); O.alanYaz(kokEl, "kat" + u, kat);
      var gr = alanDenetle("gramaj", d("gramaj" + u)); O.alanYaz(kokEl, "gramaj" + u, gr);
      return { tamam: tamam, hepsiBos: bosSay === 3, urun: tamam ? urunHesapla(f.koliFiyati, f.ruloSayisi, f.ruloMetre) : null,
               kat: kat.hata || kat.bos ? null : kat.deger, gramaj: gr.hata || gr.bos ? null : gr.deger, esas: d("esas" + u) };
    }
    function metre(x) { return T.yazEsnek(x, 3) + NB + "m"; }
    function tl(x, b) { return (b == null ? T.tutarYaz(x) : T.yaz(x, b)) + NB + "TL"; }

    function hesapla() {
      var A = urunOku("A"), B = urunOku("B");
      var hedefR = alanDenetle("hedefMetre", d("hedefMetre")); O.alanYaz(kokEl, "hedefMetre", hedefR);
      var kdv = O.secili(kokEl, "kdv") || "dahil", ornek = ornekMi();
      kokEl.classList.toggle("hk-ornek", ornek);
      if (!A.tamam) {
        sonucEl.innerHTML = '<h2 id="hk-sonuc-baslik">Sonuç</h2><p class="hk-bos">Sonucu görmek için A teklifinin üç alanını doldurun: koli fiyatı, rulo sayısı ve rulo uzunluğu.</p>';
        O.waAyarla(wa, null); kokEl.querySelector(".hk-mesaj").textContent = "—"; ozetYaz("Sonuç için A teklifinin üç alanını doldurun."); return;
      }
      var a = A.urun, b = B.tamam ? B.urun : null, gs = gosterim(a, b);
      var k = gs.k, dusuk = k && !k.esit ? k.dusuk : null, basamak = gs.basamak, yuzBasamak = gs.yuzBasamak;
      function hucre(u, x) { return '<td class="hk-sayi' + (dusuk === u ? ' hk-dusuk" title="Metre başına daha düşük' : "") + '">' + x + "</td>"; }
      function satirBasi(x) { return '<th scope="row">' + x + "</th>"; }
      var h = '<h2 id="hk-sonuc-baslik">Sonuç</h2><span class="hk-ornek-rozet">Örnek değerlerle hesaplandı</span>' +
        '<table class="hk-tablo"><thead><tr><th scope="col"><span class="hk-gizli">Ölçü</span></th><th scope="col">A</th>' + (b ? '<th scope="col">B</th>' : "") + "</tr></thead><tbody>" +
        "<tr>" + satirBasi("Kolideki toplam metre") + hucre("", metre(a.tam.toplam)) + (b ? hucre("", metre(b.tam.toplam)) : "") + "</tr>" +
        '<tr class="hk-vurgu">' + satirBasi("Metre fiyatı") + hucre("A", tl(a.tam.metre, basamak)) + (b ? hucre("B", tl(b.tam.metre, basamak)) : "") + "</tr>" +
        "<tr>" + satirBasi("100 metresi") + hucre("", tl(a.tam.yuz, yuzBasamak)) + (b ? hucre("", tl(b.tam.yuz, yuzBasamak)) : "") + "</tr></tbody></table>";
      if (k) {
        var karar = O.kararCumlesi(k, "Metre başına maliyet");
        h += '<div class="hk-karar"><b>' + (k.ayni ? "Metre fiyatları aynı." : k.esit ? "Metre fiyatları neredeyse aynı." : karar) + "</b>" +
             (k.ayni ? "" : k.esit ? "<span>Fark %" + O.sayiYaz(O.ESIK_YUZDE, 1) + "'i geçmiyor; bu yüzden biri öne çıkarılmadı.</span>" :
              "<span>Aynı 1.000 metre için fark " + tl(k.tam.bin) + "." + (k.toleransNotu ? " Fark %" + O.TOLERANS_YUZDE + "'nin altında; etiketteki metre toleransı bu farkı değiştirebilir." : "") + "</span>") + "</div>";
        ozetYaz(karar);
      } else if (B.hepsiBos) {
        h += '<div class="hk-karar"><span>Karşılaştırmak için B teklifini de yazın.</span></div>'; ozetYaz("A teklifinin metre fiyatı " + tl(a.tam.metre, basamak) + ".");
      } else {
        h += '<div class="hk-karar"><span>B teklifinde eksik ya da hatalı alan var; karşılaştırma yapılmadı.</span></div>'; ozetYaz("B teklifinde eksik ya da hatalı alan var.");
      }
      var hedefVeri = null;
      if (!hedefR.bos && !hedefR.hata) {
        var liste = [{ ad: "A", u: a }]; if (b) liste.push({ ad: "B", u: b });
        var sonuclar = liste.map(function (x) { var r = hedefHesapla(x.u, hedefR.deger); r.ad = x.ad; return r; });
        h += '<div class="hk-hedef"><h3>' + metre(hedefR.deger) + " için</h3>" + sonuclar.map(function (r) {
          var artan = T.yazEsnek(r.tam.fazla, 3) !== "0";   // artan metre ekranda görünecek kadarsa yazılır
          return '<div class="hk-satir"><b>' + r.ad + ":</b> tam ihtiyaç kadar (oransal) <b>" + tl(r.tam.oransal) + "</b><br>Tam koli alırsanız <b>" + T.adetYaz(r.koliAdet) + " koli = " +
                 tl(r.tam.tamKoli) + "</b> (" + metre(r.tam.elde) + (artan ? ", " + metre(r.tam.fazla) + " artar" : "") + ")</div>";
        }).join("") + "</div>";
        hedefVeri = { metre: hedefR.deger, sonuc: sonuclar };
      }
      var n = notlar({ katA: A.kat, katB: B.kat, gramajA: A.gramaj, gramajB: B.gramaj, esasA: A.esas, esasB: B.esas, karsilastirma: !!b });
      n.push("Bu hesap yalnız metre başına maliyeti gösterir; kaliteyi, dayanımı ya da uygunluğu ölçmez.");
      h += '<ul class="hk-notlar">' + n.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
      sonucEl.innerHTML = h;
      var kagit = { A: { kat: A.kat, gramaj: A.gramaj, esas: A.esas }, B: b ? { kat: B.kat, gramaj: B.gramaj, esas: B.esas } : null };
      var metin = mesajMetni({ a: a, b: b, k: k, basamak: basamak, yuzBasamak: yuzBasamak, kdv: kdv, hedef: hedefVeri, ornek: ornek, kagit: kagit });
      kokEl.querySelector(".hk-mesaj").textContent = metin; O.waAyarla(wa, metin);
    }
    function ornekDoldur() {
      ["A", "B"].forEach(function (u) { Object.keys(ORNEK[u]).forEach(function (a) { kokEl.querySelector("#" + a + u).value = ORNEK[u][a]; }); });
      kokEl.querySelector("#hedefMetre").value = ORNEK.hedefMetre;
      ornekYuklu = true;
    }
    O.olaylariBagla(kokEl, hesapla, ornekDoldur);
    kokEl.querySelector(".hk-temizle").addEventListener("click", function () { ornekYuklu = false; });
    hesapla();
    return { hesapla: hesapla, ornekDoldur: ornekDoldur };
  }

  return { SINIR: SINIR, ORNEK: ORNEK, ESIK_YUZDE: O.ESIK_YUZDE, TOLERANS_YUZDE: O.TOLERANS_YUZDE, sayiOku: O.sayiOku, alanDenetle: alanDenetle,
           urunHesapla: urunHesapla, hedefHesapla: hedefHesapla, karsilastir: karsilastir, gosterim: gosterim, notlar: notlar, metreBasamak: metreBasamak,
           sayiYaz: O.sayiYaz, sayiYazEsnek: O.sayiYazEsnek, tlYaz: O.tlYaz, mesajMetni: mesajMetni, waBaglanti: O.waBaglanti, baslat: baslat };
});
