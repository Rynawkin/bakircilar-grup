'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Card } from '@bakircilar/ui';
import { useTranslations } from 'next-intl';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export default function NewsPage() {
  const t = useTranslations();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch from API
    // Placeholder data for now
    setNews([
      {
        id: '1',
        title: 'Bakırcılar Grup Yeni Yatırımını Duyurdu',
        excerpt: 'Holding bünyesine yeni bir şirket daha katılıyor...',
        image: '/images/news/1.jpg',
        date: '2024-01-15',
        category: 'Kurumsal'
      },
      {
        id: '2',
        title: 'Bakırcılar Yazılım Uluslararası Projede',
        excerpt: 'Avrupa pazarına açılan şirketimiz önemli bir projeye imza attı...',
        image: '/images/news/2.jpg',
        date: '2024-01-10',
        category: 'Yazılım'
      },
      {
        id: '3',
        title: 'Sürdürülebilirlik Raporu Yayınlandı',
        excerpt: 'Çevre ve toplum sorumluluk projelerimizin detaylarını paylaştık...',
        image: '/images/news/3.jpg',
        date: '2024-01-05',
        category: 'Sürdürülebilirlik'
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('newsPage.title')}</h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              {t('newsPage.subtitle')}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* News Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <Container>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-200 group">
                    {/* Image Placeholder */}
                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 h-56 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
                          backgroundSize: '40px 40px'
                        }} />
                      </div>
                      <svg className="w-20 h-20 text-blue-400 relative z-10 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>

                    <div className="p-6">
                      {/* Category & Date */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                          {item.category}
                        </span>
                        <span className="text-sm text-gray-500 font-medium flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(item.date).toLocaleDateString('tr-TR')}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-3 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{item.excerpt}</p>

                      {/* Read More */}
                      <a
                        href={`/news/${item.id}`}
                        className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all group-hover:text-blue-700"
                      >
                        {t('newsPage.readMore')}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && news.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center mt-16"
            >
              <div className="flex space-x-3">
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-colors">
                  1
                </button>
                <button className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all border-2 border-gray-200">
                  2
                </button>
                <button className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all border-2 border-gray-200">
                  3
                </button>
              </div>
            </motion.div>
          )}
        </Container>
      </section>
    </main>
  );
}
