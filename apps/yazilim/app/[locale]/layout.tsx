import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../i18n';
import { SiteLayout } from '../../components/SiteLayout';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Force dynamic rendering for i18n support
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Bakırcılar Yazılım | Yazılım Geliştirme',
  description: 'Bakırcılar Yazılım - Modern yazılım çözümleri ve danışmanlık',
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
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SiteLayout locale={locale}>
            {children}
          </SiteLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
