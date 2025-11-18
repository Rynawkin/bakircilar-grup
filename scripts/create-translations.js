const fs = require('fs');
const path = require('path');

const sites = {
  yazilim: {
    tr: {
      nav: {
        home: 'Ana Sayfa',
        services: 'Hizmetlerimiz',
        about: 'Hakkımızda',
        contact: 'İletişim'
      },
      hero: {
        title: 'Bakırcılar Yazılım',
        subtitle: 'Yazılım Geliştirme',
        description: 'Modern teknolojilerle özel yazılım çözümleri ve danışmanlık hizmetleri',
        primaryCTA: 'Hizmetlerimiz',
        secondaryCTA: 'İletişim'
      },
      services: {
        title: 'Hizmetlerimiz',
        subtitle: 'Modern teknolojilerle işinizi dijitale taşıyoruz',
        web: {
          title: 'Web Geliştirme',
          description: 'React, Next.js ve modern teknolojilerle responsive ve hızlı web uygulamaları. SEO uyumlu, kullanıcı dostu arayüzler.',
          feature1: 'React & Next.js',
          feature2: 'SEO Optimizasyonu',
          feature3: 'Mobil Uyumlu'
        },
        mobile: {
          title: 'Mobil Uygulama',
          description: 'iOS ve Android için native ve cross-platform mobil uygulamalar. React Native ve Flutter teknolojileri.',
          feature1: 'iOS & Android',
          feature2: 'Cross-Platform',
          feature3: 'Native Performans'
        },
        cloud: {
          title: 'Bulut Çözümleri',
          description: 'AWS, Google Cloud ve Azure üzerinde ölçeklenebilir, güvenli bulut altyapıları. DevOps ve CI/CD entegrasyonu.',
          feature1: 'AWS & Azure',
          feature2: 'Ölçeklenebilir',
          feature3: 'Güvenli'
        },
        ai: {
          title: 'Yapay Zeka',
          description: 'Machine Learning ve AI entegrasyonları. Veri analizi, doğal dil işleme ve otomasyon çözümleri.',
          feature1: 'Machine Learning',
          feature2: 'NLP',
          feature3: 'Otomasyon'
        }
      },
      features: {
        quality: {
          title: 'Kaliteli Kod',
          description: 'En iyi pratiklerle temiz, sürdürülebilir ve test edilmiş kod yazıyoruz'
        },
        support: {
          title: '7/24 Destek',
          description: 'Projeleriniz için kesintisiz teknik destek ve bakım hizmeti sağlıyoruz'
        },
        delivery: {
          title: 'Zamanında Teslimat',
          description: 'Agile metodoloji ile hızlı ve kaliteli proje teslimi garanti ediyoruz'
        }
      },
      cta: {
        title: 'Yazılım Projeniz İçin Bize Ulaşın',
        subtitle: 'Deneyimli ekibimiz size en uygun çözümü sunmaya hazır',
        button: 'İletişime Geçin'
      },
      footer: {
        description: 'Modern yazılım çözümleri ve danışmanlık ile işinizi dijitale taşıyoruz.',
        quickLinks: 'Hızlı Bağlantılar',
        companies: 'Şirketlerimiz',
        rights: 'Tüm hakları saklıdır'
      }
    },
    en: {
      nav: {
        home: 'Home',
        services: 'Our Services',
        about: 'About Us',
        contact: 'Contact'
      },
      hero: {
        title: 'Bakırcılar Software',
        subtitle: 'Software Development',
        description: 'Custom software solutions and consulting services with modern technologies',
        primaryCTA: 'Our Services',
        secondaryCTA: 'Contact'
      },
      services: {
        title: 'Our Services',
        subtitle: 'We digitalize your business with modern technologies',
        web: {
          title: 'Web Development',
          description: 'Responsive and fast web applications with React, Next.js and modern technologies. SEO-friendly, user-friendly interfaces.',
          feature1: 'React & Next.js',
          feature2: 'SEO Optimization',
          feature3: 'Mobile Responsive'
        },
        mobile: {
          title: 'Mobile Application',
          description: 'Native and cross-platform mobile applications for iOS and Android. React Native and Flutter technologies.',
          feature1: 'iOS & Android',
          feature2: 'Cross-Platform',
          feature3: 'Native Performance'
        },
        cloud: {
          title: 'Cloud Solutions',
          description: 'Scalable, secure cloud infrastructures on AWS, Google Cloud and Azure. DevOps and CI/CD integration.',
          feature1: 'AWS & Azure',
          feature2: 'Scalable',
          feature3: 'Secure'
        },
        ai: {
          title: 'Artificial Intelligence',
          description: 'Machine Learning and AI integrations. Data analysis, natural language processing and automation solutions.',
          feature1: 'Machine Learning',
          feature2: 'NLP',
          feature3: 'Automation'
        }
      },
      features: {
        quality: {
          title: 'Quality Code',
          description: 'We write clean, maintainable and tested code with best practices'
        },
        support: {
          title: '24/7 Support',
          description: 'We provide continuous technical support and maintenance service for your projects'
        },
        delivery: {
          title: 'On-Time Delivery',
          description: 'We guarantee fast and quality project delivery with Agile methodology'
        }
      },
      cta: {
        title: 'Contact Us for Your Software Project',
        subtitle: 'Our experienced team is ready to offer you the most suitable solution',
        button: 'Get in Touch'
      },
      footer: {
        description: 'We digitalize your business with modern software solutions and consulting.',
        quickLinks: 'Quick Links',
        companies: 'Our Companies',
        rights: 'All rights reserved'
      }
    }
  }
};

