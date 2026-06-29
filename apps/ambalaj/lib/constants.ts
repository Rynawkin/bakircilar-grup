export const CONTACT_INFO = {
  email: 'info@bakircilarambalaj.com',
  phone: '+90 (850) 756 62 67',
  whatsapp: '905301783570',
  // Merkez adres (footer ve genel kullanım için tek satır)
  address: 'Rasimpaşa, Atatürk Blv. Cami No:5 No:75/A, 54300 Hendek / Sakarya'
};

// Lokasyonlar — iletişim sayfasında adres + gömülü harita olarak listelenir.
// mapsQuery: Google Haritalar'da en isabetli pinlemeyi veren sade adres sorgusu.
export const LOCATIONS = [
  {
    name: 'Merkez',
    address: 'Rasimpaşa, Atatürk Blv. Cami No:5 No:75/A, 54300 Hendek / Sakarya',
    mapsQuery: 'Atatürk Bulvarı, 54300 Hendek/Sakarya'
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
