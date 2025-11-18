'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Card, Button } from '@bakircilar/ui';
import { useTranslations } from 'next-intl';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
}

export default function CareerPage() {
  const t = useTranslations();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    // TODO: Fetch from API
    setJobs([
      {
        id: '1',
        title: 'Yazılım Geliştirici',
        company: 'Bakırcılar Yazılım',
        location: 'İstanbul',
        type: 'Tam Zamanlı',
        description: 'React ve Node.js konusunda deneyimli yazılım geliştiriciler arıyoruz...'
      },
      {
        id: '2',
        title: 'İş Geliştirme Uzmanı',
        company: 'Bakırcılar Grup',
        location: 'Ankara',
        type: 'Tam Zamanlı',
        description: 'Yeni iş fırsatlarını değerlendiren ve geliştiren uzman arıyoruz...'
      },
      {
        id: '3',
        title: 'Ambalaj Tasarımcısı',
        company: 'Bakırcılar Ambalaj',
        location: 'İzmir',
        type: 'Tam Zamanlı',
        description: 'Yaratıcı ambalaj tasarımları yapabilecek tasarımcılar arıyoruz...'
      }
    ]);
    setLoading(false);
  }, []);

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('careerPage.title')}</h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              {t('careerPage.subtitle')}
            </p>
          </motion.div>
        </Container>
      </section>

      <Container>

        {/* Why Join Us */}
        <section className="py-20 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">{t('careerPage.whyJoinUs.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                key: 'careerGrowth',
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'bg-blue-50'
              },
              {
                icon: '💼',
                key: 'workEnvironment',
                color: 'from-purple-500 to-pink-500',
                bgColor: 'bg-purple-50'
              },
              {
                icon: '🎯',
                key: 'projects',
                color: 'from-amber-500 to-orange-500',
                bgColor: 'bg-amber-50'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full p-8 text-center relative overflow-hidden hover:shadow-2xl transition-all border-2 border-transparent hover:border-gray-200">
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${benefit.color}`} />

                  <div className="relative inline-flex mb-6">
                    <div className={`absolute inset-0 opacity-20 rounded-2xl blur-xl bg-gradient-to-r ${benefit.color}`} />
                    <div className={`relative text-5xl p-4 ${benefit.bgColor} rounded-2xl group-hover:scale-110 transition-transform`}>
                      {benefit.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{t(`careerPage.whyJoinUs.${benefit.key}.title`)}</h3>
                  <p className="text-gray-600 leading-relaxed">{t(`careerPage.whyJoinUs.${benefit.key}.description`)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">{t('careerPage.openPositions')}</h2>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="font-medium">{job.company}</span>
                          </span>
                          <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-medium">{job.location}</span>
                          </span>
                          <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">{job.type}</span>
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                      >
                        {t('careerPage.details')}
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Spontaneous Application */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 20px 20px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center relative z-10"
          >
            <div className="inline-block mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto border border-white/30">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('careerPage.spontaneousApplication.title')}</h2>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t('careerPage.spontaneousApplication.subtitle')}
            </p>
            <button className="px-12 py-5 bg-white text-blue-600 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-white/25 hover:scale-105 transition-all">
              {t('careerPage.spontaneousApplication.button')}
            </button>
          </motion.div>
        </section>
      </Container>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedJob(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-2 text-gray-900">{selectedJob.title}</h2>
                <p className="text-blue-600 font-semibold text-lg">{selectedJob.company}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border-l-4 border-blue-600">
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{t('careerPage.jobModal.location')}</span>
                  <p className="text-lg font-bold text-gray-900 mt-1">{selectedJob.location}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-l-4 border-purple-600">
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{t('careerPage.jobModal.type')}</span>
                  <p className="text-lg font-bold text-gray-900 mt-1">{selectedJob.type}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide block mb-3">{t('careerPage.jobModal.description')}</span>
                <p className="text-gray-700 text-lg leading-relaxed">{selectedJob.description}</p>
              </div>
            </div>

            <button
              className="w-full px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              {t('careerPage.jobModal.apply')}
            </button>
          </motion.div>
        </div>
      )}
    </main>
  );
}
