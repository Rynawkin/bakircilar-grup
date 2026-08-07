import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_INFO } from "../../../lib/constants";

const SITE_URL = "https://www.bakircilarambalaj.com";
const DATA_CONTROLLER = "Necati Uçarer Bakırcılar Ambalaj";
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
      ? "KVKK Aydınlatma Metni ve Gizlilik | Bakırcılar Ambalaj"
      : "Privacy Notice | Bakırcılar Ambalaj",
    description: isTurkish
      ? "Bakırcılar Ambalaj kurumsal internet sitesi için kişisel verilerin işlenmesine ilişkin KVKK aydınlatma metni."
      : "Privacy summary for the Bakırcılar Ambalaj corporate website. The Turkish notice is authoritative.",
    alternates: {
      canonical: `${SITE_URL}/${canonicalLocale}/privacy`,
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((item) => [item, `${SITE_URL}/${item}/privacy`]),
      ),
    },
    robots: { index: true, follow: true },
  };
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-stone-200 py-10 first:border-t-0 first:pt-0"
    >
      <h2 className="font-display text-2xl font-semibold leading-tight text-brand-navy md:text-3xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-base leading-8 text-stone-700">
        {children}
      </div>
    </section>
  );
}

function TurkishNotice({ locale }: { locale: string }) {
  const navigation = [
    ["controller", "Veri sorumlusu"],
    ["data", "İşlenen veriler"],
    ["purpose", "Amaç ve hukuki sebepler"],
    ["transfer", "Aktarım ve yurt dışı"],
    ["cookies", "Çerezler ve teknik kayıtlar"],
    ["retention", "Saklama ve güvenlik"],
    ["rights", "Haklarınız ve başvuru"],
  ];

  return (
    <>
      <nav
        aria-label="Aydınlatma metni içeriği"
        className="border-y border-stone-200 py-6"
      >
        <p className="font-display text-sm font-semibold text-brand-navy">
          Sayfa içeriği
        </p>
        <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {navigation.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="inline-flex py-1 text-sm font-medium text-stone-600 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-brand-copper focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-copper"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-12">
        <Section id="controller" title="1. Veri sorumlusu">
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) bakımından
            bu kurumsal internet sitesinde işlenen kişisel verilerin veri
            sorumlusu <strong>{DATA_CONTROLLER}</strong>'dır.
          </p>
          <dl className="grid gap-5 bg-brand-sand px-5 py-6 sm:grid-cols-2 sm:px-7">
            <div className="min-w-0">
              <dt className="text-sm font-medium text-stone-500">Adres</dt>
              <dd className="mt-1 break-words font-medium text-brand-ink">
                {ADDRESS}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-sm font-medium text-stone-500">E-posta</dt>
              <dd className="mt-1">
                <a
                  className="break-all font-medium text-brand-copper underline underline-offset-4 hover:text-brand-copper-dark focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-copper"
                  href={`mailto:${EMAIL}`}
                >
                  {EMAIL}
                </a>
              </dd>
            </div>
          </dl>
        </Section>

        <Section id="data" title="2. Hangi kişisel verileri işliyoruz?">
          <p>
            Kurumsal site kapsamında, kullandığınız kanala göre aşağıdaki
            sınırlı veriler işlenebilir:
          </p>
          <ul className="list-disc space-y-3 pl-6 marker:text-brand-copper">
            <li>
              <strong>İletişim verileri:</strong> E-posta, telefon veya sizin
              başlattığınız WhatsApp görüşmesi sırasında tarafımıza ilettiğiniz
              ad, iletişim bilgileri, mesaj içeriği ve yazışma bilgileri.
            </li>
            <li>
              <strong>İşlem güvenliği verileri:</strong> IP adresi, istek
              zamanı, ziyaret edilen sayfa, tarayıcı/cihaz türüne ilişkin
              sınırlı teknik bilgiler ile hata ve güvenlik kayıtları.
            </li>
            <li>
              <strong>Tercih bilgisi:</strong> Sitenin doğru dilde sunulabilmesi
              için seçtiğiniz dil/yerel ayar bilgisi.
            </li>
          </ul>
          <p>
            Yazışma ve görüşmelerde özel nitelikli kişisel veri veya talebiniz
            için gerekli olmayan üçüncü kişilere ait bilgi göndermemenizi rica
            ederiz.
          </p>
        </Section>

        <Section
          id="purpose"
          title="3. İşleme amaçları, yöntemleri ve hukuki sebepler"
        >
          <p>
            Veriler; e-posta, telefon veya sizin başlattığınız WhatsApp
            yazışmaları sırasında tarafınızca iletilmesi yoluyla doğrudan, site
            güvenliği kayıtları ve dil tercihi çerezi üzerinden ise otomatik
            yollarla elde edilebilir.
          </p>
          <p>Bu veriler yalnızca aşağıdaki amaçlarla işlenir:</p>
          <ul className="list-disc space-y-3 pl-6 marker:text-brand-copper">
            <li>
              Talep, soru ve teklif görüşmelerini yanıtlamak ve iletişimi
              sürdürmek,
            </li>
            <li>
              Talep edilen ürün veya hizmete ilişkin sözleşme öncesi süreçleri
              yürütmek,
            </li>
            <li>
              Kurumsal sitenin güvenli, kararlı ve tercih ettiğiniz dilde
              çalışmasını sağlamak,
            </li>
            <li>
              Mevzuattan doğan yükümlülükleri yerine getirmek ve bir hakkı tesis
              etmek, kullanmak veya korumak.
            </li>
          </ul>
          <p>
            İşleme faaliyetleri, niteliğine göre KVKK'nın 5. maddesindeki{" "}
            <em>sözleşmenin kurulması veya ifası için gerekli olma</em>,{" "}
            <em>hukuki yükümlülüğün yerine getirilmesi</em>,{" "}
            <em>bir hakkın tesisi, kullanılması veya korunması</em> ve temel
            haklarınıza zarar vermemek kaydıyla
            <em> meşru menfaat</em> işleme şartlarına dayanır.
          </p>
        </Section>

        <Section
          id="transfer"
          title="4. Alıcı grupları ve yurt dışı bağlantılı hizmetler"
        >
          <p>
            Verileriniz, amaçla sınırlı ve gerekli olduğu ölçüde yetkili
            çalışanlara; barındırma, bilgi teknolojileri ve güvenlik hizmeti
            sunan tedarikçilere; iletişimi yürütmek için e-posta altyapısı
            sağlayıcılarına; hukuki veya mali danışmanlara ve kanunen yetkili
            kamu kurumlarına aktarılabilir.
          </p>
          <p>
            WhatsApp üzerinden bize yazmayı seçerseniz mesajınız, telefon
            numaranız ve uygulamanın oluşturduğu teknik kayıtlar WhatsApp
            hizmeti üzerinden iletilir. İletişim sayfasındaki gömülü harita
            görüntülendiğinde de harita hizmeti sağlayıcısıyla teknik bağlantı
            kurulabilir. Bu dış hizmetlerin veri işleme faaliyetleri kendi koşul
            ve gizlilik metinlerine tabidir.
          </p>
          <p>
            Barındırma, e-posta veya mesajlaşma hizmetinin teknik altyapısına
            bağlı olarak kişisel veriler yurt dışındaki sistemlerde işlenebilir
            ya da bu sistemlere iletilebilir. Böyle bir aktarım gündeme
            geldiğinde KVKK'nın 9. maddesindeki uygulanabilir aktarım
            şartlarının ayrıca sağlanması gerekir. Bu metin, herhangi bir dış
            sağlayıcının verileri yalnızca Türkiye'de tuttuğu veya belirli bir
            aktarım güvencesini kendiliğinden sunduğu yönünde garanti vermez.
          </p>
        </Section>

        <Section id="cookies" title="5. Çerezler, analitik ve sunucu kayıtları">
          <p>
            Site, seçtiğiniz dili hatırlamak ve sayfaları doğru yerel ayarda
            göstermek için gerekli bir dil tercihi çerezi kullanabilir. Bu çerez
            reklam, yeniden hedefleme veya kullanıcı profili oluşturma amacı
            taşımaz.
          </p>
          <p>
            Bu kurumsal sitede reklam amaçlı izleme veya davranışsal pazarlama
            analitiği kullanılmamaktadır. Bununla birlikte barındırma altyapısı;
            hizmetin sunulması, hata teşhisi ve kötüye kullanımın önlenmesi için
            IP adresi ve istek bilgilerini içeren sınırlı sunucu/güvenlik
            kayıtları tutabilir.
          </p>
          <p>
            Tarayıcı ayarlarınızdan çerezleri silebilir veya
            engelleyebilirsiniz. Gerekli dil çerezini engellemeniz hâlinde site
            dil tercihinizi sonraki ziyarette hatırlamayabilir.
          </p>
        </Section>

        <Section id="retention" title="6. Saklama, silme ve güvenlik">
          <p>
            Kişisel veriler; ilgili iletişim veya talep süreci için gerekli
            olduğu süreyle ve sonrasında uygulanabilir yasal saklama, zamanaşımı
            ve ispat süreleriyle sınırlı olarak tutulur. Sunucu ve güvenlik
            kayıtları, teknik işletim ve güvenlik amacı için gerekli olan
            sınırlı süre boyunca saklanır. Amaç ve hukuki saklama gereği ortadan
            kalktığında veriler silinir, yok edilir veya anonim hâle getirilir.
          </p>
          <p>
            Yetkisiz erişim, kayıp ve kötüye kullanım risklerini azaltmak için
            erişim sınırlaması ve uygun teknik/idari önlemler uygulanır.
            İnternet üzerinden veri iletiminin mutlak biçimde risksiz olduğuna
            dair garanti verilemez.
          </p>
        </Section>

        <Section
          id="rights"
          title="7. KVKK kapsamındaki haklarınız ve başvuru yolu"
        >
          <p>KVKK'nın 11. maddesi uyarınca veri sorumlusuna başvurarak:</p>
          <ul className="list-disc space-y-3 pl-6 marker:text-brand-copper">
            <li>
              Kişisel verinizin işlenip işlenmediğini öğrenme ve işlenmişse
              bilgi talep etme,
            </li>
            <li>
              İşleme amacını ve verilerin amaca uygun kullanılıp
              kullanılmadığını öğrenme,
            </li>
            <li>
              Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü
              kişileri bilme,
            </li>
            <li>Eksik veya yanlış işlenen verilerin düzeltilmesini isteme,</li>
            <li>
              Kanuni şartları varsa silinmesini veya yok edilmesini ve bu
              işlemlerin aktarılan üçüncü kişilere bildirilmesini isteme,
            </li>
            <li>
              Otomatik sistemlerce analiz sonucunun aleyhinize çıkmasına itiraz
              etme,
            </li>
            <li>
              Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın
              giderilmesini talep etme
            </li>
          </ul>
          <p>
            talebinde bulunabilirsiniz. Başvurunuzu kimliğinizi ve talebinizi
            doğrulamaya yeterli bilgilerle birlikte{" "}
            <a
              className="font-medium text-brand-copper underline underline-offset-4 hover:text-brand-copper-dark"
              href={`mailto:${EMAIL}`}
            >
              {EMAIL}
            </a>{" "}
            adresine veya yukarıdaki posta adresine iletebilirsiniz. Başvurular
            KVKK ve ilgili başvuru usulleri çerçevesinde değerlendirilir.
          </p>
        </Section>

        <Section id="updates" title="8. Metindeki değişiklikler">
          <p>
            Sitenin işleyişi veya veri işleme faaliyetleri değişirse bu metin
            güncellenebilir. Güncel sürüm her zaman bu sayfada yayımlanır.
            Kurumsal sitenin kullanımına ilişkin hükümler için{" "}
            <Link
              className="font-medium text-brand-copper underline underline-offset-4 hover:text-brand-copper-dark"
              href={`/${locale}/terms`}
            >
              Kullanım Koşulları'nı
            </Link>{" "}
            inceleyebilirsiniz.
          </p>
        </Section>
      </div>
    </>
  );
}

