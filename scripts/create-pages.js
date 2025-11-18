const fs = require('fs');
const path = require('path');

const sites = {
  yazilim: {
    title: 'Bakırcılar Yazılım',
    subtitle: 'Yazılım Çözümleri',
    description: 'Modern teknolojiler ile özel yazılım geliştirme ve dijital dönüşüm hizmetleri',
    color: 'purple',
    services: [
      { title: 'Web Geliştirme', description: 'Modern web uygulamaları', icon: '🌐' },
      { title: 'Mobil Uygulama', description: 'iOS ve Android uygulamalar', icon: '📱' },
      { title: 'Bulut Çözümleri', description: 'Cloud mimarisi ve yönetim', icon: '☁️' },
      { title: 'Danışmanlık', description: 'Dijital dönüşüm danışmanlığı', icon: '💡' }
    ]
  },
  danismanlik: {
    title: 'Bakırcılar Danışmanlık',
    subtitle: 'İş Danışmanlığı',
    description: 'Stratejik planlama, süreç iyileştirme ve iş geliştirme danışmanlığı hizmetleri',
    color: 'green',
    services: [
      { title: 'Stratejik Planlama', description: 'İş stratejisi oluşturma', icon: '🎯' },
      { title: 'Süreç İyileştirme', description: 'Operasyonel verimlilik', icon: '⚙️' },
      { title: 'İş Geliştirme', description: 'Büyüme ve pazar stratejileri', icon: '📈' },
      { title: 'Organizasyon', description: 'Organizasyonel yapılandırma', icon: '🏢' }
    ]
  },
  emlak: {
    title: 'Bakırcılar Emlak',
    subtitle: 'Gayrimenkul',
    description: 'Konut, ticari ve yatırım amaçlı gayrimenkul danışmanlığı ve satış hizmetleri',
    color: 'orange',
    services: [
      { title: 'Konut Satış', description: 'Daire ve ev satış hizmetleri', icon: '🏠' },
      { title: 'Ticari Gayrimenkul', description: 'Ofis ve dükkan kiralama', icon: '🏢' },
      { title: 'Yatırım Danışmanlığı', description: 'Gayrimenkul yatırım tavsiyeleri', icon: '💰' },
      { title: 'Proje Pazarlama', description: 'Yeni proje satış ve tanıtım', icon: '🏗️' }
    ]
  },
  otomotiv: {
    title: 'Bakırcılar Otomotiv',
    subtitle: 'Otomotiv Hizmetleri',
    description: 'Araç satış, kiralama ve bakım hizmetlerinde güvenilir çözüm ortağınız',
    color: 'red',
    services: [
      { title: 'Araç Satış', description: 'Sıfır ve ikinci el araç satışı', icon: '🚗' },
      { title: 'Araç Kiralama', description: 'Kısa ve uzun dönem kiralama', icon: '🔑' },
      { title: 'Bakım & Onarım', description: 'Profesyonel servis hizmetleri', icon: '🔧' },
      { title: 'Yedek Parça', description: 'Orijinal yedek parça temini', icon: '⚙️' }
    ]
  },
  yolpilot: {
    title: 'Yolpilot',
    subtitle: 'Akıllı Navigasyon',
    description: 'Yapay zeka destekli navigasyon ve sürüş asistanı uygulaması',
    color: 'blue',
    services: [
      { title: 'Akıllı Rota', description: 'AI destekli rota optimizasyonu', icon: '🗺️' },
      { title: 'Trafik Takibi', description: 'Gerçek zamanlı trafik bilgisi', icon: '🚦' },
      { title: 'Güvenli Sürüş', description: 'Sürüş davranış analizi', icon: '🛡️' },
      { title: 'Yakıt Tasarrufu', description: 'Ekonomik rota önerileri', icon: '⛽' }
    ]
  }
};

Object.entries(sites).forEach(([siteName, config]) => {
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
        subtitle="${config.subtitle}"
        description="${config.description}"
        primaryCTA={{
          label: 'Hizmetlerimiz',
          href: '#services'
        }}
        secondaryCTA={{
          label: 'İletişim',
          href: '#contact'
        }}
      />

      <section id="services" className="py-20 bg-gray-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hizmetlerimiz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              İhtiyaçlarınıza özel çözümlerimiz ile yanınızdayız
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="p-6 text-center h-full">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section id="contact" className="py-20 bg-${config.color}-600 text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Birlikte Çalışalım
            </h2>
            <p className="text-xl mb-8">
              Projeleriniz için doğru çözümü bulalım
            </p>
            <a
              href="https://bakircilargrup.com/contact"
              className="inline-block bg-white text-${config.color}-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
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

  const sitePath = path.join(__dirname, `../apps/${siteName}/app/[locale]`);
  fs.mkdirSync(sitePath, { recursive: true });
  fs.writeFileSync(path.join(sitePath, 'page.tsx'), pageContent);

  console.log(`✅ Created page for ${siteName}`);
});

console.log('\n🎉 All pages created successfully!');
