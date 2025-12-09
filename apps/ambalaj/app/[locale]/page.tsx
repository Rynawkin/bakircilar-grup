'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hero, Container, Card, WhatsAppButton } from '@bakircilar/ui';
import { useTranslations } from 'next-intl';

export default function AmbalajHomePage() {
  const t = useTranslations();

  const products = [
    {
      title: t('products.packaging.title'),
      description: t('products.packaging.description'),
      icon: '📦',
      color: 'blue',
      href: 'https://www.bankted.com/ambalaj-urunleri',
      features: [
        t('products.packaging.feature1'),
        t('products.packaging.feature2'),
        t('products.packaging.feature3'),
        t('products.packaging.feature4'),
        t('products.packaging.feature5'),
        t('products.packaging.feature6'),
        t('products.packaging.feature7')
      ]
    },
    {
      title: t('products.cleaning.title'),
      description: t('products.cleaning.description'),
      icon: '🧹',
      color: 'green',
      href: 'https://www.bankted.com/temizlik-ve-hijyen',
      features: [
        t('products.cleaning.feature1'),
        t('products.cleaning.feature2'),
        t('products.cleaning.feature3'),
        t('products.cleaning.feature4'),
        t('products.cleaning.feature5'),
        t('products.cleaning.feature6'),
        t('products.cleaning.feature7'),
        t('products.cleaning.feature8')
      ]
    },
    {
      title: t('products.stationery.title'),
      description: t('products.stationery.description'),
      icon: '📝',
      color: 'purple',
      href: 'https://www.bankted.com/kirtasiye-ve-ofis',
      features: [
        t('products.stationery.feature1'),
        t('products.stationery.feature2'),
        t('products.stationery.feature3'),
        t('products.stationery.feature4')
      ]
    },
    {
      title: t('products.food.title'),
      description: t('products.food.description'),
      icon: '🍽️',
      color: 'orange',
      href: 'https://www.bankted.com/gida-ve-mutfak',
      features: [
        t('products.food.feature1'),
        t('products.food.feature2'),
        t('products.food.feature3'),
        t('products.food.feature4')
      ]
    },
    {
      title: t('products.dispensers.title'),
      description: t('products.dispensers.description'),
      icon: '🚰',
      color: 'cyan',
      href: 'https://www.bankted.com/dispanserler',
      features: [
        t('products.dispensers.feature1'),
        t('products.dispensers.feature2')
      ]
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        description={t('hero.description')}
        primaryCTA={{
          label: t('hero.primaryCTA'),
          href: '#products'
        }}
        secondaryCTA={{
          label: t('hero.secondaryCTA'),
          href: '#contact'
        }}
        backgroundVideo="/videos/hero-video.mp4"
      />

      {/* Products Section */}
      <section id="products" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <span className="text-blue-600 font-bold text-sm uppercase tracking-widest bg-blue-50 px-6 py-2 rounded-full border-2 border-blue-200">
                Ürünlerimiz
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t('products.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('products.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <a href={product.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <Card className="p-8 h-full relative overflow-hidden hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-200 bg-white group cursor-pointer">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />

                    <div className="flex items-start gap-6">
                      <div className="relative inline-flex flex-shrink-0">
                        <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-2xl blur-xl" />
                        <div className="relative text-6xl p-4 bg-blue-50 rounded-2xl group-hover:scale-110 transition-transform">
                          {product.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3 text-blue-600 group-hover:underline">{product.title}</h3>
                        <p className="text-gray-700 text-base leading-relaxed mb-4">{product.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {product.features.map((feature, idx) => (
                            <span key={idx} className="px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-full font-bold border-2 border-blue-200">
                              ✓ {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* View products button indicator */}
                    <div className="mt-6 flex items-center justify-center">
                      <div className="inline-flex items-center text-sm font-bold px-6 py-3 rounded-xl transition-all group-hover:shadow-lg group-hover:translate-y-[-2px] bg-blue-50 text-blue-600 border-2 border-blue-200">
                        Ürünleri Görüntüle
                        <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '✓',
                title: t('features.quality.title'),
                description: t('features.quality.description'),
                gradient: 'from-blue-500 to-cyan-500',
                bgColor: 'bg-blue-50'
              },
              {
                icon: '🌿',
                title: t('features.eco.title'),
                description: t('features.eco.description'),
                gradient: 'from-green-500 to-emerald-500',
                bgColor: 'bg-green-50'
              },
              {
                icon: '🚚',
                title: t('features.delivery.title'),
                description: t('features.delivery.description'),
                gradient: 'from-orange-500 to-amber-500',
                bgColor: 'bg-orange-50'
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

      {/* CTA Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t('cta.subtitle')}
            </p>
            <a
              href="https://bakircilargrup.com/contact"
              className="inline-flex items-center gap-3 bg-white text-blue-600 font-bold px-12 py-5 rounded-2xl shadow-2xl hover:shadow-white/25 hover:scale-105 transition-all text-lg group"
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
        message="Merhaba, Bakırcılar Ambalaj hakkında bilgi almak istiyorum."
      />
    </main>
  );
}