function InternationalSummary() {
  return (
    <div className="space-y-10">
      <section className="border-t border-stone-200 pt-10">
        <h2 className="font-display text-2xl font-semibold text-brand-navy">
          Authoritative notice
        </h2>
        <p className="mt-5 leading-8 text-stone-700">
          This is a concise English summary for visitors using a non-Turkish
          locale. The full Turkish notice is the authoritative version. You can
          read it at{" "}
          <Link
            className="font-medium text-brand-copper underline underline-offset-4"
            href="/tr/privacy"
          >
            /tr/privacy
          </Link>
          .
        </p>
      </section>

      <section className="border-t border-stone-200 pt-10">
        <h2 className="font-display text-2xl font-semibold text-brand-navy">
          Who controls your data?
        </h2>
        <div className="mt-5 space-y-3 leading-8 text-stone-700">
          <p>
            <strong>{DATA_CONTROLLER}</strong>
          </p>
          <p>{ADDRESS}</p>
          <p>
            <a
              className="break-all font-medium text-brand-copper underline underline-offset-4"
              href={`mailto:${EMAIL}`}
            >
              {EMAIL}
            </a>
          </p>
        </div>
      </section>

      <section className="border-t border-stone-200 pt-10">
        <h2 className="font-display text-2xl font-semibold text-brand-navy">
          What the corporate website processes
        </h2>
        <div className="mt-5 space-y-4 leading-8 text-stone-700">
          <p>
            If you contact us by email, telephone or a WhatsApp conversation
            that you start, we may process the name, contact details and message
            information that you choose to provide. The website also uses a
            locale preference cookie and limited hosting/security logs such as
            IP address, request time, requested page and technical browser or
            device information. No advertising tracking or behavioural marketing
            analytics is used.
          </p>
          <p>
            We use this information to answer enquiries, discuss requested
            products or services, operate and secure the website, remember your
            language and comply with legal obligations.
          </p>
        </div>
      </section>

      <section className="border-t border-stone-200 pt-10">
        <h2 className="font-display text-2xl font-semibold text-brand-navy">
          Service providers and international processing
        </h2>
        <div className="mt-5 space-y-4 leading-8 text-stone-700">
          <p>
            Hosting, email, security, map and WhatsApp services may process data
            outside Türkiye depending on their technical infrastructure.
            Choosing WhatsApp or loading an embedded map also connects you to
            the relevant external service under its own terms. This notice does
            not promise that an external provider stores data only in Türkiye or
            automatically provides a particular transfer safeguard.
          </p>
          <p>
            You may request access, information, correction, deletion where
            legally available, objection to certain automated results, or
            compensation for unlawful processing under Article 11 of the KVKK.
            Contact us at{" "}
            <a
              className="font-medium text-brand-copper underline underline-offset-4"
              href={`mailto:${EMAIL}`}
            >
              {EMAIL}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

export default function PrivacyPage({ params: { locale } }: PageProps) {
  const isTurkish = locale === "tr";

  return (
    <main className="bg-white">
      <header className="bg-brand-navy">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-balance font-display text-4xl font-bold leading-[1.08] text-white md:text-5xl">
              {isTurkish
                ? "KVKK Aydınlatma Metni ve Gizlilik"
                : "Privacy Notice"}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
              {isTurkish
                ? "Kurumsal internet sitemizi ziyaret ettiğinizde veya bizimle iletişime geçtiğinizde kişisel verilerin nasıl işlendiğini açıklar."
                : "How personal data is handled when you visit our corporate website or contact us."}
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
          <TurkishNotice locale={locale} />
        ) : (
          <InternationalSummary />
        )}
      </article>
    </main>
  );
}
