import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Sora } from 'next/font/google';
import { locales } from '../../i18n';
import { SiteLayout } from '../../components/SiteLayout';
import '../globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin', 'latin-ext'], weight: ['500', '600', '700', '800'], variable: '--font-sora', display: 'swap' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Force dynamic rendering for i18n support
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Bakırcılar Ambalaj | Ambalaj Çözümleri',
  description: 'Bakırcılar Ambalaj - Modern ambalaj çözümleri ve üretimi',
};

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

  return (
    <html lang={locale} className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <SiteLayout locale={locale}>
            {children}
          </SiteLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
