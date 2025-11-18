import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../i18n';
import { MainLayout } from '@/components/MainLayout';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Bakırcılar Grup | Ana Sayfa',
  description: 'Bakırcılar Grup - Çok sektörlü holding şirketi',
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
          <MainLayout locale={locale}>
            {children}
          </MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
