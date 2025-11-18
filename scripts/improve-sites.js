const fs = require('fs');
const path = require('path');

const sites = {
  yazilim: {
    title: 'Bakırcılar Yazılım',
    letter: 'Y',
    color: '#8b5cf6',
    colorName: 'purple',
    services: [
      {
        title: 'Web & Mobil Geliştirme',
        description: 'React, Next.js, React Native ile modern, hızlı ve ölçeklenebilir web ve mobil uygulamalar geliştiriyoruz. Kullanıcı deneyimi odaklı çözümlerimizle dijital dönüşümünüzü sağlıyoruz.',
        icon: '🌐',
        features: ['React & Next.js', 'React Native', 'Progressive Web Apps']
      },
      {
        title: 'Cloud & DevOps',
        description: 'AWS, Azure, Google Cloud altyapılarında bulut çözümleri ve CI/CD pipeline kurulumu. Yüksek erişilebilirlik ve ölçeklenebilir mimari tasarımı.',
        icon: '☁️',
        features: ['AWS/Azure/GCP', 'Docker & Kubernetes', 'CI/CD Pipeline']
      },
      {
        title: 'Backend & API',
        description: 'Node.js, Python, Go ile güvenli, hızlı ve ölçeklenebilir RESTful ve GraphQL API geliştirme. Microservices mimarisi ve entegrasyon çözümleri.',
        icon: '⚙️',
        features: ['Node.js/Python/Go', 'RESTful & GraphQL', 'Microservices']
      },
      {
        title: 'Danışmanlık & Eğitim',
        description: 'Dijital dönüşüm danışmanlığı, teknik mimari tasarımı ve ekip eğitimleri. Agile & Scrum metodolojileri ile proje yönetimi desteği.',
        icon: '💡',
        features: ['Teknik Mimari', 'Agile Coaching', 'Ekip Eğitimleri']
      }
    ]
  },
  danismanlik: {
    title: 'Bakırcılar Danışmanlık',
    letter: 'D',
    color: '#10b981',
    colorName: 'green',
    services: [
      {
        title: 'Stratejik Planlama',
        description: 'Şirketinizin vizyonu doğrultusunda kapsamlı iş stratejisi oluşturma, pazar analizi ve rekabet stratejileri geliştirme. Uzun vadeli büyüme planları.',
        icon: '🎯',
        features: ['Pazar Analizi', 'Rekabet Stratejisi', 'Büyüme Planı']
      },
      {
        title: 'Süreç Optimizasyonu',
        description: 'İş süreçlerinizi analiz ederek verimsizlikleri tespit ediyoruz. Lean ve Six Sigma metodolojileri ile operasyonel mükemmelliği sağlıyoruz.',
        icon: '⚙️',
        features: ['Lean Management', 'Six Sigma', 'KPI Takibi']
      },
      {
        title: 'İş Geliştirme',
        description: 'Yeni pazar fırsatlarını değerlendirme, iş modeli geliştirme ve gelir akışı diversifikasyonu. Satış ve pazarlama stratejileri oluşturma.',
        icon: '📈',
        features: ['Pazar Girişi', 'İş Modeli', 'Gelir Artışı']
      },
      {
        title: 'Organizasyon & İK',
        description: 'Organizasyon yapısı tasarımı, yetenek yönetimi ve performans sistemleri kurulumu. Şirket kültürü geliştirme ve değişim yönetimi.',
        icon: '🏢',
        features: ['Org Tasarım', 'Yetenek Yönetimi', 'Değişim Yönetimi']
      }
    ]
  },
  emlak: {
    title: 'Bakırcılar Emlak',
    letter: 'E',
    color: '#f97316',
    colorName: 'orange',
    services: [
      {
        title: 'Konut Alım-Satım',
        description: 'Daire, villa, rezidans gibi konut tiplerinde profesyonel alım-satım danışmanlığı. Yasal süreç yönetimi ve tapu işlemleri desteği.',
        icon: '🏠',
        features: ['Daire & Villa', 'Rezidans', 'Tapu İşlemleri']
      },
      {
        title: 'Ticari Gayrimenkul',
        description: 'Ofis, dükkan, plaza ve iş merkezi kiralama ve satış hizmetleri. Kurumsal müşteriler için özel çözümler ve portföy yönetimi.',
        icon: '🏢',
        features: ['Ofis & Dükkan', 'Plaza', 'Portföy Yönetimi']
      },
      {
        title: 'Yatırım Danışmanlığı',
        description: 'Gayrimenkul yatırımı için pazar analizi, değerleme raporları ve ROI hesaplamaları. Arazi ve arsa yatırım fırsatları değerlendirmesi.',
        icon: '💰',
        features: ['Pazar Analizi', 'Değerleme', 'ROI Hesaplama']
      },
      {
        title: 'Proje Pazarlama',
        description: 'Yeni konut ve ticari projeler için lansman organizasyonu, satış ofisi yönetimi ve dijital pazarlama stratejileri.',
        icon: '🏗️',
        features: ['Lansman', 'Satış Ofisi', 'Dijital Pazarlama']
      }
    ]
  },
  otomotiv: {
    title: 'Bakırcılar Otomotiv',
    letter: 'O',
    color: '#ef4444',
    colorName: 'red',
    services: [
      {
        title: 'Araç Satış',
        description: 'Sıfır ve ikinci el araç satışında güvenilir hizmet. Tüm marka ve modellerde geniş stok seçenekleri. Kredi ve sigorta danışmanlığı.',
        icon: '🚗',
        features: ['Sıfır Araç', 'İkinci El', 'Kredi Desteği']
      },
      {
        title: 'Kiralama Hizmetleri',
        description: 'Günlük, aylık ve uzun dönem araç kiralama. Kurumsal filo kiralama çözümleri. Şoförlü ve şoförsüz seçenekler.',
        icon: '🔑',
        features: ['Günlük/Aylık', 'Kurumsal Filo', 'Şoförlü Hizmet']
      },
      {
        title: 'Servis & Bakım',
        description: 'Yetkili servis kalitesinde periyodik bakım, tamir ve onarım hizmetleri. Kasko ve sigorta işlemleri. Yol yardım 7/24.',
        icon: '🔧',
        features: ['Periyodik Bakım', 'Kasko İşlemleri', '7/24 Yol Yardım']
      },
      {
        title: 'Yedek Parça',
        description: 'Orijinal ve yan sanayi yedek parça tedariki. Tüm marka ve modeller için geniş ürün yelpazesi. Hızlı kargo ve montaj hizmeti.',
        icon: '⚙️',
        features: ['Orijinal Parça', 'Hızlı Kargo', 'Montaj Hizmeti']
      }
    ]
  },
  yolpilot: {
    title: 'Yolpilot',
    letter: 'Y',
    color: '#2563eb',
    colorName: 'blue',
    services: [
      {
        title: 'Akıllı Navigasyon',
        description: 'Yapay zeka destekli rota optimizasyonu ile en hızlı ve ekonomik yolu bulun. Gerçek zamanlı trafik analizi ve alternatif rotalar.',
        icon: '🗺️',
        features: ['AI Rota', 'Gerçek Zamanlı', 'Alternatifler']
      },
      {
        title: 'Trafik & Hız Kameraları',
        description: 'Canlı trafik durumu, kaza ve yol çalışması bildirimleri. Hız kamerası ve radar uyarıları. Topluluk bazlı bilgi paylaşımı.',
        icon: '🚦',
        features: ['Canlı Trafik', 'Kamera Uyarı', 'Topluluk']
      },
      {
        title: 'Güvenli Sürüş Asistanı',
        description: 'Sürüş davranışı analizi ve güvenlik önerileri. Hız limiti uyarıları, şerit değişim kontrolü ve yorgunluk tespiti.',
        icon: '🛡️',
        features: ['Davranış Analizi', 'Güvenlik Uyarıları', 'Yorgunluk Tespiti']
      },
      {
        title: 'Yakıt & Maliyet Tasarrufu',
        description: 'Ekonomik sürüş önerileri ile yakıt tasarrufu. Yakıt istasyonu fiyat karşılaştırması ve en uygun rotalar.',
        icon: '⛽',
        features: ['Ekonomik Sürüş', 'Fiyat Karşılaştırma', 'Tasarruf Raporu']
      }
    ]
  }
};

