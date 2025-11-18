'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container, Card } from '@bakircilar/ui';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations();

  const values = [
    { key: 'innovation', icon: '💡', color: 'from-purple-500 to-pink-500' },
    { key: 'reliability', icon: '🤝', color: 'from-purple-500 to-pink-500' },
    { key: 'quality', icon: '⭐', color: 'from-amber-500 to-orange-500' },
    { key: 'sustainability', icon: '🌱', color: 'from-green-500 to-emerald-500' },
    { key: 'humanFocused', icon: '👥', color: 'from-indigo-500 to-purple-500' },
    { key: 'excellence', icon: '🎯', color: 'from-rose-500 to-red-500' }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-700 via-purple-800 to-pink-900 text-white overflow-hidden">
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('aboutPage.title')}</h1>
            <p className="text-xl md:text-2xl text-purple-100 leading-relaxed">
              {t('aboutPage.subtitle')}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center">{t('aboutPage.story.title')}</h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed">
              <p className="text-justify">{t('aboutPage.story.paragraph1')}</p>
              <p className="text-justify">{t('aboutPage.story.paragraph2')}</p>
              <p className="text-justify">{t('aboutPage.story.paragraph3')}</p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full p-10 relative overflow-hidden border-2 border-transparent hover:border-purple-300 transition-all">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500" />

                <div className="relative inline-flex mb-6">
                  <div className="absolute inset-0 bg-purple-500 opacity-20 rounded-full blur-2xl" />
                  <div className="relative text-6xl p-6 bg-purple-50 rounded-2xl">
                    🎯
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-6 text-purple-600">{t('about.vision.title')}</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {t('aboutPage.visionDetailed')}
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full p-10 relative overflow-hidden border-2 border-transparent hover:border-purple-300 transition-all">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500" />

                <div className="relative inline-flex mb-6">
                  <div className="absolute inset-0 bg-purple-500 opacity-20 rounded-full blur-2xl" />
                  <div className="relative text-6xl p-6 bg-purple-50 rounded-2xl">
                    🚀
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-6 text-purple-600">{t('about.mission.title')}</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {t('aboutPage.missionDetailed')}
                </p>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">{t('aboutPage.valuesTitle')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('aboutPage.valuesSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full p-8 text-center relative overflow-hidden hover:shadow-2xl transition-all border-2 border-transparent hover:border-gray-200">
                  {/* Gradient top border */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${value.color}`} />

                  {/* Icon with glow effect */}
                  <div className="relative inline-flex mb-6">
                    <div className={`absolute inset-0 opacity-20 rounded-2xl blur-xl bg-gradient-to-r ${value.color}`} />
                    <div className="relative text-5xl p-4 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform">
                      {value.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent" style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    <span className={`bg-gradient-to-r ${value.color} bg-clip-text`}>
                      {t(`aboutPage.values.${value.key}.title`)}
                    </span>
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {t(`aboutPage.values.${value.key}.description`)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-purple-700 via-purple-800 to-pink-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('aboutPage.statsTitle')}</h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              {t('aboutPage.statsSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '5', label: t('stats.companies'), gradient: 'from-purple-400 to-pink-400', icon: '📦' },
              { value: '100+', label: t('stats.employees'), gradient: 'from-purple-400 to-pink-400', icon: '👥' },
              { value: '30+', label: t('stats.experience'), gradient: 'from-green-400 to-emerald-400', icon: '📅' },
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
                  <div className="text-base md:text-lg text-purple-100 font-semibold">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline/History Section */}
      <section className="py-24 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <span className="text-purple-600 font-bold text-sm uppercase tracking-widest bg-purple-50 px-6 py-2 rounded-full border-2 border-purple-200">
                {t('aboutPage.timelineTag')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t('aboutPage.timelineTitle')}
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                year: '1990',
                title: t('aboutPage.timeline.milestone1.title'),
                description: t('aboutPage.timeline.milestone1.description'),
                color: 'from-purple-500 to-pink-500'
              },
              {
                year: '2000',
                title: t('aboutPage.timeline.milestone2.title'),
                description: t('aboutPage.timeline.milestone2.description'),
                color: 'from-purple-500 to-pink-500'
              },
              {
                year: '2010',
                title: t('aboutPage.timeline.milestone3.title'),
                description: t('aboutPage.timeline.milestone3.description'),
                color: 'from-green-500 to-emerald-500'
              },
              {
                year: '2024',
                title: t('aboutPage.timeline.milestone4.title'),
                description: t('aboutPage.timeline.milestone4.description'),
                color: 'from-orange-500 to-red-500'
              }
            ].map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="p-8 hover:shadow-2xl transition-all border-2 border-transparent hover:border-gray-200 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${milestone.color}`} />

                  <div className="flex items-start gap-6">
                    <div className="relative inline-flex flex-shrink-0">
                      <div className={`absolute inset-0 opacity-20 rounded-2xl blur-xl bg-gradient-to-r ${milestone.color}`} />
                      <div className={`relative text-4xl font-bold px-6 py-4 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                        {milestone.year}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{milestone.title}</h3>
                      <p className="text-gray-700 text-base leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
