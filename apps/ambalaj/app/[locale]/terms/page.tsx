import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_INFO } from "../../../lib/constants";

const SITE_URL = "https://www.bakircilarambalaj.com";
const OPERATOR = "Necati Uçarer Bakırcılar Ambalaj";
const ADDRESS = CONTACT_INFO.address;
const EMAIL = "info@bakircilarambalaj.com";
const SUPPORTED_LOCALES = ["tr", "en", "de", "es"] as const;

type PageProps = {
  params: { locale: string };
};

export function generateMetadata({ params: { locale } }: PageProps): Metadata {
  const isTurkish = locale === "tr";
  const canonicalLocale = SUPPORTED_LOCALES.includes(
    locale as (typeof SUPPORTED_LOCALES)[number],
  )
    ? locale
    : "tr";

  return {
    title: isTurkish
      ? "Kullanım Koşulları | Bakırcılar Ambalaj"
      : "Website Terms | Bakırcılar Ambalaj",
    description: isTurkish
      ? "Bakırcılar Ambalaj kurumsal internet sitesinin kullanım koşulları."
      : "Terms for using the Bakırcılar Ambalaj corporate website. The Turkish terms are authoritative.",
    alternates: {
      canonical: `${SITE_URL}/${canonicalLocale}/terms`,
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((item) => [item, `${SITE_URL}/${item}/terms`]),
      ),
    },
    robots: { index: true, follow: true },
  };
}

function TermsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-stone-200 py-10 first:border-t-0 first:pt-0">
      <h2 className="font-display text-2xl font-semibold leading-tight text-brand-navy md:text-3xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-base leading-8 text-stone-700">
        {children}
      </div>
    </section>
  );
}

function TurkishTerms({ locale }: { locale: string }) {
  return (
    <>
      <div className="mb-12 bg-brand-sand px-5 py-6 sm:px-7">
        <dl className="grid gap-5 sm:grid-cols-2">
          <div className="min-w-0">
            <dt className="text-sm font-medium text-stone-500">
              Site işletmecisi
            </dt>
            <dd className="mt-1 font-medium text-brand-ink">{OPERATOR}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-sm font-medium text-stone-500">İletişim</dt>
            <dd className="mt-1">
              <a
                className="break-all font-medium text-brand-copper underline underline-offset-4"
                href={`mailto:${EMAIL}`}
              >
                {EMAIL}
              </a>
            </dd>
          </div>
          <div className="min-w-0 sm:col-span-2">
            <dt className="text-sm font-medium text-stone-500">Adres</dt>
            <dd className="mt-1 break-words font-medium text-brand-ink">
              {ADDRESS}
            </dd>
          </div>
        </dl>
      </div>

      <TermsSection title="1. Kapsam ve kabul">
        <p>
          Bu koşullar, <strong>{SITE_URL}</strong> adresindeki Bakırcılar
          Ambalaj kurumsal internet sitesinin kullanımını düzenler. Siteyi
          kullanmanız, yürürlükteki mevzuata ve bu koşullara uygun davranmayı
          kabul ettiğiniz anlamına gelir.
        </p>
        <p>
          Bu site kurumsal tanıtım ve iletişim amacı taşır. Sitede yer alan ürün
          açıklamaları, görseller, kampanya yönlendirmeleri veya diğer içerikler
          tek başına teklif, satış sözleşmesi, stok ya da fiyat garantisi
          oluşturmaz. Bağlayıcı ticari koşullar ayrıca ve açıkça
          kararlaştırılır.
        </p>
      </TermsSection>

      <TermsSection title="2. İçeriğin kullanımı ve doğruluğu">
        <p>
          İçeriklerin güncel ve doğru tutulması amaçlanır; ancak ürün çeşitleri,
          temsil edilen markalar, hizmet kapsamı ve bağlantılı sayfalar zaman
          içinde değişebilir. Belirli bir ürün, teslimat veya ticari koşul için
          bizimle doğrudan iletişime geçerek güncel bilgi almanız gerekir.
        </p>
        <p>
          Site içeriğini hukuka aykırı biçimde kullanamaz; sitenin çalışmasını,
          güvenliğini veya diğer ziyaretçilerin erişimini bozacak otomatik ya da
          manuel girişimlerde bulunamazsınız.
        </p>
      </TermsSection>

      <TermsSection title="3. Fikri mülkiyet">
        <p>
          Aksi açıkça belirtilmedikçe bu sitedeki metinler, özgün görseller,
          grafikler, logo, sayfa düzeni ve diğer içerikler üzerindeki haklar{" "}
          {OPERATOR}'a veya ilgili hak sahiplerine aittir. İçerikler, kişisel
          bilgi edinme amacı dışında; önceden yazılı izin olmadan çoğaltılamaz,
          yayımlanamaz, değiştirilemez veya ticari amaçla kullanılamaz.
        </p>
        <p>
          Üçüncü taraf marka ve logoları ilgili hak sahiplerine aittir; sitede
          yer almaları, hak sahipliği iddiası veya kapsamı açıklanmamış bir
          ortaklık taahhüdü anlamına gelmez.
        </p>
      </TermsSection>

      <TermsSection title="4. Dış bağlantılar ve üçüncü taraf hizmetleri">
        <p>
          Site; kampanya, grup şirketi, harita, e-posta veya WhatsApp gibi
          üçüncü taraf sayfa ve hizmetlerine bağlantı verebilir. Bu sayfa ve
          hizmetlerin içeriği, erişilebilirliği, güvenliği ve veri işleme
          uygulamaları ilgili üçüncü tarafın kendi sorumluluğundadır ve kendi
          koşullarına tabidir.
        </p>
        <p>
          Bir dış bağlantının sunulması, bağlantı verilen tüm içeriklerin
          tarafımızca onaylandığı veya kesintisiz erişim taahhüdü verildiği
          anlamına gelmez.
        </p>
      </TermsSection>

      <TermsSection title="5. Sitenin kullanılabilirliği">
        <p>
          Sitenin güvenli ve kesintisiz çalışması için makul özen gösterilir.
          Bakım, teknik arıza, güvenlik olayı veya kontrolümüz dışındaki
          nedenlerle erişim geçici olarak sınırlandırılabilir. Mevzuatın izin
          vermediği ölçüde sorumluluğu kaldıran veya ziyaretçinin zorunlu
          haklarını sınırlayan bir hüküm uygulanmaz.
        </p>
      </TermsSection>

      <TermsSection title="6. Gizlilik ve kişisel veriler">
        <p>
          Kurumsal site üzerinden işlenen kişisel veriler ve kullanılan teknik
          kayıtlar hakkında ayrıntılı bilgi için{" "}
          <Link
            className="font-medium text-brand-copper underline underline-offset-4"
            href={`/${locale}/privacy`}
          >
            KVKK Aydınlatma Metni ve Gizlilik sayfasını
          </Link>{" "}
          inceleyebilirsiniz.
        </p>
      </TermsSection>

      <TermsSection title="7. Uygulanacak hukuk ve değişiklikler">
        <p>
          Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir. Emredici mevzuat
          hükümleri ve tüketici olarak nitelendirilen ziyaretçilerin zorunlu
          hakları saklıdır.
        </p>
        <p>
          Sitenin işleyişi veya mevzuat değiştiğinde koşullar güncellenebilir.
          Güncel metin yayımlandığı tarihten itibaren geçerli olur. Sorularınızı{" "}
          <a
            className="font-medium text-brand-copper underline underline-offset-4"
            href={`mailto:${EMAIL}`}
          >
            {EMAIL}
          </a>{" "}
          adresine iletebilirsiniz.
        </p>
      </TermsSection>
    </>
  );
}

