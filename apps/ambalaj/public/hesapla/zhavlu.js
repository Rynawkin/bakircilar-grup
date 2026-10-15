/* Z havlu / dispenser peçete — hesap + ekran.
   Toplam yaprak = paket × pakette yaprak · alan (m²) = toplam yaprak × en(cm) × boy(cm) ÷ 10.000 (tek yüz; katlar çarpılmaz)
   Yaprak fiyatı = koli fiyatı ÷ toplam yaprak · m² fiyatı = koli fiyatı ÷ alan */
(function (kok, fabrika) {
  var O = kok.HesapOrtak || (typeof require === "function" ? require("./ortak.js") : null);
  var api = fabrika(O);
  kok.ZHavluHesap = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis, function (O) {
  "use strict";

  var SINIR = {
    koliFiyati: { max: 1000000 }, paketSayisi: { max: 500, tamSayi: true }, paketYaprak: { max: 10000, tamSayi: true },
    enCm: { max: 100 }, boyCm: { max: 100 }, kat: { max: 6, tamSayi: true }
  };
  function alanDenetle(ad, metin) { return O.alanDenetle(SINIR[ad], metin); }

  function urunHesapla(koliFiyati, paketSayisi, paketYaprak, enCm, boyCm) {
    var toplamYaprak = paketSayisi * paketYaprak;
    var alanM2 = toplamYaprak * enCm * boyCm / 10000;
    var yaprakFiyati = koliFiyati / toplamYaprak;
    return { koliFiyati: koliFiyati, paketSayisi: paketSayisi, paketYaprak: paketYaprak, enCm: enCm, boyCm: boyCm,
             toplamYaprak: toplamYaprak, yaprakCm2: enCm * boyCm, alanM2: alanM2,
             yaprakFiyati: yaprakFiyati, yuzYaprakFiyati: yaprakFiyati * 100, m2Fiyati: koliFiyati / alanM2 };
  }
  function karsilastir(a, b) {   // her ölçünün .basamak'ı: kazanan varsa iki değer ekranda da ayrı görünür
    var yaprak = O.karsilastir(a.yaprakFiyati, b.yaprakFiyati, O.birimBasamak([a.yaprakFiyati, b.yaprakFiyati]));
    var m2 = O.karsilastir(a.m2Fiyati, b.m2Fiyati, 2);
    var yuzBasamak = yaprak.esit ? 2 : O.ayirtBasamak(a.yuzYaprakFiyati, b.yuzYaprakFiyati, 2);
    var celiski = !yaprak.esit && !m2.esit && yaprak.dusuk !== m2.dusuk;
    return { yaprak: yaprak, m2: m2, celiski: celiski, yaprakBasamak: yaprak.basamak, yuzBasamak: yuzBasamak, m2Basamak: m2.basamak };
  }
  function toleransCumlesi(k) {   // hangi ölçüde fark %2'nin altında
    var y = k.yaprak.toleransNotu, m = k.m2.toleransNotu;
    if (!y && !m) return null;
    return (y && m ? "İki ölçüde de" : y ? "Yaprak başına" : "Metrekare başına") + " fark %" + O.TOLERANS_YUZDE +
           "'nin altında; etiketteki ölçü ve adet toleransı bu farkı değiştirebilir.";
  }
  function notlar(g) {
    if (g.karsilastirma === false) return ["Alan, yaprağın tek yüzünün en × boy alanıdır; katlar çarpılmaz.",
                                           "Emicilik ya da bir kullanımda kaç yaprak çekileceği bu hesaptan çıkmaz."];
    var n = ["Alan, yaprağın tek yüzünün en × boy alanıdır; katlar çarpılmaz.",
             "Emicilik ya da bir kullanımda kaç yaprak çekileceği bu hesaptan çıkmaz."];
    if (g.katA != null && g.katB != null) { if (g.katA !== g.katB) n.unshift("Kat sayıları farklı (A: " + g.katA + " kat, B: " + g.katB + " kat). Alan hesabı katları çarpmaz; kat farkı bu hesaba girmez."); }
    else if (g.katA != null || g.katB != null) n.unshift("Kat bilgisi yalnız bir üründe girildi; karşılaştırmak için ikisinde de etiketten yazın.");
    return n;
  }
  function mesajMetni(s) {   // s.basamak: { yaprak, yuz, m2 } — ekrandaki tabloyla aynı ondalıklar
    var bs = s.basamak, satir = ["Merhaba, Bakırcılar Z havlu / peçete hesap sayfasında hesap yaptım:"];
    function urunSatiri(ad, u, kat) {
      return ad + ": koli " + O.tlYaz(u.koliFiyati) + " TL, " + u.paketSayisi + " paket × " + u.paketYaprak + " yaprak = " + O.sayiYazEsnek(u.toplamYaprak) +
             " yaprak; yaprak " + O.sayiYazEsnek(u.enCm, 2) + " × " + O.sayiYazEsnek(u.boyCm, 2) + " cm" + (kat != null ? ", " + kat + " kat" : "") +
             " → kâğıt alanı " + O.sayiYaz(u.alanM2, 2) + " m²; yaprak " + O.sayiYaz(u.yaprakFiyati, bs.yaprak) + " TL (100 yaprak: " +
             O.sayiYaz(u.yuzYaprakFiyati, bs.yuz) + " TL), m² " + O.sayiYaz(u.m2Fiyati, bs.m2) + " TL";
    }
    satir.push(urunSatiri("A", s.a, s.katA));
    if (s.b) satir.push(urunSatiri("B", s.b, s.katB));
    if (s.k) {
      satir.push(O.kararCumlesi(s.k.yaprak, "Yaprak başına maliyet"));
      satir.push(O.kararCumlesi(s.k.m2, "Metrekare başına maliyet"));
      if (s.k.celiski) satir.push("İki ölçü farklı sonuç veriyor; yaprak ölçüleri farklı olduğu için ikisini birlikte değerlendiriyorum.");
      var t = toleransCumlesi(s.k); if (t) satir.push(t);
    }
    satir.push("Fiyatlar benim girdiğim değerlerdir (" + (s.kdv === "haric" ? "KDV hariç" : "KDV dahil") + (s.b ? ", iki üründe aynı kabul edildi" : "") + ")" +
               (s.ornek ? "; sayfadaki örnek değerlerle denendi." : "."));
    satir.push("Alan tek yüzdür, katlar çarpılmadı; hesap kaliteyi ya da emiciliği ölçmez.");
    return satir.join("\n");
  }

  /* ---------- Ekran ---------- */
  var ORNEK = { A: { koliFiyati: "300", paketSayisi: "24", paketYaprak: "125", enCm: "20", boyCm: "21" },
                B: { koliFiyati: "360", paketSayisi: "20", paketYaprak: "160", enCm: "24", boyCm: "23" } };

  function baslat(kokEl) {
    var NB = O.NB;
    function kart(u) {
      function a(id, etiket, birim, mod, yer, ipucu) { return O.alanHTML({ id: id + u, etiket: etiket, birim: birim, mod: mod, yer: yer, ipucu: ipucu }); }
      return '<section class="hk-kart" data-u="' + u + '" aria-labelledby="hk-baslik' + u + '"><h2 id="hk-baslik' + u + '"><span class="hk-harf" aria-hidden="true">' + u + "</span>" +
        u + " teklifi" + (u === "B" ? ' <span class="hk-silik">(karşılaştırma için)</span>' : "") + "</h2>" +
        a("koliFiyati", "Koli fiyatı", "TL", "decimal", "ör. 300", "") +
        '<div class="hk-iki">' + a("paketSayisi", "Kolide paket", "paket", "numeric", "ör. 24", "") + a("paketYaprak", "Pakette yaprak", "yaprak", "numeric", "ör. 125", "Paketin üstünde yazar") + "</div>" +
        '<div class="hk-iki">' + a("enCm", "Yaprak eni", "cm", "decimal", "ör. 20", "") + a("boyCm", "Yaprak boyu", "cm", "decimal", "ör. 21", "Açılmış yaprak") + "</div>" +
        '<details><summary>Kat bilgisi (isteğe bağlı)</summary><p class="hk-ipucu-genel">Sonucu değiştirmez; yalnız iki ürünün kat sayısı farklıysa not düşer. Alan hesabında katlar çarpılmaz.</p>' +
        a("kat", "Kat sayısı", "kat", "numeric", "ör. 2", "") + "</details></section>";
    }
    kokEl.innerHTML = O.girisHTML({ ustEtiket: "Metre Metin'in hesap makinesi", baslik: "Z havlu ve peçete: yaprak ve m² fiyatı",
        aciklama: "Koliye değil, içindeki kâğıda bakın. Paket sayısını, paketteki yaprağı ve yaprak ölçüsünü yazın; yaprak başına ve metrekare başına maliyeti görün." }) +
      O.kdvHTML() + kart("A") + kart("B") +
      '<section class="hk-sonuc" aria-labelledby="hk-sonuc-baslik"></section><p class="hk-gizli hk-ozet" aria-live="polite"></p>' + O.paylasHTML() +
      '<footer class="hk-alt"><p>Sonuçlar yalnız girdiğiniz değerlere göre hesaplanır. Yaprak ölçüsü ve sayısı etiketteki değerdir; etikette tolerans olabilir. Sayfadaki örnek değerler hayalidir.</p>' +
      "<p>Yaprak ve metrekare fiyatı maliyeti karşılaştırır; kâğıdın kalitesini, emiciliğini ya da işinize uygunluğunu ölçmez.</p></footer>";

    var ozetYaz = O.ozetYazici(kokEl), wa = kokEl.querySelector(".hk-wa"), sonucEl = kokEl.querySelector(".hk-sonuc");
    var ornekYuklu = false;   // "Örnek değerlerle dene" basıldı; Temizle ile biter
    function d(id) { return O.deger(kokEl, id); }
    function ornekMi() {   // fiyatlardan biri hâlâ hayali örnek fiyatsa sonuç örnek sayılır
      return ornekYuklu && ["A", "B"].some(function (u) { return d("koliFiyati" + u).trim() === ORNEK[u].koliFiyati; });
    }
    function urunOku(u) {
      var f = {}, tamam = true, bosSay = 0;
      ["koliFiyati", "paketSayisi", "paketYaprak", "enCm", "boyCm"].forEach(function (a) {
        var r = alanDenetle(a, d(a + u)); O.alanYaz(kokEl, a + u, r);
        if (r.bos) bosSay++;
        if (r.bos || r.hata) tamam = false; else f[a] = r.deger;
      });
      var kat = alanDenetle("kat", d("kat" + u)); O.alanYaz(kokEl, "kat" + u, kat);
      return { tamam: tamam, hepsiBos: bosSay === 5, kat: kat.hata || kat.bos ? null : kat.deger,
               urun: tamam ? urunHesapla(f.koliFiyati, f.paketSayisi, f.paketYaprak, f.enCm, f.boyCm) : null };
    }
    function tl(x, b) { return O.sayiYaz(x, b == null ? 2 : b) + NB + "TL"; }

    function hesapla() {
      var A = urunOku("A"), B = urunOku("B"), kdv = O.secili(kokEl, "kdv") || "dahil", ornek = ornekMi();
      kokEl.classList.toggle("hk-ornek", ornek);
      if (!A.tamam) {
        sonucEl.innerHTML = '<h2 id="hk-sonuc-baslik">Sonuç</h2><p class="hk-bos">Sonucu görmek için A teklifinin beş alanını doldurun: koli fiyatı, paket sayısı, paketteki yaprak, yaprak eni ve boyu.</p>';
        O.waAyarla(wa, null); kokEl.querySelector(".hk-mesaj").textContent = "—"; ozetYaz("Sonuç için A teklifinin beş alanını doldurun."); return;
      }
      var a = A.urun, b = B.tamam ? B.urun : null, k = b ? karsilastir(a, b) : null;
      var bs = k ? { yaprak: k.yaprakBasamak, yuz: k.yuzBasamak, m2: k.m2Basamak } : { yaprak: O.birimBasamak([a.yaprakFiyati]), yuz: 2, m2: 2 };
      function hucre(x, vurgu) { return '<td class="hk-sayi' + (vurgu ? " hk-dusuk" : "") + '">' + x + "</td>"; }
      function satirBasi(x) { return '<th scope="row">' + x + "</th>"; }
      var dy = k && !k.yaprak.esit ? k.yaprak.dusuk : null, dm = k && !k.m2.esit ? k.m2.dusuk : null;
      var h = '<h2 id="hk-sonuc-baslik">Sonuç</h2><span class="hk-ornek-rozet">Örnek değerlerle hesaplandı</span>' +
        '<table class="hk-tablo"><thead><tr><th scope="col"><span class="hk-gizli">Ölçü</span></th><th scope="col">A</th>' + (b ? '<th scope="col">B</th>' : "") + "</tr></thead><tbody>" +
        "<tr>" + satirBasi("Kolideki yaprak") + hucre(O.sayiYazEsnek(a.toplamYaprak)) + (b ? hucre(O.sayiYazEsnek(b.toplamYaprak)) : "") + "</tr>" +
        "<tr>" + satirBasi("Bir yaprağın alanı") + hucre(O.sayiYazEsnek(a.yaprakCm2, 1) + NB + "cm²") + (b ? hucre(O.sayiYazEsnek(b.yaprakCm2, 1) + NB + "cm²") : "") + "</tr>" +
        "<tr>" + satirBasi("Kolideki kâğıt alanı") + hucre(O.sayiYaz(a.alanM2, 2) + NB + "m²") + (b ? hucre(O.sayiYaz(b.alanM2, 2) + NB + "m²") : "") + "</tr>" +
        '<tr class="hk-vurgu">' + satirBasi("Yaprak fiyatı") + hucre(tl(a.yaprakFiyati, bs.yaprak), dy === "A") + (b ? hucre(tl(b.yaprakFiyati, bs.yaprak), dy === "B") : "") + "</tr>" +
        "<tr>" + satirBasi("100 yaprağın fiyatı") + hucre(tl(a.yuzYaprakFiyati, bs.yuz)) + (b ? hucre(tl(b.yuzYaprakFiyati, bs.yuz)) : "") + "</tr>" +
        '<tr class="hk-vurgu">' + satirBasi("Metrekare fiyatı") + hucre(tl(a.m2Fiyati, bs.m2), dm === "A") + (b ? hucre(tl(b.m2Fiyati, bs.m2), dm === "B") : "") + "</tr></tbody></table>";
      if (k) {
        var k1 = O.kararCumlesi(k.yaprak, "Yaprak başına maliyet"), k2 = O.kararCumlesi(k.m2, "Metrekare başına maliyet"), tn = toleransCumlesi(k);
        h += '<div class="hk-karar"><b>' + k1 + "</b><b>" + k2 + "</b>" +
             (k.celiski ? "<span>İki ölçü farklı sonuç veriyor: yaprak ölçüleri farklı olduğu için yaprak fiyatı tek başına yeterli değil; ikisini birlikte değerlendirin.</span>" : "") +
             (tn ? "<span>" + tn + "</span>" : "") + "</div>";
        ozetYaz(k1 + " " + k2);
      } else if (B.hepsiBos) { h += '<div class="hk-karar"><span>Karşılaştırmak için B teklifini de yazın.</span></div>'; ozetYaz("A teklifinin yaprak fiyatı " + tl(a.yaprakFiyati, bs.yaprak) + "."); }
      else { h += '<div class="hk-karar"><span>B teklifinde eksik ya da hatalı alan var; karşılaştırma yapılmadı.</span></div>'; ozetYaz("B teklifinde eksik ya da hatalı alan var."); }
      h += '<ul class="hk-notlar">' + notlar({ katA: A.kat, katB: B.kat, karsilastirma: !!b }).concat(["Bu hesap yalnız maliyeti gösterir; kaliteyi ya da uygunluğu ölçmez."])
             .map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
      sonucEl.innerHTML = h;
      var metin = mesajMetni({ a: a, b: b, k: k, basamak: bs, kdv: kdv, ornek: ornek, katA: A.kat, katB: b ? B.kat : null });
      kokEl.querySelector(".hk-mesaj").textContent = metin; O.waAyarla(wa, metin);
    }
    function ornekDoldur() {
      ["A", "B"].forEach(function (u) { Object.keys(ORNEK[u]).forEach(function (a) { kokEl.querySelector("#" + a + u).value = ORNEK[u][a]; }); });
      ornekYuklu = true;
    }
    O.olaylariBagla(kokEl, hesapla, ornekDoldur);
    kokEl.querySelector(".hk-temizle").addEventListener("click", function () { ornekYuklu = false; });
    hesapla();
    return { hesapla: hesapla, ornekDoldur: ornekDoldur };
  }

  return { SINIR: SINIR, ORNEK: ORNEK, alanDenetle: alanDenetle, urunHesapla: urunHesapla, karsilastir: karsilastir, notlar: notlar,
           toleransCumlesi: toleransCumlesi, mesajMetni: mesajMetni, baslat: baslat };
});
