'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { WhatsAppButton } from '@bakircilar/ui';
import { useTranslations, useLocale } from 'next-intl';
import { CAMPAIGN_URL, CONTACT_INFO } from '../../lib/constants';

const ICONS: Record<string, React.ReactNode> = {
  cube: <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
  sparkles: <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
  document: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  cake: <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />,
  beaker: <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />,
  tools: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </>
  ),
  shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  globe: <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />,
  truck: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" />
    </>
  )
};

function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
    </svg>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 }
};

export default function AmbalajHomePage() {
  const t = useTranslations();
  const locale = useLocale();

  const products = [
    { icon: 'cube', title: t('products.packaging.title'), description: t('products.packaging.description') },
    { icon: 'sparkles', title: t('products.cleaning.title'), description: t('products.cleaning.description') },
    { icon: 'document', title: t('products.stationery.title'), description: t('products.stationery.description') },
    { icon: 'cake', title: t('products.food.title'), description: t('products.food.description') },
    { icon: 'beaker', title: t('products.dispensers.title'), description: t('products.dispensers.description') },
    { icon: 'tools', title: t('products.hardware.title'), description: t('products.hardware.description') }
  ];

  const features = [
    { icon: 'shield', title: t('features.quality.title'), description: t('features.quality.description') },
    { icon: 'globe', title: t('features.eco.title'), description: t('features.eco.description') },
    { icon: 'truck', title: t('features.delivery.title'), description: t('features.delivery.description') }
  ];

  const facts = [
    { value: '1990', label: 'Kuruluş yılı' },
    { value: '5', label: 'Ürün grubu' },
    { value: '2', label: 'Lokasyon' },
    { value: '4 dil', label: 'TR · EN · DE · ES' }
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-brand-navy">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-brand-navy/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/45 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-brand-copper">
              <span className="h-px w-8 bg-brand-copper" />
              {t('hero.subtitle')}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
              {t('hero.description')}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={CAMPAIGN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-copper px-7 py-3.5 text-base font-medium text-white transition hover:bg-brand-copper-dark"
              >
                {t('campaign.label')}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-base font-medium text-white transition hover:border-white/50 hover:bg-white/5"
              >
                {t('hero.primaryCTA')}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Trust strip */}
        <div className="relative border-t border-white/10 bg-brand-navy/50 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-6 md:grid-cols-4 lg:px-8">
            {facts.map((f) => (
              <div key={f.label} className="px-2 py-6 text-center md:py-7">
                <div className="font-display text-2xl font-bold text-white md:text-3xl">{f.value}</div>
                <div className="mt-1 text-xs text-stone-400 md:text-sm">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="bg-brand-sand py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl">
            <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-brand-copper">
              <span className="h-px w-8 bg-brand-copper" />
              {t('hero.subtitle')}
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold text-brand-navy md:text-4xl">
              {t('products.title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              {t('products.subtitle')}
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <motion.a
                key={product.title}
                href={CAMPAIGN_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group flex h-full flex-col rounded-2xl border border-stone-200/80 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-brand-copper/40 hover:shadow-[0_18px_50px_-20px_rgba(19,41,75,0.25)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy/[0.06] text-brand-navy transition duration-300 group-hover:bg-brand-copper group-hover:text-white">
                  <Icon name={product.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-brand-navy">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {product.description}
                </p>
                <div className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-brand-copper">
                  Ürünleri gör
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
            {features.map((feature) => (
              <motion.div {...fadeUp} key={feature.title} className="relative pl-16">
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl border border-stone-200 text-brand-copper">
                  <Icon name={feature.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-brand-navy">
                  {feature.title}
                </h3>
                <p className="mt-2 leading-relaxed text-stone-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.h2 {...fadeUp} className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
            {t('cta.title')}
          </motion.h2>
          <motion.p {...fadeUp} className="mt-5 text-lg text-stone-300">
            {t('cta.subtitle')}
          </motion.p>
          <motion.div {...fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={CAMPAIGN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand-copper px-8 py-4 text-base font-medium text-white transition hover:bg-brand-copper-dark"
            >
              {t('campaign.label')}
            </a>
            <a
              href={`/${locale}/contact`}
              className="rounded-full border border-white/25 px-8 py-4 text-base font-medium text-white transition hover:border-white/50 hover:bg-white/5"
            >
              {t('cta.button')}
            </a>
          </motion.div>
        </div>
      </section>

      <WhatsAppButton
        phoneNumber={CONTACT_INFO.whatsapp}
        message="Merhaba, Bakırcılar Ambalaj hakkında bilgi almak istiyorum."
      />
    </main>
  );
}