// Create yazilim translations
const yazilimPath = path.join(__dirname, '../apps/yazilim/messages');
fs.mkdirSync(yazilimPath, { recursive: true });

// Create TR
fs.writeFileSync(
  path.join(yazilimPath, 'tr.json'),
  JSON.stringify(sites.yazilim.tr, null, 2)
);

// Create EN
fs.writeFileSync(
  path.join(yazilimPath, 'en.json'),
  JSON.stringify(sites.yazilim.en, null, 2)
);

// Create DE (auto-translate from EN with German translations)
const deTrans = JSON.parse(JSON.stringify(sites.yazilim.en));
deTrans.nav = {
  home: 'Startseite',
  services: 'Unsere Dienstleistungen',
  about: 'Über Uns',
  contact: 'Kontakt'
};
deTrans.hero.title = 'Bakırcılar Software';
deTrans.hero.subtitle = 'Softwareentwicklung';
deTrans.hero.description = 'Maßgeschneiderte Softwarelösungen und Beratungsdienstleistungen mit modernen Technologien';
deTrans.hero.primaryCTA = 'Unsere Dienstleistungen';
deTrans.hero.secondaryCTA = 'Kontakt';
deTrans.footer.quickLinks = 'Schnellzugriff';
deTrans.footer.companies = 'Unsere Unternehmen';
deTrans.footer.rights = 'Alle Rechte vorbehalten';

fs.writeFileSync(
  path.join(yazilimPath, 'de.json'),
  JSON.stringify(deTrans, null, 2)
);

// Create ES
const esTrans = JSON.parse(JSON.stringify(sites.yazilim.en));
esTrans.nav = {
  home: 'Inicio',
  services: 'Nuestros Servicios',
  about: 'Sobre Nosotros',
  contact: 'Contacto'
};
esTrans.hero.title = 'Bakırcılar Software';
esTrans.hero.subtitle = 'Desarrollo de Software';
esTrans.hero.description = 'Soluciones de software personalizadas y servicios de consultoría con tecnologías modernas';
esTrans.hero.primaryCTA = 'Nuestros Servicios';
esTrans.hero.secondaryCTA = 'Contacto';
esTrans.footer.quickLinks = 'Enlaces Rápidos';
esTrans.footer.companies = 'Nuestras Empresas';
esTrans.footer.rights = 'Todos los derechos reservados';

fs.writeFileSync(
  path.join(yazilimPath, 'es.json'),
  JSON.stringify(esTrans, null, 2)
);

console.log('✅ Translation files created successfully for yazilim!');
