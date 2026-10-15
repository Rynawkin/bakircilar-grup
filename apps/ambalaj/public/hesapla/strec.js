/* Palet streç — hesap + ekran (sahibin onayladığı model, 15.10.2026).
   Net film (g) = brüt − karton göbek − (varsa) başka ambalaj
   Yaklaşık uzunluk (m) = net g ÷ (yoğunluk × mikron × 0,0001 × en cm) ÷ 100     [eşdeğeri: 100 × net g ÷ (yoğunluk × mikron × en)]
   Net kg fiyatı = rulo fiyatı ÷ (net g ÷ 1000) · metre fiyatı = rulo fiyatı ÷ uzunluk
   Palet: çevre = 2(en + boy) · ilerleme = etkili en × (1 − bindirme) · spiral tur = (yükseklik − etkili en) ÷ ilerleme (kesirli, en az 0)
          toplam tur = alt + üst ek tur + (1 ya da 2) × spiral tur · sarılmış = tur × çevre ÷ 100
          rulodan = sarılmış ÷ (1 + ön germe) · fire dahil = rulodan × (1 + fire) · palet/rulo = uzunluk ÷ fire dahil · maliyet = fire dahil × metre fiyatı
          Toplam tur 1'den azsa palet sonucu verilmez (film paleti en az bir kez dolanmalı; sıfır turda bölme de tanımsız). */
