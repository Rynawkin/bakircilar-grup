import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../i18n';
import { SiteLayout } from '@/components/SiteLayout';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Bakırcılar Danışmanlık | İş Danışmanlığı',
  description: 'Bakırcılar Danışmanlık - Stratejik planlama ve iş geliştirme',
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
