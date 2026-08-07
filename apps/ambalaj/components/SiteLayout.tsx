'use client';

import React from 'react';
import { Header, Footer } from '@bakircilar/ui';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { CONTACT_INFO, CAMPAIGN_URL } from '../lib/constants';

export const SiteLayout: React.FC<{ children: React.ReactNode; locale: string }> = ({
  children,
  locale
}) => {
  const pathname = usePathname();
  const t = useTranslations();

  const menuItems = [
    { label: t('nav.home'), href: `/${locale}` },
    { label: t('nav.products'), href: `/${locale}#products` },
    { label: t('nav.about'), href: `/${locale}/about` },
    { label: t('nav.contact'), href: `/${locale}/contact` },
    { label: t('campaign.label'), href: CAMPAIGN_URL, external: true }
  ];

  const footerSections = [
    {
      title: t('footer.quickLinks'),
      links: [
        { label: t('nav.home'), href: `/${locale}` },
        { label: t('nav.products'), href: `/${locale}#products` },
        { label: t('campaign.label'), href: CAMPAIGN_URL }
      ]
    },
    {
      title: t('footer.corporate'),
      links: [
        { label: t('nav.about'), href: `/${locale}/about` },
        { label: t('nav.contact'), href: `/${locale}/contact` },
        { label: t('footer.privacy'), href: `/${locale}/privacy` },
        { label: t('footer.terms'), href: `/${locale}/terms` }
      ]
    }
  ];

  const socialLinks = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      href: 'https://www.linkedin.com/company/bakircilar-ambalaj',
      label: 'LinkedIn'
    }
  ];

  const handleLanguageChange = (lang: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    window.location.href = `/${lang}${currentPath}`;
  };

  return (
    <>
      <Header
        logo={
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Bakırcılar Ambalaj"
              width={180}
              height={50}
              className="h-12 w-auto"
            />
          </div>
        }
        menuItems={menuItems}
        onLanguageChange={handleLanguageChange}
        currentLanguage={locale}
        brandColor="#3b82f6"
      />

      {children}

      <Footer
        logo={
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Bakırcılar Ambalaj"
              width={180}
              height={50}
              className="h-12 w-auto"
            />
          </div>
        }
        description={t('footer.description')}
        sections={footerSections}
        socialLinks={socialLinks}
        companyName="Bakırcılar Ambalaj"
        email={CONTACT_INFO.email}
        phone={CONTACT_INFO.phone}
        address={CONTACT_INFO.address}
      />
    </>
  );
};
