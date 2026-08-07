'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { CONTACT_INFO, LOCATIONS } from '../../../lib/constants';
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

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactPage() {
  const t = useTranslations();
  const locale = useLocale();

  const methods = [
    { icon: 'mail', title: t('contactPage.email'), value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
    { icon: 'phone', title: t('contactPage.phone'), value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone.replace(/[^\d+]/g, '')}` },
    { icon: 'pin', title: t('contactPage.address'), value: CONTACT_INFO.address, href: null as string | null },
    { icon: 'whatsapp', title: t('contactPage.whatsapp'), value: t('contactPage.whatsappMessage'), href: `https://wa.me/${CONTACT_INFO.whatsapp}` }
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
            <Eyebrow>{t('nav.contact')}</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] text-white md:text-5xl">
              {t('contactPage.title')}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-300">
              {t('contactPage.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact methods */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {methods.map((method) => {
            const inner = (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-copper/10 text-brand-copper">
                  {method.icon === 'whatsapp' ? (
                    <WhatsAppGlyph className="h-6 w-6" />
                  ) : (
                    <Icon name={method.icon} className="h-6 w-6" />
                  )}
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-brand-navy">{method.title}</h3>
                <p className="mt-1 break-words text-sm leading-relaxed text-stone-600">{method.value}</p>
              </>
            );
            return method.href ? (
              <motion.a
                {...fadeUp}
                key={method.title}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group rounded-2xl border border-stone-200/80 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-copper/40 hover:shadow-[0_18px_50px_-20px_rgba(19,41,75,0.25)]"
              >
                {inner}
              </motion.a>
            ) : (
              <motion.div {...fadeUp} key={method.title} className="rounded-2xl border border-stone-200/80 bg-white p-6">
                {inner}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Direct contact + locations */}
      <section className="bg-brand-sand py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-8">
          {/* Direct contact */}
          <motion.div {...fadeUp}>
            <h2 className="font-display text-3xl font-bold text-brand-navy md:text-4xl">
              {t('contactPage.sendMessage')}
            </h2>
            <div className="mt-8 rounded-2xl border border-stone-200/80 bg-white p-8 md:p-10">
              <p className="max-w-xl text-base leading-relaxed text-stone-600">
                {t('contactPage.directContact')}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={`tel:${CONTACT_INFO.phoneE164}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy/90 focus:outline-none focus:ring-2 focus:ring-brand-copper focus:ring-offset-2"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  {CONTACT_INFO.phone}
                </a>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-brand-navy/20 px-5 py-3 text-sm font-semibold text-brand-navy transition hover:border-brand-copper hover:text-brand-copper focus:outline-none focus:ring-2 focus:ring-brand-copper focus:ring-offset-2"
                >
                  <Icon name="mail" className="h-4 w-4" />
                  {CONTACT_INFO.email}
                </a>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-brand-navy/20 px-5 py-3 text-sm font-semibold text-brand-navy transition hover:border-brand-copper hover:text-brand-copper focus:outline-none focus:ring-2 focus:ring-brand-copper focus:ring-offset-2"
                >
                  <WhatsAppGlyph className="h-4 w-4" />
                  {t('contactPage.whatsapp')}
                </a>
              </div>
              <div className="mt-8 border-t border-stone-100 pt-6 text-sm leading-relaxed text-stone-500">
                <p>
                  <span className="font-medium text-brand-navy">{t('contactPage.legalName')}:</span>{' '}
                  {CONTACT_INFO.legalName}
                </p>
                <p className="mt-3">
                  {t('contactPage.legalNotice')}{' '}
                  <Link href={`/${locale}/privacy`} className="font-medium text-brand-navy underline decoration-brand-copper/50 underline-offset-4 hover:text-brand-copper">
                    {t('footer.privacy')}
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Locations + availability note */}
          <motion.div {...fadeUp} className="space-y-6">
            {LOCATIONS.map((loc) => (
              <div key={loc.name} className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white">
                <div className="flex items-start gap-3 p-5">
                  <span className="mt-0.5 text-brand-copper">
                    <Icon name="pin" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-brand-navy">{loc.name}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-stone-600">{loc.address}</p>
                  </div>
                </div>
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(loc.mapsQuery)}&output=embed`}
                  width="100%"
                  height="200"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${loc.name} - Harita`}
                />
              </div>
            ))}

            <div className="rounded-2xl border border-stone-200/80 bg-white p-6">
              <div className="flex items-center gap-2.5">
                <span className="text-brand-copper">
                  <Icon name="clock" className="h-5 w-5" />
                </span>
                <h3 className="font-display text-base font-semibold text-brand-navy">{t('contactPage.workingHours')}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-stone-600">{t('contactPage.hoursNote')}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
