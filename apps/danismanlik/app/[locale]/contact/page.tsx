'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container, ContactForm, Card } from '@bakircilar/ui';
import { CONTACT_INFO } from '../../../lib/constants';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations();

  const handleSubmit = async (data: any) => {
    // API call to backend
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: t('contactPage.email'),
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: t('contactPage.phone'),
      value: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone}`,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t('contactPage.address'),
      value: CONTACT_INFO.address,
      href: '#',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      title: t('contactPage.whatsapp'),
      value: t('contactPage.whatsappMessage'),
      href: `https://wa.me/${CONTACT_INFO.whatsapp}`,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500'
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-purple-700 via-purple-800 to-pink-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block mb-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto border-2 border-white/30">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('contactPage.title')}</h1>
            <p className="text-xl md:text-2xl text-purple-100 leading-relaxed">
              {t('contactPage.subtitle')}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4">
              <span className="text-purple-600 font-bold text-sm uppercase tracking-widest bg-purple-50 px-6 py-2 rounded-full border-2 border-purple-200">
                İletişim Kanalları
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Bize Ulaşın
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Size en uygun iletişim kanalını seçerek bize kolayca ulaşabilirsiniz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="p-8 text-center h-full relative overflow-hidden border-2 border-transparent hover:border-gray-200 transition-all hover:shadow-2xl bg-white">
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${method.color}`} />

                  <div className="relative inline-flex mb-6">
                    <div className={`absolute inset-0 opacity-20 rounded-2xl blur-2xl bg-gradient-to-r ${method.color}`} />
                    <div className={`relative ${method.bgColor} text-white p-5 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {method.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:scale-105 transition-transform">{method.title}</h3>
                  <p className="text-base text-gray-700 font-medium break-words">{method.value}</p>
                </Card>
              </motion.a>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t('contactPage.sendMessage')}</h2>
                <p className="text-lg text-gray-600">
                  Formu doldurarak bize mesaj gönderebilirsiniz. En kısa sürede size dönüş yapacağız.
                </p>
              </div>
              <Card className="p-8 md:p-10 border-2 border-gray-100 hover:border-purple-200 transition-all hover:shadow-2xl">
                <ContactForm
                  onSubmit={handleSubmit}
                  labels={{
                    name: t('contactForm.name'),
                    email: t('contactForm.email'),
                    phone: t('contactForm.phone'),
                    subject: t('contactForm.subject'),
                    message: t('contactForm.message'),
                    submit: t('contactForm.submit'),
                    submitting: t('contactForm.submitting'),
                    success: t('contactForm.success'),
                    error: t('contactForm.error')
                  }}
                />
              </Card>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map Placeholder */}
              <Card className="h-96 overflow-hidden border-2 border-gray-100 hover:border-purple-200 transition-all">
                <div className="w-full h-full bg-gradient-to-br from-purple-50 via-purple-100 to-pink-100 flex items-center justify-center relative group">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(147, 51, 234, 0.5) 2px, transparent 0)',
                      backgroundSize: '50px 50px'
                    }} />
                  </div>
                  <div className="relative text-center p-8">
                    <div className="inline-block mb-4 relative">
                      <div className="absolute inset-0 bg-purple-500 opacity-20 rounded-full blur-2xl animate-pulse" />
                      <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-purple-700 font-bold text-lg">{t('contactPage.mapPlaceholder')}</p>
                    <p className="text-purple-600 text-sm mt-2">Google Maps entegrasyonu</p>
                  </div>
                </div>
              </Card>

              {/* Working Hours */}
              <Card className="p-8 border-2 border-transparent hover:border-purple-200 transition-all hover:shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500" />

                <div className="flex items-center gap-3 mb-6">
                  <div className="relative inline-flex">
                    <div className="absolute inset-0 bg-purple-500 opacity-20 rounded-xl blur-xl" />
                    <div className="relative bg-purple-500 text-white p-3 rounded-xl group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Çalışma Saatlerimiz</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-bold text-gray-900">Hafta İçi:</span>
                    <span className="text-purple-600 font-semibold">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-bold text-gray-900">Cumartesi:</span>
                    <span className="text-purple-600 font-semibold">09:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-bold text-gray-900">Pazar:</span>
                    <span className="text-red-600 font-semibold">Kapalı</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>
    </main>
  );
}