(function (kok, fabrika) {
  var O = kok.HesapOrtak || (typeof require === "function" ? require("./ortak.js") : null);
  var api = fabrika(O);
  kok.StrecHesap = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis, function (O) {
  "use strict";

  var SINIR = {
    ruloFiyati: { max: 100000 }, brut: { max: 60000 }, gobek: { max: 60000, sifirOlur: true }, diger: { max: 60000, sifirOlur: true },
    enCm: { max: 300 }, mikron: { max: 500 }, yogunluk: { max: 3 },
    yukEn: { max: 1000 }, yukBoy: { max: 1000 }, yukseklik: { max: 1000 }, etkiliEn: { max: 300 },
    bindirme: { sifirOlur: true, max: 99.99, altindaOlmali: 100, altindaMesaj: "Bindirme %100 olamaz; film hiç yükselmez." },
    altTur: { sifirOlur: true, max: 50 }, ustTur: { sifirOlur: true, max: 50 }, onGerme: { max: 500 }, fire: { sifirOlur: true, max: 100 }
  };
  function alanDenetle(ad, metin, carpan) {   // carpan: kg girildiyse 1000 (ağırlık alanları)
    var s = SINIR[ad];
    if (carpan && carpan !== 1) s = { max: s.max / carpan, sifirOlur: s.sifirOlur };
    var r = O.alanDenetle(s, metin);
    if (r.hata && carpan === 1000) {   // kilogram seçiliyken gram yazılmış olabilir: okunan değeri söyle
      var ham = O.sayiOku(metin);
      if (ham.deger != null && ham.deger > s.max)
        r = { bos: false, deger: null, hata: O.sayiYazEsnek(ham.deger) + " kg okundu; bu çok büyük görünüyor. Gram yazdıysanız üstten Gram'ı seçin.", not: ham.not };
    }
    if (ad === "brut" && (!carpan || carpan === 1) && !r.bos && !r.hata && r.deger < 100)   // gram seçiliyken kilogram yazılmış olabilir
      r = { bos: false, deger: r.deger, hata: null, not: (r.not ? r.not + " " : "") + "Streç rulosu için çok hafif; kilogram yazdıysanız üstten Kilogram'ı seçin." };
    if (!r.bos && !r.hata && carpan) r = { bos: false, deger: r.deger * carpan, hata: null, not: r.not, girilen: r.deger };
    return r;
  }

  function ruloHesapla(r) {   // r: { brutG, gobekG, digerG, enCm, mikron, fiyat, yogunluk }
    var netG = r.brutG - r.gobekG - (r.digerG || 0);
    if (!(netG > 0)) return { hata: "Göbek (ve varsa başka ambalaj) brüt ağırlıktan küçük olmalı." };
    var uzunlukM = netG / (r.yogunluk * r.mikron * 0.0001 * r.enCm) / 100;
    return { brutG: r.brutG, gobekG: r.gobekG, digerG: r.digerG || 0, enCm: r.enCm, mikron: r.mikron, fiyat: r.fiyat, yogunluk: r.yogunluk,
             netG: netG, netKg: netG / 1000, uzunlukM: uzunlukM, netKgFiyati: r.fiyat / (netG / 1000), metreFiyati: r.fiyat / uzunlukM };
  }
  function paletHesapla(p, rulo) {   // p: { yukEn, yukBoy, yukseklik, etkiliEn|null, bindirme(%), altTur, ustTur, duzen, onGermeDurum, onGerme(%), fire(%)|null }
    var etkili = p.etkiliEn != null ? p.etkiliEn : rulo.enCm;
    if (etkili > rulo.enCm + 1e-9) return { hata: "Sarımda etkili en, film eninden (" + O.sayiYazEsnek(rulo.enCm) + " cm) büyük olamaz." };
    var cevre = 2 * (p.yukEn + p.yukBoy), ilerleme = etkili * (1 - p.bindirme / 100);
    var spiral = Math.max(0, (p.yukseklik - etkili) / ilerleme), gecis = p.duzen === "yukari_asagi" ? 2 : 1;
    var toplamTur = p.altTur + p.ustTur + gecis * spiral, sarilmisM = toplamTur * cevre / 100;
    if (toplamTur < 1 - 1e-9) return { hata: "Toplam tur 1'den az çıkıyor; film paleti en az bir kez dolanmalı.", oneri: "Altta ya da üstte ek tur yazın." };
    var onGerme = p.onGermeDurum === "var" ? p.onGerme / 100 : 0;
    var rulodanM = sarilmisM / (1 + onGerme), fireDahilM = rulodanM * (1 + (p.fire != null ? p.fire / 100 : 0));
    var paletRulo = rulo.uzunlukM / fireDahilM;
    return { etkiliEn: etkili, etkiliOlculmedi: p.etkiliEn == null, cevre: cevre, ilerleme: ilerleme, spiralTur: spiral, toplamTur: toplamTur,
             sarilmisM: sarilmisM, rulodanM: rulodanM, fireDahilM: fireDahilM, paletRulo: paletRulo,
             tamPalet: Math.floor(paletRulo + 1e-9), paletBasiMaliyet: fireDahilM * rulo.metreFiyati };
  }
  function karsilastir(a, b, pa, pb) {   // her ölçünün .basamak'ı: kazanan varsa iki değer ekranda da ayrı görünür
    var metre = O.karsilastir(a.metreFiyati, b.metreFiyati, O.birimBasamak([a.metreFiyati, b.metreFiyati]));
    return { metre: metre, kg: O.karsilastir(a.netKgFiyati, b.netKgFiyati, 2),
             palet: pa && pb && !pa.hata && !pb.hata ? O.karsilastir(pa.paletBasiMaliyet, pb.paletBasiMaliyet, 2) : null,
             metreBasamak: metre.basamak };
  }
  function toleransCumlesi(k) {   // hangi ölçülerde fark %2'nin altında: "Metre ve palet başına fark …"
    if (!k) return null;
    var adlar = [];
    if (k.metre.toleransNotu) adlar.push("metre");
    if (k.kg.toleransNotu) adlar.push("net kg");
    if (k.palet && k.palet.toleransNotu) adlar.push("palet");
    if (!adlar.length) return null;
    var liste = adlar.length === 1 ? adlar[0] : adlar.slice(0, -1).join(", ") + " ve " + adlar[adlar.length - 1];
    return liste.charAt(0).toUpperCase() + liste.slice(1) + " başına fark %" + O.TOLERANS_YUZDE +
           "'nin altında; etiketteki ağırlık toleransı ve filmlerin gerçek yoğunluğu bu farkı değiştirebilir.";
  }
  function basamaklar(k, a) {   // ekran ve mesaj aynı ondalığı kullanır
    return k ? { metre: k.metre.basamak, kg: k.kg.basamak, palet: k.palet ? k.palet.basamak : 2 } : { metre: O.birimBasamak([a.metreFiyati]), kg: 2, palet: 2 };
  }
  function paletNotlari(p) {
    var n = ["Palet sonucu teoriktir; taşıma emniyeti, yük tutma dayanımı ya da gerçek saha tüketimi garantisi değildir."];
    if (p.onGermeDurum === "bilinmiyor") n.push("Ön germe bilinmiyor: hesap ön germesiz yapıldı. Ön germe varsa rulodan çekilen film bundan az olur.");
    if (p.onGermeDurum !== "var") n.push("Elle sarımda da film biraz uzar; ön germesiz sonuç tüketimi olduğundan fazla gösterebilir.");
    if (p.fire == null) n.push("Fire girilmedi: sonuç fire hariçtir.");
    if (p.etkiliEn == null) n.push("Sarımda etkili en ölçülmedi; film eni kullanıldı. Ön germe filmin enini daraltabilir.");
    return n;
  }
  function mesajMetni(s) {
    var bs = basamaklar(s.k, s.a);
    var satir = ["Merhaba, Bakırcılar palet streç hesap sayfasında hesap yaptım:"];
    function ruloSatiri(ad, r) {
      return "Rulo " + ad + ": brüt " + O.sayiYazEsnek(r.brutG) + " g − göbek " + O.sayiYazEsnek(r.gobekG) + " g" + (r.digerG ? " − ambalaj " + O.sayiYazEsnek(r.digerG) + " g" : "") +
             " = net " + O.sayiYazEsnek(r.netG) + " g; en " + O.sayiYazEsnek(r.enCm) + " cm, " + O.sayiYazEsnek(r.mikron) + " mikron → yaklaşık " + O.sayiYaz(r.uzunlukM, 2) +
             " m; rulo " + O.tlYaz(r.fiyat) + " TL → net kg " + O.sayiYaz(r.netKgFiyati, bs.kg) + " TL, metre " + O.sayiYaz(r.metreFiyati, bs.metre) + " TL";
    }
    satir.push(ruloSatiri("A", s.a));
    if (s.b) satir.push(ruloSatiri("B", s.b));
    satir.push("Yoğunluk varsayımı: " + O.sayiYazEsnek(s.a.yogunluk) + " g/cm³ (yaklaşık değer).");
    if (s.k) {
      satir.push(O.kararCumlesi(s.k.metre, "Metre başına maliyet"));
      satir.push(O.kararCumlesi(s.k.kg, "Net kg başına maliyet"));
    }
    var paletVar = (s.pa && !s.pa.hata) || (s.pb && !s.pb.hata);   // iki rulodan biri hesaplanabiliyorsa palet bölümü yazılır
    if (s.p && !paletVar && s.pa) {   // hiçbiri hesaplanamadıysa her rulonun nedeni ayrı satırda
      satir.push("Palet hesabı yapılamadı:");
      [["A", s.pa], ["B", s.pb]].forEach(function (x) { if (x[1] && x[1].hata) satir.push("- Rulo " + x[0] + ": " + x[1].hata); });
    }
    if (s.p && paletVar) {
      var p = s.p;
      satir.push("Palet: yük " + O.sayiYazEsnek(p.yukEn) + " × " + O.sayiYazEsnek(p.yukBoy) + " cm, yükseklik " + O.sayiYazEsnek(p.yukseklik) + " cm; etkili en " +
                 (p.etkiliEn != null ? O.sayiYazEsnek(p.etkiliEn) + " cm" : "ölçülmedi (film eni)") + "; bindirme %" + O.sayiYazEsnek(p.bindirme) + "; alt " +
                 O.sayiYazEsnek(p.altTur) + " + üst " + O.sayiYazEsnek(p.ustTur) + " ek tur; " + (p.duzen === "yukari_asagi" ? "yukarı-aşağı" : "tek yukarı") + "; ön germe " +
                 (p.onGermeDurum === "var" ? "%" + O.sayiYazEsnek(p.onGerme) : p.onGermeDurum === "yok" ? "yok" : "bilinmiyor (yok sayıldı)") + "; fire " +
                 (p.fire != null ? "%" + O.sayiYazEsnek(p.fire) : "girilmedi (fire hariç)"));
      [["A", s.pa], ["B", s.pb]].forEach(function (x) {
        if (!x[1]) return;
        if (x[1].hata) { satir.push("- Rulo " + x[0] + ": " + x[1].hata); return; }
        satir.push("- Rulo " + x[0] + ": palet başına rulodan " + O.sayiYaz(x[1].fireDahilM, 2) + " m → " + O.asagiYaz(x[1].paletRulo, 1) + " palet (tam " + x[1].tamPalet +
                   "); palet başı film " + O.sayiYaz(x[1].paletBasiMaliyet, bs.palet) + " TL");
      });
      if (s.k && s.k.palet) satir.push(O.kararCumlesi(s.k.palet, "Palet başına film maliyeti"));
      satir.push("Uzunluk ve palet sayısı teoriktir; taşıma emniyeti ya da gerçek tüketim garantisi değildir.");
    }
    var t = toleransCumlesi(s.k); if (t) satir.push(t);
    satir.push("Fiyatlar benim girdiğim değerlerdir (" + (s.kdv === "haric" ? "KDV hariç" : "KDV dahil") + (s.b ? ", iki ruloda aynı kabul edildi" : "") + ")" +
               (s.ornek ? "; sayfadaki örnek değerlerle denendi." : "."));
    return satir.join("\n");
  }

  /* ---------- Ekran ---------- */
  var ORNEK = { A: { ruloFiyati: "450", brut: "2400", gobek: "400", enCm: "50", mikron: "20" },
                B: { ruloFiyati: "450", brut: "2400", gobek: "800", enCm: "50", mikron: "17" },
                palet: { yukEn: "80", yukBoy: "120", yukseklik: "150", bindirme: "50", altTur: "2", ustTur: "2", fire: "5" },
                duzen: "yukari", onGerme: "yok" };

  function baslat(kokEl) {
    var NB = O.NB;
    function a(id, etiket, birim, mod, yer, ipucu, deger) { return O.alanHTML({ id: id, etiket: etiket, birim: birim, mod: mod, yer: yer, ipucu: ipucu, deger: deger }); }
    function kart(u) {
      return '<section class="hk-kart" data-u="' + u + '" aria-labelledby="hk-baslik' + u + '"><h2 id="hk-baslik' + u + '"><span class="hk-harf" aria-hidden="true">' + u + "</span>Rulo " + u +
        (u === "B" ? ' <span class="hk-silik">(karşılaştırma için)</span>' : "") + "</h2>" +
        a("ruloFiyati" + u, "Rulo fiyatı", "TL", "decimal", "ör. 450", "") +
        '<div class="hk-iki">' + a("brut" + u, "Brüt ağırlık", '<span class="hk-agirlik-birim">g</span>', "decimal", "ör. 2400", "Etikette yazan") +
        a("gobek" + u, "Boş karton göbek", '<span class="hk-agirlik-birim">g</span>', "decimal", "tartarak", "Boş göbeği tartın") + "</div>" +
        '<div class="hk-iki">' + a("enCm" + u, "Film eni", "cm", "decimal", "ör. 50", "") + a("mikron" + u, "Kalınlık", "mikron", "decimal", "ör. 17", "1 mikron = 0,001 mm") + "</div>" +
        '<details><summary>Başka ambalaj (isteğe bağlı)</summary><p class="hk-ipucu-genel">Brüt ağırlığa rulonun poşeti, etiketi ya da tıpası da dahilse ağırlığını yazın; net filmden düşülür. Boş bırakılırsa düşülmez.</p>' +
        a("diger" + u, "Başka ambalaj", '<span class="hk-agirlik-birim">g</span>', "decimal", "ör. 20", "") + "</details></section>";
    }
    var palet = '<section class="hk-kart hk-palet"><details class="hk-palet-ac"><summary>Palet başına hesap (isteğe bağlı)</summary>' +
      '<p class="hk-ipucu-genel">Bir rulonun kaç palet sardığını ve palet başına film maliyetini teorik olarak hesaplar. Bütün alanlar sizin sarım düzeninize göre girilir.</p>' +
      '<div class="hk-iki">' + a("yukEn", "Yükün eni", "cm", "decimal", "ör. 80", "Yük taşıyorsa dış ölçü") + a("yukBoy", "Yükün boyu", "cm", "decimal", "ör. 120", "") + "</div>" +
      '<div class="hk-iki">' + a("yukseklik", "Sarılacak yükseklik", "cm", "decimal", "ör. 150", "") + a("etkiliEn", "Sarımda etkili en", "cm", "decimal", "", "Boşsa film eni kullanılır") + "</div>" +
      '<div class="hk-iki">' + a("bindirme", "Bindirme", "%", "decimal", "ör. 50", "Bir tur öncekini ne kadar örter") + a("fire", "Fire", "%", "decimal", "isteğe bağlı", "Uç, kesim, rulo sonu") + "</div>" +
      '<div class="hk-iki">' + a("altTur", "Altta ek tur", "tur", "decimal", "ör. 2", "Yoksa 0 yazın") + a("ustTur", "Üstte ek tur", "tur", "decimal", "ör. 2", "Yoksa 0 yazın") + "</div>" +
      O.secimHTML("duzen", [{ deger: "yukari", etiket: "Tek yukarı" }, { deger: "yukari_asagi", etiket: "Yukarı-aşağı" }], "Sarım düzeni") +
      O.secimHTML("onGermeDurum", [{ deger: "yok", etiket: "Ön germe yok" }, { deger: "var", etiket: "Var, oranı biliyorum" }, { deger: "bilinmiyor", etiket: "Bilmiyorum" }], "Makinede ön germe") +
      '<div class="hk-ongerme-alan" hidden>' + a("onGerme", "Ön germe oranı", "%", "decimal", "ör. 150", "Makinenin ayarı") + "</div>" +
      '<details class="hk-formul"><summary>Nasıl hesaplanıyor?</summary><ul class="hk-ipucu-genel">' +
      "<li>Çevre = 2 × (en + boy)</li><li>Tur başına yükselme = etkili en × (1 − bindirme)</li><li>Spiral tur = (yükseklik − etkili en) ÷ tur başına yükselme</li>" +
      "<li>Toplam tur = alt + üst ek tur + spiral tur (yukarı-aşağıda spiral iki kez)</li><li>Paletteki film = toplam tur × çevre</li>" +
      "<li>Rulodan çekilen = paletteki film ÷ (1 + ön germe); fire bir kez eklenir</li><li>Bir rulo kaç palet = rulo uzunluğu ÷ palet başına film (tam palet aşağı yuvarlanır)</li></ul></details>" +
      "</details></section>";
    kokEl.innerHTML = O.girisHTML({ ustEtiket: "Metre Metin'in hesap makinesi", baslik: "Palet streç: net film ve metre",
        aciklama: "Rulonun brüt ağırlığına değil, içindeki filme bakın. Boş karton göbeği tartın; net film, yaklaşık uzunluk ve metre fiyatı çıksın. İsterseniz palet başına maliyeti de görün." }) +
      O.kdvHTML() +
      '<section class="hk-kart"><h2>Ortak bilgiler</h2>' +
      O.secimHTML("agirlikBirim", [{ deger: "g", etiket: "Gram", secili: true }, { deger: "kg", etiket: "Kilogram" }], "Ağırlıkları şöyle yazıyorum") +
      a("yogunluk", "Film yoğunluğu", "g/cm³", "decimal", "0,92", "Görünür varsayım: LLDPE için yaklaşık 0,92. Üreticinin belgesindeki değeri yazabilirsiniz.", "0,92") + "</section>" +
      kart("A") + kart("B") + palet +
      '<section class="hk-sonuc" aria-labelledby="hk-sonuc-baslik"></section><p class="hk-gizli hk-ozet" aria-live="polite"></p>' + O.paylasHTML() +
      '<footer class="hk-alt"><p>Uzunluk, yoğunluk varsayımıyla hesaplanan yaklaşık değerdir; filmin gerçek yoğunluğu üretici belgesine göre değişebilir. Sayfadaki örnek değerler hayalidir.</p>' +
      "<p>Metre ve kilo fiyatı maliyeti karşılaştırır; filmin kalitesini, dayanımını ya da yük tutma gücünü ölçmez.</p></footer>";
    kokEl.querySelector("#yogunluk").dataset.varsayilan = "0,92";

    var ozetYaz = O.ozetYazici(kokEl), wa = kokEl.querySelector(".hk-wa"), sonucEl = kokEl.querySelector(".hk-sonuc");
    var ongermeAlan = kokEl.querySelector(".hk-ongerme-alan");
    var ornekYuklu = false;   // "Örnek değerlerle dene" basıldı; Temizle ile biter
    function d(id) { return O.deger(kokEl, id); }
    function ornekMi() {   // rulo fiyatlarından biri hâlâ hayali örnek fiyatsa sonuç örnek sayılır (palet alanları değişse de)
      return ornekYuklu && ["A", "B"].some(function (u) { return d("ruloFiyati" + u).trim() === ORNEK[u].ruloFiyati; });
    }
    function ruloOku(u, carpan, yogunluk) {
      var f = {}, tamam = true, bosSay = 0, gobekBos = false;
      [["ruloFiyati", 0], ["brut", carpan], ["gobek", carpan], ["enCm", 0], ["mikron", 0]].forEach(function (x) {
        var r = alanDenetle(x[0], d(x[0] + u), x[1] || null); O.alanYaz(kokEl, x[0] + u, r);
        if (r.bos) { bosSay++; if (x[0] === "gobek") gobekBos = true; }
        if (r.bos || r.hata) tamam = false; else f[x[0]] = r.deger;
      });
      var dg = alanDenetle("diger", d("diger" + u), carpan); O.alanYaz(kokEl, "diger" + u, dg);
      if (dg.hata) tamam = false;
      if (!tamam || yogunluk == null) return { tamam: false, hepsiBos: bosSay === 5, gobekBos: gobekBos && bosSay < 5 };
      var r = ruloHesapla({ brutG: f.brut, gobekG: f.gobek, digerG: dg.bos ? 0 : dg.deger, enCm: f.enCm, mikron: f.mikron, fiyat: f.ruloFiyati, yogunluk: yogunluk });
      if (r.hata) { O.alanYaz(kokEl, "gobek" + u, { hata: r.hata }); return { tamam: false, netHata: r.hata }; }
      return { tamam: true, rulo: r };
    }
    function paletOku() {
      var p = {}, eksik = [], hata = false;
      [["yukEn", "yükün eni"], ["yukBoy", "yükün boyu"], ["yukseklik", "yükseklik"], ["bindirme", "bindirme"], ["altTur", "alt ek tur"], ["ustTur", "üst ek tur"]].forEach(function (x) {
        var r = alanDenetle(x[0], d(x[0])); O.alanYaz(kokEl, x[0], r);
        if (r.bos) eksik.push(x[1]); else if (r.hata) hata = true; else p[x[0]] = r.deger;
      });
      var et = alanDenetle("etkiliEn", d("etkiliEn")); O.alanYaz(kokEl, "etkiliEn", et); if (et.hata) hata = true; p.etkiliEn = et.bos || et.hata ? null : et.deger;
      var fr = alanDenetle("fire", d("fire")); O.alanYaz(kokEl, "fire", fr); if (fr.hata) hata = true; p.fire = fr.bos || fr.hata ? null : fr.deger;
      p.duzen = O.secili(kokEl, "duzen"); if (!p.duzen) eksik.push("sarım düzeni");
      p.onGermeDurum = O.secili(kokEl, "onGermeDurum"); if (!p.onGermeDurum) eksik.push("ön germe seçimi");
      ongermeAlan.hidden = p.onGermeDurum !== "var";
      if (p.onGermeDurum === "var") { var og = alanDenetle("onGerme", d("onGerme")); O.alanYaz(kokEl, "onGerme", og); if (og.bos) eksik.push("ön germe oranı"); else if (og.hata) hata = true; else p.onGerme = og.deger; }
      var hicbiri = !p.duzen && !p.onGermeDurum &&   // palet bölümüne hiç dokunulmadı (ön germe "var" seçimi de dokunmaktır)
                    ["yukEn", "yukBoy", "yukseklik", "bindirme", "altTur", "ustTur", "etkiliEn", "fire", "onGerme"].every(function (x) { return d(x).trim() === ""; });
      return { p: p, eksik: eksik, hata: hata, hicbiri: hicbiri, tamam: !eksik.length && !hata };
    }
    function tl(x, b) { return O.sayiYaz(x, b == null ? 2 : b) + NB + "TL"; }
    function m(x, b) { return O.sayiYaz(x, b == null ? 2 : b) + NB + "m"; }

    function hesapla() {
      var birim = O.secili(kokEl, "agirlikBirim") || "g", carpan = birim === "kg" ? 1000 : 1;
      kokEl.querySelectorAll(".hk-agirlik-birim").forEach(function (s) { s.textContent = birim; });
      var yr = alanDenetle("yogunluk", d("yogunluk")); O.alanYaz(kokEl, "yogunluk", yr);
      var yog = yr.bos || yr.hata ? null : yr.deger;
      var A = ruloOku("A", carpan, yog), B = ruloOku("B", carpan, yog), P = paletOku();
      var kdv = O.secili(kokEl, "kdv") || "dahil", ornek = ornekMi();
      kokEl.classList.toggle("hk-ornek", ornek);
      if (!A.tamam) {
        var neden = yog == null ? "Film yoğunluğunu yazın (varsayılan 0,92)." : A.netHata ? "Rulo A: " + A.netHata :
                    A.gobekBos ? "Rulo A için boş karton göbeği tartın; göbek bilinmeden net film ve uzunluk hesaplanmaz." :
                    "Sonucu görmek için Rulo A'nın beş alanını doldurun: rulo fiyatı, brüt ağırlık, boş karton göbek, film eni ve kalınlık.";
        sonucEl.innerHTML = '<h2 id="hk-sonuc-baslik">Sonuç</h2><p class="hk-bos">' + neden + "</p>";
        O.waAyarla(wa, null); kokEl.querySelector(".hk-mesaj").textContent = "—"; ozetYaz(neden); return;
      }
      var a = A.rulo, b = B.tamam ? B.rulo : null;
      var pa = P.tamam ? paletHesapla(P.p, a) : null, pb = P.tamam && b ? paletHesapla(P.p, b) : null;
      var k = b ? karsilastir(a, b, pa, pb) : null, bs = basamaklar(k, a);
      function hucre(x, vurgu) { return '<td class="hk-sayi' + (vurgu ? " hk-dusuk" : "") + '">' + x + "</td>"; }
      function satirBasi(x) { return '<th scope="row">' + x + "</th>"; }
      var dm = k && !k.metre.esit ? k.metre.dusuk : null, dk = k && !k.kg.esit ? k.kg.dusuk : null;
      var h = '<h2 id="hk-sonuc-baslik">Sonuç</h2><span class="hk-ornek-rozet">Örnek değerlerle hesaplandı</span>' +
        '<table class="hk-tablo"><thead><tr><th scope="col"><span class="hk-gizli">Ölçü</span></th><th scope="col">Rulo A</th>' + (b ? '<th scope="col">Rulo B</th>' : "") + "</tr></thead><tbody>" +
        "<tr>" + satirBasi("Net film") + hucre(O.sayiYazEsnek(a.netKg, 3) + NB + "kg") + (b ? hucre(O.sayiYazEsnek(b.netKg, 3) + NB + "kg") : "") + "</tr>" +
        "<tr>" + satirBasi("Yaklaşık uzunluk") + hucre(m(a.uzunlukM)) + (b ? hucre(m(b.uzunlukM)) : "") + "</tr>" +
        '<tr class="hk-vurgu">' + satirBasi("Metre fiyatı") + hucre(tl(a.metreFiyati, bs.metre), dm === "A") + (b ? hucre(tl(b.metreFiyati, bs.metre), dm === "B") : "") + "</tr>" +
        "<tr>" + satirBasi("Net kg fiyatı") + hucre(tl(a.netKgFiyati, bs.kg), dk === "A") + (b ? hucre(tl(b.netKgFiyati, bs.kg), dk === "B") : "") + "</tr></tbody></table>";
      var tn = toleransCumlesi(k);
      if (k) {
        var k1 = O.kararCumlesi(k.metre, "Metre başına maliyet"), k2 = O.kararCumlesi(k.kg, "Net kg başına maliyet");
        h += '<div class="hk-karar"><b>' + k1 + "</b><span>" + k2 + "</span>" + (tn ? "<span>" + tn + "</span>" : "") + "</div>"; ozetYaz(k1);
      } else if (B.hepsiBos) { h += '<div class="hk-karar"><span>Karşılaştırmak için Rulo B\'yi de yazın.</span></div>'; ozetYaz("Rulo A'nın metre fiyatı " + tl(a.metreFiyati, bs.metre) + "."); }
      else {
        var bNeden = B.netHata ? "Rulo B: " + B.netHata : B.gobekBos ? "Rulo B için boş karton göbeği tartın; göbek bilinmeden karşılaştırma yapılmaz." : "Rulo B'de eksik ya da hatalı alan var; karşılaştırma yapılmadı.";
        h += '<div class="hk-karar"><span>' + bNeden + "</span></div>"; ozetYaz(bNeden);
      }
      if (P.tamam && pa) {
        h += '<div class="hk-hedef"><h3>Palet başına (teorik)</h3>';
        [["A", pa], ["B", pb]].forEach(function (x) {
          if (!x[1]) return;
          if (x[1].hata) { h += '<div class="hk-satir"><b>Rulo ' + x[0] + ":</b> " + x[1].hata + (x[1].oneri ? " " + x[1].oneri : "") + "</div>"; return; }
          h += '<div class="hk-satir"><b>Rulo ' + x[0] + ":</b> " + O.sayiYazEsnek(x[1].toplamTur, 2) + " tur · paletteki film " + m(x[1].sarilmisM, 1) +
               " · rulodan " + m(x[1].fireDahilM) + (P.p.fire != null ? " (fire dahil)" : " (fire hariç)") +
               "<br>Bir rulo <b>" + O.asagiYaz(x[1].paletRulo, 1) + " palet</b> (tam " + x[1].tamPalet + ") · palet başı film <b>" + tl(x[1].paletBasiMaliyet, bs.palet) + "</b></div>";
        });
        if (k && k.palet) h += '<div class="hk-karar"><b>' + O.kararCumlesi(k.palet, "Palet başına film maliyeti") + "</b></div>";
        h += "</div>";
      } else if (!P.hicbiri) {
        h += '<div class="hk-hedef"><h3>Palet başına</h3><div class="hk-satir">' + (P.hata ? "Palet alanlarından birinde hata var." : "Palet hesabı için eksik: " + P.eksik.join(", ") + ".") + "</div></div>";
      }
      var n = ["Uzunluk yaklaşıktır: " + O.sayiYazEsnek(a.yogunluk) + " g/cm³ yoğunluk varsayımıyla hesaplandı."];
      if (P.tamam && ((pa && !pa.hata) || (pb && !pb.hata))) n = n.concat(paletNotlari(P.p));   // palet sonucu varsa
      n.push("Bu hesap yalnız maliyeti gösterir; filmin kalitesini ya da dayanımını ölçmez.");
      h += '<ul class="hk-notlar">' + n.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
      sonucEl.innerHTML = h;
      var metin = mesajMetni({ a: a, b: b, k: k, p: P.tamam ? P.p : null, pa: pa, pb: pb, kdv: kdv, ornek: ornek });
      kokEl.querySelector(".hk-mesaj").textContent = metin; O.waAyarla(wa, metin);
    }
    function ornekDoldur() {
      ["A", "B"].forEach(function (u) { Object.keys(ORNEK[u]).forEach(function (x) { kokEl.querySelector("#" + x + u).value = ORNEK[u][x]; }); kokEl.querySelector("#diger" + u).value = ""; });
      Object.keys(ORNEK.palet).forEach(function (x) { kokEl.querySelector("#" + x).value = ORNEK.palet[x]; });
      kokEl.querySelector("#etkiliEn").value = ""; kokEl.querySelector("#yogunluk").value = "0,92"; kokEl.querySelector("#onGerme").value = "";
      kokEl.querySelector('input[name="agirlikBirim"][value="g"]').checked = true;
      kokEl.querySelector('input[name="duzen"][value="' + ORNEK.duzen + '"]').checked = true;
      kokEl.querySelector('input[name="onGermeDurum"][value="' + ORNEK.onGerme + '"]').checked = true;
      kokEl.querySelector(".hk-palet-ac").open = true;
      ornekYuklu = true;
    }
    O.olaylariBagla(kokEl, hesapla, ornekDoldur);
    kokEl.querySelector(".hk-temizle").addEventListener("click", function () { ornekYuklu = false; });
    hesapla();
    return { hesapla: hesapla, ornekDoldur: ornekDoldur };
  }

  return { SINIR: SINIR, ORNEK: ORNEK, alanDenetle: alanDenetle, ruloHesapla: ruloHesapla, paletHesapla: paletHesapla, karsilastir: karsilastir,
           toleransCumlesi: toleransCumlesi, basamaklar: basamaklar, paletNotlari: paletNotlari, mesajMetni: mesajMetni, baslat: baslat };
});
