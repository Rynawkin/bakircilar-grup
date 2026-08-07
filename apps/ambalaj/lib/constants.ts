export const CONTACT_INFO = {
  brandName: 'Bakırcılar Ambalaj',
  legalName: 'Necati Uçarer Bakırcılar Ambalaj',
  website: 'https://www.bakircilarambalaj.com',
  email: 'info@bakircilarambalaj.com',
  phone: '+90 (264) 614 67 77',
  phoneE164: '+902646146777',
  whatsapp: '905301783570',
  streetAddress: 'Rasimpaşa Mah. Atatürk Blv. Bakırlar No: 69 A',
  // Merkez adres (footer ve genel kullanım için tek satır)
  address: 'Rasimpaşa Mah. Atatürk Blv. Bakırlar No: 69 A, 54300 Hendek / Sakarya'
};

// Lokasyonlar — iletişim sayfasında adres + gömülü harita olarak listelenir.
// mapsQuery: Google Haritalar'da en isabetli pinlemeyi veren sade adres sorgusu.
export const LOCATIONS = [
  {
    name: 'Merkez',
    address: CONTACT_INFO.address,
    mapsQuery: 'Rasimpaşa Mahallesi Atatürk Bulvarı Bakırlar No 69 A Hendek Sakarya'
  },
  {
    name: 'Topça Şube',
    address: 'Topça Toptancılar Çarşısı A Blok No:20, Erenler / Sakarya',
    mapsQuery: 'Topça Toptancılar Çarşısı, Erenler/Sakarya'
  }
];

// Bakırcılar kampanya / B2B satış sitesi.
// Ana sayfadaki ürün kartları ve satış CTA'ları buraya yönlenir.
export const CAMPAIGN_URL = 'https://bakircilarkampanya.com';
