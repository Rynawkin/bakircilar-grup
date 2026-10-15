import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ARACLAR, SITE_URL } from "./araclar";

type PageProps = { params: { locale: string } };

export function generateMetadata(): Metadata {
  const url = `${SITE_URL}/tr/hesapla`, title = "Hesapla | Bakırcılar Ambalaj";
  const description = "Havlu, Z havlu ve palet streç tekliflerini kendi rakamlarınızla karşılaştırın. Hesap telefonunuzda yapılır; girdiğiniz rakamlar kaydedilmez.";
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    // Bağlantı paylaşılınca (WhatsApp, Instagram) ana sayfanın kartı değil bu sayfanınki görünsün
    openGraph: { type: "website", url, title, description, siteName: "Bakırcılar Ambalaj", locale: "tr" },
  };
}

export default function HesaplaPage({ params: { locale } }: PageProps) {
  if (locale !== "tr") redirect("/tr/hesapla");
  return (
    <div className="hk">
      <section className="hk-giris">
        <p className="hk-ust-etiket">Metre Metin&apos;in hesap makineleri</p>
        <h1>Hesaplayın, sonra karar verin</h1>
        <p className="hk-aciklama">Teklifleri kendi rakamlarınızla karşılaştırın. Hesap telefonunuzda yapılır; girdiğiniz rakamlar kaydedilmez.</p>
      </section>
      <ul className="hk-liste">
        {Object.entries(ARACLAR).map(([ad, arac]) => (
          <li key={ad}>
            <Link href={`/tr/hesapla/${ad}`}>
              <b>{arac.baslik}</b>
              <span>{arac.ozet}</span>
            </Link>
          </li>
        ))}
      </ul>
      <footer className="hk-alt">
        <p>Sonuçlar yalnız girdiğiniz değerlere göre hesaplanır; ürün kalitesini ölçmez.</p>
      </footer>
    </div>
  );
}
