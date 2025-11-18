'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container, Card } from '@bakircilar/ui';
import { useTranslations } from 'next-intl';

export default function CompaniesPage({ params }: { params: { locale: string } }) {
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
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20px 20px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('companiesPage.title')}</h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              {t('companiesPage.subtitle')}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Companies Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <Container>
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
                  <Card className="h-full p-8 text-center transition-all hover:shadow-2xl relative overflow-hidden border-2 border-transparent hover:border-gray-200">
                    {/* Colored top border */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 transition-all group-hover:h-2" style={{ backgroundColor: company.color }} />

                    {/* Icon with background */}
                    <div className="relative mb-6 inline-flex">
                      <div className="absolute inset-0 opacity-10 rounded-2xl blur-xl" style={{ backgroundColor: company.color }} />
                      <div className="relative text-6xl p-4 rounded-2xl group-hover:scale-110 transition-transform" style={{ backgroundColor: `${company.color}15` }}>
                        {company.icon}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 transition-colors group-hover:opacity-90" style={{ color: company.color }}>
                      {company.name}
                    </h3>
                    <p className="text-gray-700 text-base leading-relaxed mb-6">
                      {company.description}
                    </p>

                    {/* View website button */}
                    <div className="inline-flex items-center text-sm font-semibold px-6 py-3 rounded-lg transition-all group-hover:shadow-lg"
                         style={{
                           color: company.color,
                           backgroundColor: `${company.color}10`,
                           border: `2px solid ${company.color}30`
                         }}>
                      {t('companies.viewWebsite')}
                      <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* E-commerce Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('companiesPage.ecommerce.title')}</h2>
            <p className="text-xl md:text-2xl mb-10 text-purple-100 max-w-3xl mx-auto leading-relaxed">
              {t('companiesPage.ecommerce.description')}
            </p>
            <a
              href="https://www.bankted.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-purple-600 font-bold px-12 py-5 rounded-2xl shadow-2xl hover:shadow-white/25 hover:scale-105 transition-all text-lg group"
            >
              {t('companiesPage.ecommerce.button')}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
