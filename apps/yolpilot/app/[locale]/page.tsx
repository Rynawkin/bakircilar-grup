'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hero, Container, Card, WhatsAppButton } from '@bakircilar/ui';

export default function YolpilotHomePage() {
  const services = [
    {
        "title": "Akıllı Navigasyon",
        "description": "Yapay zeka destekli rota optimizasyonu ile en hızlı ve ekonomik yolu bulun. Gerçek zamanlı trafik analizi ve alternatif rotalar.",
        "icon": "🗺️",
        "features": [
            "AI Rota",
            "Gerçek Zamanlı",
            "Alternatifler"
        ]
    },
    {
        "title": "Trafik & Hız Kameraları",
        "description": "Canlı trafik durumu, kaza ve yol çalışması bildirimleri. Hız kamerası ve radar uyarıları. Topluluk bazlı bilgi paylaşımı.",
        "icon": "🚦",
        "features": [
            "Canlı Trafik",
            "Kamera Uyarı",
            "Topluluk"
        ]
    },
    {
        "title": "Güvenli Sürüş Asistanı",
        "description": "Sürüş davranışı analizi ve güvenlik önerileri. Hız limiti uyarıları, şerit değişim kontrolü ve yorgunluk tespiti.",
        "icon": "🛡️",
        "features": [
            "Davranış Analizi",
            "Güvenlik Uyarıları",
            "Yorgunluk Tespiti"
        ]
    },
    {
        "title": "Yakıt & Maliyet Tasarrufu",
        "description": "Ekonomik sürüş önerileri ile yakıt tasarrufu. Yakıt istasyonu fiyat karşılaştırması ve en uygun rotalar.",
        "icon": "⛽",
        "features": [
            "Ekonomik Sürüş",
            "Fiyat Karşılaştırma",
            "Tasarruf Raporu"
        ]
    }
];

  return (
    <main className="min-h-screen">
      <Hero
        title="Yolpilot"
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
                      <h3 className="text-2xl font-bold mb-3" style={{ color: '#2563eb' }}>{service.title}</h3>
                      <p className="text-gray-700 text-base leading-relaxed mb-4">{service.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <span key={idx} className="px-3 py-1 text-sm rounded-full font-medium" style={{ backgroundColor: '#2563eb15', color: '#2563eb' }}>
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
                <div className="text-4xl mb-4" style={{ color: '#2563eb' }}>{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20" style={{ backgroundColor: '#2563eb' }}>
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
              style={{ color: '#2563eb' }}
            >
              İletişime Geçin
            </a>
          </motion.div>
        </Container>
      </section>

      <WhatsAppButton
        phoneNumber="90XXXXXXXXXX"
        message="Merhaba, Yolpilot hakkında bilgi almak istiyorum."
      />
    </main>
  );
}