function InternationalTermsSummary() {
  return (
    <div className="space-y-10">
      <section className="border-t border-stone-200 pt-10">
        <h2 className="font-display text-2xl font-semibold text-brand-navy">
          Authoritative terms
        </h2>
        <p className="mt-5 leading-8 text-stone-700">
          This is a concise English summary. The Turkish terms at{" "}
          <Link
            className="font-medium text-brand-copper underline underline-offset-4"
            href="/tr/terms"
          >
            /tr/terms
          </Link>{" "}
          are authoritative.
        </p>
      </section>

      <section className="border-t border-stone-200 pt-10">
        <h2 className="font-display text-2xl font-semibold text-brand-navy">
          Corporate information only
        </h2>
        <div className="mt-5 space-y-4 leading-8 text-stone-700">
          <p>
            This website is operated by <strong>{OPERATOR}</strong> and is
            intended for corporate information and contact. Product
            descriptions, images or campaign links do not by themselves
            constitute an offer, sales contract, stock commitment or price
            guarantee. Binding commercial terms must be agreed separately.
          </p>
          <p>
            Original site content may not be republished or used commercially
            without permission. Third-party names and logos belong to their
            respective owners.
          </p>
        </div>
      </section>

      <section className="border-t border-stone-200 pt-10">
        <h2 className="font-display text-2xl font-semibold text-brand-navy">
          External services and contact
        </h2>
        <div className="mt-5 space-y-4 leading-8 text-stone-700">
          <p>
            Campaign, map, group-company and WhatsApp links lead to external
            services under their own terms. We take reasonable care to keep this
            site available and accurate, but content and availability may
            change. Mandatory rights under applicable law remain unaffected.
          </p>
          <p>
            Contact:{" "}
            <a
              className="font-medium text-brand-copper underline underline-offset-4"
              href={`mailto:${EMAIL}`}
            >
              {EMAIL}
            </a>{" "}
            — {ADDRESS}
          </p>
          <p>
            For personal-data information, read the{" "}
            <Link
              className="font-medium text-brand-copper underline underline-offset-4"
              href="/tr/privacy"
            >
              authoritative Turkish privacy notice
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

export default function TermsPage({ params: { locale } }: PageProps) {
  const isTurkish = locale === "tr";

  return (
    <main className="bg-white">
      <header className="bg-brand-navy">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-balance font-display text-4xl font-bold leading-[1.08] text-white md:text-5xl">
              {isTurkish ? "Kullanım Koşulları" : "Website Terms"}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
              {isTurkish
                ? "Bakırcılar Ambalaj kurumsal internet sitesini kullanırken geçerli olan temel hükümler."
                : "The core terms that apply when using the Bakırcılar Ambalaj corporate website."}
            </p>
            <p className="mt-7 text-sm font-medium text-brand-copper">
              {isTurkish
                ? "Son güncelleme: 7 Ağustos 2026"
                : "Last updated: 7 August 2026"}
            </p>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-14 md:py-20 lg:px-8">
        {isTurkish ? (
          <TurkishTerms locale={locale} />
        ) : (
          <InternationalTermsSummary />
        )}
      </article>
    </main>
  );
}
