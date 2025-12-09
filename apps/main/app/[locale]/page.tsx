'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hero, Container, WhatsAppButton, Card } from '@bakircilar/ui';
import { useTranslations } from 'next-intl';

export default function HomePage({ params }: { params: { locale: string } }) {
  const t = useTranslations();
  const locale = params.locale;

  const companies = [
    {
      name: t('companies.ambalaj.name'),
      description: t('companies.ambalaj.description'),
      icon: '📦',
      color: '#3b82f6',
      href: `https://bakircilarambalaj.com/${locale}`
    },
    {
      name: 'Bankted E-Ticaret',
      description: locale === 'tr' ? 'Ambalaj, temizlik, kırtasiye ve daha fazlası için online alışveriş platformumuz' : 'Our online shopping platform for packaging, cleaning, stationery and more',
      icon: '🛒',
      color: '#f59e0b',
      href: 'https://www.bankted.com'
    },
    {
      name: t('companies.yazilim.name'),
      description: t('companies.yazilim.description'),
      icon: '💻',
      color: '#8b5cf6',
      href: `https://bakircilaryazilim.com/${locale}`
    },
    {
      name: t('companies.danismanlik.name'),
      description: t('companies.danismanlik.description'),
      icon: '📊',
      color: '#9333ea',
      href: `https://bakircilardanismanlik.com/${locale}`
    },
    {
      name: t('companies.emlak.name'),
      description: t('companies.emlak.description'),
      icon: '🏢',
      color: '#10b981',
      href: `https://bakircilaremlak.com/${locale}`
    },
    {
      name: t('companies.otomotiv.name'),
      description: t('companies.otomotiv.description'),
      icon: '🚗',
      color: '#ef4444',
      href: `https://bakircilaroto.com/${locale}`
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
          href: '#companies'
        }}
        secondaryCTA={{
          label: t('hero.secondaryCTA'),
          href: '#contact'
        }}
        backgroundVideo="/videos/hero-video.mp4"
      />

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Background Pattern */}
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Rakamlarla Bakırcılar Grup</h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Yılların deneyimi ve güçlü ekibimizle sektörde öncü konumdayız
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '5', label: t('stats.companies'), gradient: 'from-blue-400 to-cyan-400', icon: '🏢' },
              { value: '500+', label: t('stats.employees'), gradient: 'from-purple-400 to-pink-400', icon: '👥' },
              { value: '15+', label: t('stats.experience'), gradient: 'from-green-400 to-emerald-400', icon: '📅' },
              { value: '1000+', label: t('stats.customers'), gradient: 'from-orange-400 to-red-400', icon: '🤝' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <div className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-base md:text-lg text-blue-100 font-semibold">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Companies Section */}
      <section id="companies" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
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
                Grup Şirketlerimiz
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t('companies.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('companies.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <a href={company.href} target="_blank" rel="noopener noreferrer" className="block h-full group">
                  <Card className="h-full p-8 text-center transition-all hover:shadow-2xl relative overflow-hidden border-2 border-transparent hover:border-gray-200 bg-white">
                    {/* Colored top border */}
                    <div className="absolute top-0 left-0 right-0 h-2 transition-all" style={{
                      background: `linear-gradient(90deg, ${company.color}, ${company.color}dd)`
                    }} />

                    {/* Icon with background */}
                    <div className="relative mb-6 inline-flex">
                      <div className="absolute inset-0 opacity-20 rounded-2xl blur-xl transition-all group-hover:opacity-30"
                           style={{ backgroundColor: company.color }} />
                      <div className="relative text-6xl p-5 rounded-2xl group-hover:scale-110 transition-transform duration-300"
                           style={{ backgroundColor: `${company.color}20` }}>
                        {company.icon}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 transition-all group-hover:scale-105" style={{ color: company.color }}>
                      {company.name}
                    </h3>
                    <p className="text-gray-700 text-base leading-relaxed mb-6 min-h-[60px]">
                      {company.description}
                    </p>

                    {/* View website button */}
                    <div className="inline-flex items-center text-sm font-bold px-6 py-3 rounded-xl transition-all group-hover:shadow-xl group-hover:translate-y-[-2px]"
                         style={{
                           color: company.color,
                           backgroundColor: `${company.color}15`,
                           border: `2px solid ${company.color}40`
                         }}>
                      {t('companies.viewWebsite')}
                      <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
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
                Hakkımızda
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t('about.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
              {t('about.subtitle')}
            </p>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {t('about.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: t('about.vision.title'),
                description: t('about.vision.description'),
                gradient: 'from-blue-500 to-cyan-500',
                bgColor: 'bg-blue-50',
                borderColor: 'hover:border-blue-300'
              },
              {
                icon: '🚀',
                title: t('about.mission.title'),
                description: t('about.mission.description'),
                gradient: 'from-purple-500 to-pink-500',
                bgColor: 'bg-purple-50',
                borderColor: 'hover:border-purple-300'
              },
              {
                icon: '⭐',
                title: t('about.values.title'),
                description: t('about.values.description'),
                gradient: 'from-amber-500 to-orange-500',
                bgColor: 'bg-amber-50',
                borderColor: 'hover:border-amber-300'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className={`p-10 text-center h-full relative overflow-hidden border-2 border-transparent ${item.borderColor} transition-all hover:shadow-2xl`}>
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${item.gradient}`} />

                  <div className="relative inline-flex mb-6">
                    <div className={`absolute inset-0 opacity-20 rounded-2xl blur-2xl bg-gradient-to-r ${item.gradient}`} />
                    <div className={`relative text-6xl p-6 ${item.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:scale-105 transition-transform">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto border border-white/30">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t('cta.subtitle')}
            </p>
            <motion.a
              href={`/${locale}/contact`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white font-bold px-12 py-5 rounded-2xl shadow-2xl hover:shadow-white/25 transition-all text-lg text-blue-600 group"
            >
              {t('cta.button')}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </motion.div>
        </Container>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton
        phoneNumber="905301783570"
        message="Merhaba, Bakırcılar Grup hakkında bilgi almak istiyorum."
      />
    </main>
  );
}
