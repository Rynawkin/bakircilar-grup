import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { HesapAraci } from "../../../../components/HesapAraci";
import { ARACLAR, SITE_URL, aracMi } from "../araclar";

type PageProps = { params: { locale: string; arac: string } };

export function generateMetadata({ params: { arac } }: PageProps): Metadata {
  if (!aracMi(arac)) return {};
  const url = `${SITE_URL}/tr/hesapla/${arac}`, title = `${ARACLAR[arac].baslik} | Bakırcılar Ambalaj`, description = ARACLAR[arac].ozet;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    // Bağlantı paylaşılınca (WhatsApp, Instagram) ana sayfanın kartı değil bu aracın kartı görünsün
    openGraph: { type: "website", url, title, description, siteName: "Bakırcılar Ambalaj", locale: "tr" },
  };
}

export default function AracSayfasi({ params: { locale, arac } }: PageProps) {
  if (!aracMi(arac)) notFound();
  if (locale !== "tr") redirect(`/tr/hesapla/${arac}`);
  return (
    <>
      <nav className="hk-iz" aria-label="Sayfa yolu">
        <Link href="/tr/hesapla">← Tüm hesap makineleri</Link>
      </nav>
      <HesapAraci dosya={ARACLAR[arac].dosya} nesne={ARACLAR[arac].nesne} />
    </>
  );
}