Object.entries(sites).forEach(([siteName, config]) => {
  // Layout component
  const layoutContent = `'use client';

import React from 'react';
import { Header, Footer } from '@bakircilar/ui';
import { usePathname } from 'next/navigation';

export const SiteLayout: React.FC<{ children: React.ReactNode; locale: string }> = ({
  children,
  locale
}) => {
  const pathname = usePathname();

  const menuItems = [
    { label: 'Ana Sayfa', href: \`/\${locale}\` },
    { label: 'Hizmetlerimiz', href: \`/\${locale}#services\` },
    { label: 'Hakkımızda', href: 'https://bakircilargrup.com/about', external: true },
    { label: 'İletişim', href: 'https://bakircilargrup.com/contact', external: true }
  ];

  const footerSections = [
    {
      title: 'Hızlı Bağlantılar',
      links: [
        { label: 'Ana Sayfa', href: \`/\${locale}\` },
        { label: 'Hizmetlerimiz', href: \`/\${locale}#services\` },
        { label: 'Bakırcılar Grup', href: 'https://bakircilargrup.com' }
      ]
    },
    {
      title: 'Şirketlerimiz',
      links: [
        { label: 'Bakırcılar Grup', href: 'https://bakircilargrup.com' },
        { label: 'Bakırcılar Ambalaj', href: 'https://bakircilarambalaj.com' },
        { label: 'Bakırcılar Yazılım', href: 'https://bakircilaryazilim.com' },
        { label: 'Bakırcılar Danışmanlık', href: 'https://bakircilardanismanlik.com' }
      ]
    }
  ];

  const socialLinks = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      href: 'https://linkedin.com/company/bakircilar-grup',
      label: 'LinkedIn'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      href: 'https://instagram.com/bakircilargrup',
      label: 'Instagram'
    }
  ];

  const handleLanguageChange = (lang) => {
    const currentPath = pathname.replace(\`/\${locale}\`, '');
    window.location.href = \`/\${lang}\${currentPath}\`;
  };

  return (
    <>
      <Header
        logo={
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3" style={{ backgroundColor: '${config.color}' }}>
              ${config.letter}
            </div>
            <span className="text-xl font-bold text-gray-900">${config.title}</span>
          </div>
        }
        menuItems={menuItems}
        onLanguageChange={handleLanguageChange}
        currentLanguage={locale}
        brandColor="${config.color}"
      />

      {children}

      <Footer
        logo={
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-xl mr-3" style={{ color: '${config.color}' }}>
              ${config.letter}
            </div>
            <span className="text-xl font-bold text-white">${config.title}</span>
          </div>
        }
        description="${config.title} - Sektörde lider çözümlerimizle hizmetinizdeyiz."
        sections={footerSections}
        socialLinks={socialLinks}
        companyName="${config.title}"
        email="info@bakircilar${siteName}.com"
        phone="+90 XXX XXX XX XX"
        address="Adres bilgisi buraya gelecek"
      />
    </>
  );
};
`;

  // Page content
  const pageContent = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hero, Container, Card, WhatsAppButton } from '@bakircilar/ui';

export default function ${siteName.charAt(0).toUpperCase() + siteName.slice(1)}HomePage() {
  const services = ${JSON.stringify(config.services, null, 4)};

  return (
    <main className="min-h-screen">
      <Hero
        title="${config.title}"
        subtitle="Profesyonel Çözümler"
        description="Deneyimli ekibimiz ve kaliteli hizmet anlayışımızla sizlere en iyi çözümleri sunuyoruz"
        primaryCTA={{
          label: 'Hizmetlerimiz',
          href: '#services'
        }}
        secondaryCTA={{
          label: 'İletişim',
          href: 'https://bakircilargrup.com/contact'
        }}
      />

      <section id="services" className="py-20 bg-gray-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Hizmetlerimiz</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              İhtiyaçlarınıza özel, profesyonel ve kaliteli çözümlerimizle yanınızdayız
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="p-8 h-full">
                  <div className="flex items-start gap-6">
                    <div className="text-6xl flex-shrink-0">{service.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3" style={{ color: '${config.color}' }}>{service.title}</h3>
                      <p className="text-gray-700 text-base leading-relaxed mb-4">{service.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <span key={idx} className="px-3 py-1 text-sm rounded-full font-medium" style={{ backgroundColor: '${config.color}15', color: '${config.color}' }}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '✓',
                title: 'Profesyonel Ekip',
                description: 'Alanında uzman ve deneyimli ekibimizle kaliteli hizmet'
              },
              {
                icon: '🎯',
                title: 'Müşteri Odaklı',
                description: 'İhtiyaçlarınıza özel çözümler ve 7/24 destek'
              },
              {
                icon: '⭐',
                title: 'Güvenilir Hizmet',
                description: 'Yıllardır sektörde güvenilir ve kaliteli hizmet anlayışı'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-4" style={{ color: '${config.color}' }}>{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20" style={{ backgroundColor: '${config.color}' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Birlikte Çalışalım
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Projeleriniz için doğru çözümü bulmak üzere sizinle iletişime geçelim
            </p>
            <a
              href="https://bakircilargrup.com/contact"
              className="inline-block bg-white font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 text-lg"
              style={{ color: '${config.color}' }}
            >
              İletişime Geçin
            </a>
          </motion.div>
        </Container>
      </section>

      <WhatsAppButton
        phoneNumber="90XXXXXXXXXX"
        message="Merhaba, ${config.title} hakkında bilgi almak istiyorum."
      />
    </main>
  );
}
`;

  // Write files
  const componentsDir = path.join(__dirname, `../apps/${siteName}/components`);
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }
  fs.writeFileSync(path.join(componentsDir, 'SiteLayout.tsx'), layoutContent);

  const pageDir = path.join(__dirname, `../apps/${siteName}/app/[locale]`);
  fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageContent);

  console.log(`✅ Improved ${siteName}`);
});

console.log('\n🎉 All sites improved!');
