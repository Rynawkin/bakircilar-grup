'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hero, Container, Card, WhatsAppButton } from '@bakircilar/ui';
import { useTranslations } from 'next-intl';

export default function OtomotivHomePage() {
  const t = useTranslations();

  const services = [
    {
        title: t('services.sales.title'),
        description: t('services.sales.description'),
        icon: '🚗',
        features: [t('services.sales.feature1'), t('services.sales.feature2'), t('services.sales.feature3')]
    },
    {
        title: t('services.rental.title'),
        description: t('services.rental.description'),
        icon: '🔑',
        features: [t('services.rental.feature1'), t('services.rental.feature2'), t('services.rental.feature3')]
    },
    {
        title: t('services.expertise.title'),
        description: t('services.expertise.description'),
        icon: '🔍',
        features: [t('services.expertise.feature1'), t('services.expertise.feature2'), t('services.expertise.feature3')]
    },
    {
        title: t('services.maintenance.title'),
        description: t('services.maintenance.description'),
        icon: '🔧',
        features: [t('services.maintenance.feature1'), t('services.maintenance.feature2'), t('services.maintenance.feature3')]
    }
];

  return (
    <main className="min-h-screen">
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        description={t('hero.description')}
        primaryCTA={{
          label: t('hero.primaryCTA'),
          href: '#services'
        }}
        secondaryCTA={{
          label: t('hero.secondaryCTA'),
          href: 'https://bakircilargrup.com/contact'
        }}
        backgroundVideo="/videos/hero-video.mp4"
      />

      <section id="services" className="py-24 bg-gradient-to-br from-gray-50 via-white to-red-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <span className="text-red-600 font-bold text-sm uppercase tracking-widest bg-red-50 px-6 py-2 rounded-full border-2 border-red-200">
                Hizmetlerimiz
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t('services.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('services.subtitle')}
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
                <Card className="p-8 h-full relative overflow-hidden hover:shadow-2xl transition-all border-2 border-transparent hover:border-red-200 bg-white group">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-rose-500" />

                  <div className="flex items-start gap-6">
                    <div className="relative inline-flex flex-shrink-0">
                      <div className="absolute inset-0 bg-red-500 opacity-20 rounded-2xl blur-xl" />
                      <div className="relative text-6xl p-4 bg-red-50 rounded-2xl group-hover:scale-110 transition-transform">
                        {service.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-red-600">{service.title}</h3>
                      <p className="text-gray-700 text-base leading-relaxed mb-4">{service.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <span key={idx} className="px-4 py-2 bg-red-50 text-red-700 text-sm rounded-full font-bold border-2 border-red-200">
                            ✓ {feature}
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

      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '✓',
                title: t('features.quality.title'),
                description: t('features.quality.description'),
                gradient: 'from-red-500 to-rose-500',
                bgColor: 'bg-red-50'
              },
              {
                icon: '🎯',
                title: t('features.support.title'),
                description: t('features.support.description'),
                gradient: 'from-rose-500 to-pink-500',
                bgColor: 'bg-rose-50'
              },
              {
                icon: '⭐',
                title: t('features.delivery.title'),
                description: t('features.delivery.description'),
                gradient: 'from-pink-500 to-red-500',
                bgColor: 'bg-pink-50'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className={`p-10 text-center h-full relative overflow-hidden border-2 border-transparent hover:border-gray-200 transition-all hover:shadow-2xl`}>
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${feature.gradient}`} />

                  <div className="relative inline-flex mb-6">
                    <div className={`absolute inset-0 opacity-20 rounded-2xl blur-2xl bg-gradient-to-r ${feature.gradient}`} />
                    <div className={`relative text-6xl p-6 ${feature.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-base">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section id="contact" className="py-24 bg-gradient-to-br from-red-600 via-red-700 to-rose-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20px 20px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-block mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto border border-white/30">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-red-100 max-w-3xl mx-auto leading-relaxed">
              {t('cta.subtitle')}
            </p>
            <a
              href="https://bakircilargrup.com/contact"
              className="inline-flex items-center gap-3 bg-white text-red-600 font-bold px-12 py-5 rounded-2xl shadow-2xl hover:shadow-white/25 hover:scale-105 transition-all text-lg group"
            >
              {t('cta.button')}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </Container>
      </section>

      <WhatsAppButton
        phoneNumber="905301783570"
        message="Merhaba, Bakırcılar Otomotiv hakkında bilgi almak istiyorum."
      />
    </main>
  );
}
