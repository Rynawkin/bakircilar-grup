'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Icon } from '../../../components/icons';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 }
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-brand-copper">
      <span className="h-px w-8 bg-brand-copper" />
      {children}
    </span>
  );
}

export default function AboutPage() {
  const t = useTranslations();

  const vm = [
    { icon: 'eye', title: t('about.vision.title'), body: t('aboutPage.visionDetailed') },
    { icon: 'flag', title: t('about.mission.title'), body: t('aboutPage.missionDetailed') }
  ];

  const values = [
    { key: 'innovation', icon: 'lightbulb' },
    { key: 'reliability', icon: 'shield' },
    { key: 'quality', icon: 'badge' },
    { key: 'sustainability', icon: 'globe' },
    { key: 'humanFocused', icon: 'users' },
    { key: 'excellence', icon: 'star' }
  ];

  const facts = [
    { value: '1990', label: t('facts.founded') },
    { value: '6', label: t('facts.productGroups') },
    { value: '2', label: t('facts.locations') },
    { value: '4', label: t('facts.languages') }
  ];

  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-navy">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <Eyebrow>{t('nav.about')}</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] text-white md:text-5xl">
              {t('aboutPage.title')}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-300">
              {t('aboutPage.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <motion.h2 {...fadeUp} className="font-display text-3xl font-bold text-brand-navy md:text-4xl lg:col-span-4">
              {t('aboutPage.story.title')}
            </motion.h2>
            <motion.div {...fadeUp} className="space-y-5 text-lg leading-relaxed text-stone-600 lg:col-span-8">
              <p>{t('aboutPage.story.paragraph1')}</p>
              <p>{t('aboutPage.story.paragraph2')}</p>
              <p>{t('aboutPage.story.paragraph3')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-brand-sand py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:px-8">
          {vm.map((card) => (
            <motion.div {...fadeUp} key={card.title} className="rounded-2xl border border-stone-200/80 bg-white p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-copper/10 text-brand-copper">
                <Icon name={card.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-brand-navy">{card.title}</h3>
              <p className="mt-3 leading-relaxed text-stone-600">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-brand-navy md:text-4xl">{t('aboutPage.valuesTitle')}</h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">{t('aboutPage.valuesSubtitle')}</p>
          </motion.div>
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <motion.div {...fadeUp} key={value.key} className="relative pl-16">
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl border border-stone-200 text-brand-copper">
                  <Icon name={value.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-brand-navy">
                  {t(`aboutPage.valuesItems.${value.key}.title`)}
                </h3>
                <p className="mt-2 leading-relaxed text-stone-600">
                  {t(`aboutPage.valuesItems.${value.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="bg-brand-navy">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-6 md:grid-cols-4 lg:px-8">
          {facts.map((f) => (
            <div key={f.label} className="px-2 py-10 text-center md:py-12">
              <div className="font-display text-3xl font-bold text-brand-copper md:text-4xl">{f.value}</div>
              <div className="mt-2 text-sm text-stone-400">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
