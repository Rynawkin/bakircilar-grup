import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Sora } from 'next/font/google';
import { locales } from '../../i18n';
import { SiteLayout } from '../../components/SiteLayout';
import { CONTACT_INFO } from '../../lib/constants';
import '../globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin', 'latin-ext'], weight: ['500', '600', '700', '800'], variable: '--font-sora', display: 'swap' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Force dynamic rendering for i18n support
export const dynamic = 'force-dynamic';

const localeMetadata: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Bakırcılar Ambalaj | Kurumsal Sarf Tedariki',
    description: 'Ambalaj, temizlik, kâğıt, hijyen, gıda ve ofis sarf ihtiyaçlarını geniş ürün gamı ve güçlü tedarik ilişkileriyle bir araya getiriyoruz.'
  },
  en: {
    title: 'Bakırcılar Ambalaj | Business Supplies',
    description: 'A wholesale supply partner for packaging, cleaning, paper, hygiene, food service and office consumables.'
  },
  de: {
    title: 'Bakırcılar Ambalaj | Gewerblicher Bedarf',
    description: 'Ihr Großhandelspartner für Verpackung, Reinigung, Papier, Hygiene, Gastronomie- und Bürobedarf.'
  },
  es: {
    title: 'Bakırcılar Ambalaj | Suministros para Empresas',
    description: 'Proveedor mayorista de embalaje, limpieza, papel, higiene, hostelería y consumibles de oficina.'
  }
};

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  const current = localeMetadata[locale] ?? localeMetadata.tr;
  const languageLinks = Object.fromEntries(
    locales.map((supportedLocale) => [supportedLocale, `/${supportedLocale}`])
  );

  return {
    metadataBase: new URL(CONTACT_INFO.website),
    title: current.title,
    description: current.description,
    alternates: {
      canonical: `/${locale}`,
      languages: languageLinks
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true }
    },
    openGraph: {
      type: 'website',
      url: `/${locale}`,
      title: current.title,
      description: current.description,
      siteName: CONTACT_INFO.brandName,
      locale
    }
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: CONTACT_INFO.brandName,
    legalName: CONTACT_INFO.legalName,
    url: CONTACT_INFO.website,
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phoneE164,
    foundingDate: '1990',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rasimpaşa Mah., Atatürk Blv. Cami No:5, No:75/A',
      addressLocality: 'Hendek',
      addressRegion: 'Sakarya',
      postalCode: '54300',
      addressCountry: 'TR'
    },
    sameAs: ['https://www.linkedin.com/company/bakircilar-ambalaj']
  };

  return (
    <html lang={locale} className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
        <NextIntlClientProvider messages={messages}>
          <SiteLayout locale={locale}>
            {children}
          </SiteLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
