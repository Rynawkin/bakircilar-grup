'use client';

import React from 'react';
import { Header, Footer } from '@bakircilar/ui';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const SiteLayout: React.FC<{ children: React.ReactNode; locale: string }> = ({
  children,
  locale
}) => {
  const pathname = usePathname();
  const t = useTranslations();

  const menuItems = [
    { label: t('nav.home'), href: `/${locale}` },
    { label: t('nav.services'), href: `/${locale}#services` },
    { label: t('nav.about'), href: `/${locale}/about` },
    { label: t('nav.contact'), href: `/${locale}/contact` }
  ];

  const footerSections = [
    {
      title: t('footer.quickLinks'),
      links: [
        { label: t('nav.home'), href: `/${locale}` },
        { label: t('nav.services'), href: `/${locale}#services` },
        { label: 'Bakırcılar Grup', href: 'https://bakircilargrup.com' }
      ]
    },
    {
      title: t('footer.companies'),
      links: [
        { label: 'Bakırcılar Grup', href: 'https://bakircilargrup.com' },
        { label: 'Bakırcılar Yazılım', href: 'https://bakircilaryazilim.com' },
        { label: 'Bakırcılar Danışmanlık', href: 'https://bakircilardanismanlik.com' },
        { label: 'Bakırcılar Emlak', href: 'https://bakircilaremlak.com' }
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
      href: 'https://linkedin.com/company/bakircilar-grup',
      label: 'LinkedIn'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      href: 'https://instagram.com/bakircilargrup',
      label: 'Instagram'
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
              alt="Bakırcılar Otomotiv"
              width={180}
              height={50}
              className="h-12 w-auto"
            />
          </div>
        }
        menuItems={menuItems}
        onLanguageChange={handleLanguageChange}
        currentLanguage={locale}
        brandColor="#ef4444"
      />

      {children}

      <Footer
        logo={
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Bakırcılar Otomotiv"
              width={180}
              height={50}
              className="h-12 w-auto"
            />
          </div>
        }
        description={t('footer.description')}
        sections={footerSections}
        socialLinks={socialLinks}
        companyName="Bakırcılar Otomotiv"
        email="info@bakircilaroto.com"
        phone="+90 XXX XXX XX XX"
        address="Adres bilgisi buraya gelecek"
      />
    </>
  );
};
