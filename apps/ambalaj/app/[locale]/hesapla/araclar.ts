export const SITE_URL = "https://www.bakircilarambalaj.com";

export const ARACLAR = {
  havlu: {
    dosya: "havlu.js",
    nesne: "HavluHesap",
    baslik: "Havlu: metre fiyatı",
    ozet: "Koli fiyatına değil, metre fiyatına bakın. İki teklifi ve ihtiyacınızı karşılaştırın.",
  },
  "z-havlu": {
    dosya: "zhavlu.js",
    nesne: "ZHavluHesap",
    baslik: "Z havlu ve peçete",
    ozet: "Paket, yaprak sayısı ve yaprak ölçüsüyle yaprak başına ve metrekare başına maliyet.",
  },
  strec: {
    dosya: "strec.js",
    nesne: "StrecHesap",
    baslik: "Palet streç",
    ozet: "Brüt ağırlıktan karton göbeği düşün; net film, yaklaşık uzunluk, metre fiyatı ve palet başına maliyet.",
  },
} as const;

export type AracAdi = keyof typeof ARACLAR;
export const aracMi = (ad: string): ad is AracAdi => Object.prototype.hasOwnProperty.call(ARACLAR, ad);
