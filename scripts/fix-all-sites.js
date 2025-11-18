const fs = require('fs');
const path = require('path');

// Site configurations
const sites = {
  yazilim: {
    name: 'Bakırcılar Yazılım',
    nameEn: 'Bakırcılar Software',
    icon: 'Y',
    color: '#8b5cf6', // purple
    services: [
      {
        icon: '💻',
        keyTr: 'web',
        titleTr: 'Web Geliştirme',
        titleEn: 'Web Development',
        descTr: 'React, Next.js ve modern teknolojilerle responsive ve hızlı web uygulamaları. SEO uyumlu, kullanıcı dostu arayüzler.',
        descEn: 'Responsive and fast web applications with React, Next.js and modern technologies. SEO-friendly, user-friendly interfaces.',
        features: ['React & Next.js', 'SEO', 'Responsive']
      },
      {
        icon: '📱',
        keyTr: 'mobile',
        titleTr: 'Mobil Uygulama',
        titleEn: 'Mobile Application',
        descTr: 'iOS ve Android için native ve cross-platform mobil uygulamalar. React Native ve Flutter teknolojileri.',
        descEn: 'Native and cross-platform mobile applications for iOS and Android. React Native and Flutter technologies.',
        features: ['iOS & Android', 'Cross-Platform', 'Native']
      },
      {
        icon: '☁️',
        keyTr: 'cloud',
        titleTr: 'Bulut Çözümleri',
        titleEn: 'Cloud Solutions',
        descTr: 'AWS, Google Cloud ve Azure üzerinde ölçeklenebilir, güvenli bulut altyapıları. DevOps ve CI/CD.',
        descEn: 'Scalable, secure cloud infrastructures on AWS, Google Cloud and Azure. DevOps and CI/CD.',
        features: ['AWS & Azure', 'Scalable', 'Secure']
      },
      {
        icon: '🤖',
        keyTr: 'ai',
        titleTr: 'Yapay Zeka',
        titleEn: 'Artificial Intelligence',
        descTr: 'Machine Learning ve AI entegrasyonları. Veri analizi, doğal dil işleme ve otomasyon.',
        descEn: 'Machine Learning and AI integrations. Data analysis, natural language processing and automation.',
        features: ['ML', 'NLP', 'Automation']
      }
    ]
  },
  danismanlik: {
    name: 'Bakırcılar Danışmanlık',
    nameEn: 'Bakırcılar Consulting',
    icon: 'D',
    color: '#9333ea', // purple-600
    services: [
      {
        icon: '📊',
        keyTr: 'strategy',
        titleTr: 'Strateji Danışmanlığı',
        titleEn: 'Strategy Consulting',
        descTr: 'Kurumsal strateji geliştirme, pazar analizi ve rekabet stratejileri. İşinizi büyütmek için yol haritası.',
        descEn: 'Corporate strategy development, market analysis and competitive strategies. Roadmap to grow your business.',
        features: ['Strategy', 'Analysis', 'Planning']
      },
      {
        icon: '💼',
        keyTr: 'digital',
        titleTr: 'Dijital Dönüşüm',
        titleEn: 'Digital Transformation',
        descTr: 'Dijitalleşme stratejileri, süreç optimizasyonu ve teknoloji entegrasyonu. Modern iş süreçleri.',
        descEn: 'Digitalization strategies, process optimization and technology integration. Modern business processes.',
        features: ['Digital', 'Optimization', 'Integration']
      },
      {
        icon: '📈',
        keyTr: 'business',
        titleTr: 'İş Geliştirme',
        titleEn: 'Business Development',
        descTr: 'Büyüme stratejileri, yeni pazar fırsatları ve iş ortaklıkları. Sürdürülebilir büyüme.',
        descEn: 'Growth strategies, new market opportunities and business partnerships. Sustainable growth.',
        features: ['Growth', 'Markets', 'Partnerships']
      },
      {
        icon: '👥',
        keyTr: 'hr',
        titleTr: 'İnsan Kaynakları',
        titleEn: 'Human Resources',
        descTr: 'İK stratejileri, yetenek yönetimi ve organizasyon geliştirme. Güçlü ekipler kurun.',
        descEn: 'HR strategies, talent management and organizational development. Build strong teams.',
        features: ['HR Strategy', 'Talent', 'Development']
      }
    ]
  },
  emlak: {
    name: 'Bakırcılar Emlak',
    nameEn: 'Bakırcılar Real Estate',
    icon: 'E',
    color: '#10b981', // green-500
    services: [
      {
        icon: '🏠',
        keyTr: 'residential',
        titleTr: 'Konut Satışı',
        titleEn: 'Residential Sales',
        descTr: 'Geniş konut portföyü ile hayalinizdeki evi bulun. Profesyonel danışmanlık ve yasal destek.',
        descEn: 'Find your dream home with our extensive residential portfolio. Professional consulting and legal support.',
        features: ['Wide Portfolio', 'Consulting', 'Legal Support']
      },
      {
        icon: '🏢',
        keyTr: 'commercial',
        titleTr: 'Ticari Gayrimenkul',
        titleEn: 'Commercial Real Estate',
        descTr: 'Ofis, mağaza ve iş yerleri. Yatırım değeri yüksek ticari gayrimenkul fırsatları.',
        descEn: 'Offices, stores and commercial spaces. High investment value commercial real estate opportunities.',
        features: ['Office', 'Retail', 'Investment']
      },
      {
        icon: '🔑',
        keyTr: 'management',
        titleTr: 'Gayrimenkul Yönetimi',
        titleEn: 'Property Management',
        descTr: 'Profesyonel emlak yönetimi, kiralama ve bakım hizmetleri. Mülkünüz güvende.',
        descEn: 'Professional property management, rental and maintenance services. Your property is safe.',
        features: ['Management', 'Rental', 'Maintenance']
      },
      {
        icon: '💰',
        keyTr: 'investment',
        titleTr: 'Yatırım Danışmanlığı',
        titleEn: 'Investment Consulting',
        descTr: 'Gayrimenkul yatırım analizi, pazar değerlendirmesi ve portföy yönetimi.',
        descEn: 'Real estate investment analysis, market evaluation and portfolio management.',
        features: ['Analysis', 'Evaluation', 'Portfolio']
      }
    ]
  },
  otomotiv: {
    name: 'Bakırcılar Otomotiv',
    nameEn: 'Bakırcılar Automotive',
    icon: 'O',
    color: '#ef4444', // red-500
    services: [
      {
        icon: '🚗',
        keyTr: 'sales',
        titleTr: 'Araç Alım-Satım',
        titleEn: 'Vehicle Sales',
        descTr: 'Sıfır ve ikinci el araç alım satımı. Geniş araç seçenekleri ve avantajlı fiyatlar.',
        descEn: 'New and used vehicle sales. Wide vehicle options and advantageous prices.',
        features: ['New & Used', 'Wide Selection', 'Best Prices']
      },
      {
        icon: '🔑',
        keyTr: 'rental',
        titleTr: 'Araç Kiralama',
        titleEn: 'Vehicle Rental',
        descTr: 'Günlük, aylık ve uzun dönem araç kiralama hizmetleri. Ekonomik ve konforlu.',
        descEn: 'Daily, monthly and long-term vehicle rental services. Economical and comfortable.',
        features: ['Daily', 'Monthly', 'Long-term']
      },
      {
        icon: '🔍',
        keyTr: 'expertise',
        titleTr: 'Ekspertiz Hizmeti',
        titleEn: 'Expertise Service',
        descTr: 'Profesyonel araç ekspertizi ve değerlendirme hizmetleri. Güvenli alışveriş.',
        descEn: 'Professional vehicle expertise and appraisal services. Safe shopping.',
        features: ['Professional', 'Detailed', 'Reliable']
      },
      {
        icon: '🔧',
        keyTr: 'maintenance',
        titleTr: 'Bakım-Onarım',
        titleEn: 'Maintenance & Repair',
        descTr: 'Yetkili servis kalitesinde bakım ve onarım hizmetleri. Orjinal yedek parça.',
        descEn: 'Authorized service quality maintenance and repair services. Original spare parts.',
        features: ['Maintenance', 'Repair', 'Original Parts']
      }
    ]
  },
  yolpilot: {
    name: 'Yolpilot',
    nameEn: 'Yolpilot',
    icon: 'Y',
    color: '#6366f1', // indigo-500
    services: [
      {
        icon: '🗺️',
        keyTr: 'navigation',
        titleTr: 'GPS Navigasyon',
        titleEn: 'GPS Navigation',
        descTr: 'Gelişmiş GPS teknolojisi ile hassas konum belirleme ve rota planlama. Gerçek zamanlı navigasyon.',
        descEn: 'Precise positioning and route planning with advanced GPS technology. Real-time navigation.',
        features: ['Precise GPS', 'Real-time', 'Smart Routes']
      },
      {
        icon: '⚡',
        keyTr: 'optimization',
        titleTr: 'Rota Optimizasyonu',
        titleEn: 'Route Optimization',
        descTr: 'Yapay zeka destekli rota optimizasyonu. En hızlı ve ekonomik güzergah.',
        descEn: 'AI-powered route optimization. Fastest and most economical route.',
        features: ['AI-Powered', 'Fast', 'Economical']
      },
      {
        icon: '🚦',
        keyTr: 'traffic',
        titleTr: 'Trafik Takibi',
        titleEn: 'Traffic Monitoring',
        descTr: 'Canlı trafik bilgileri ve alternatif güzergah önerileri. Trafikten kaçının.',
        descEn: 'Live traffic information and alternative route suggestions. Avoid traffic.',
        features: ['Live Traffic', 'Alternatives', 'Updates']
      },
      {
        icon: '🎯',
        keyTr: 'assistant',
        titleTr: 'Sürücü Asistanı',
        titleEn: 'Driver Assistant',
        descTr: 'Sesli komutlar, hız uyarıları ve güvenli sürüş asistanı. Konforlu yolculuk.',
        descEn: 'Voice commands, speed warnings and safe driving assistant. Comfortable journey.',
        features: ['Voice Control', 'Warnings', 'Safety']
      }
    ]
  }
};

console.log('🚀 Starting to fix all sites...\n');

// Process each site
Object.keys(sites).forEach(siteKey => {
  const site = sites[siteKey];
  console.log(`📦 Processing ${site.name}...`);

  // Create messages directory
  const messagesDir = path.join(__dirname, `../apps/${siteKey}/messages`);
  if (!fs.existsSync(messagesDir)) {
    fs.mkdirSync(messagesDir, { recursive: true });
  }

  // Create Turkish translations
  const trTranslations = {
    nav: {
      home: 'Ana Sayfa',
      services: 'Hizmetlerimiz',
      about: 'Hakkımızda',
      contact: 'İletişim'
    },
    hero: {
      title: site.name,
      subtitle: siteKey === 'yazilim' ? 'Yazılım Geliştirme' :
                siteKey === 'danismanlik' ? 'İş Danışmanlığı' :
                siteKey === 'emlak' ? 'Gayrimenkul Hizmetleri' :
                siteKey === 'otomotiv' ? 'Otomotiv Hizmetleri' : 'Akıllı Navigasyon',
      description: siteKey === 'yazilim' ? 'Modern teknolojilerle özel yazılım çözümleri ve danışmanlık hizmetleri' :
                   siteKey === 'danismanlik' ? 'Stratejik planlama ve iş geliştirme danışmanlığı ile işinizi büyütün' :
                   siteKey === 'emlak' ? 'Profesyonel gayrimenkul danışmanlığı ve geniş portföy ile hayalinizdeki mülkü bulun' :
                   siteKey === 'otomotiv' ? 'Güvenilir araç alım satım ve otomotiv hizmetleri' : 'Gelişmiş navigasyon teknolojisi ile her yolculuğunuzda yanınızda',
      primaryCTA: 'Hizmetlerimiz',
      secondaryCTA: 'İletişim'
    },
    services: {
      title: 'Hizmetlerimiz',
      subtitle: siteKey === 'yazilim' ? 'Modern teknolojilerle işinizi dijitale taşıyoruz' :
                siteKey === 'danismanlik' ? 'Uzman ekibimizle işinizi bir üst seviyeye taşıyın' :
                siteKey === 'emlak' ? 'Geniş portföyümüz ile size en uygun mülkü buluyoruz' :
                siteKey === 'otomotiv' ? 'Kapsamlı otomotiv hizmetleri ile yanınızdayız' : 'Akıllı navigasyon özellikleri ile yolculuğunuzu kolaylaştırın'
    },
    features: {
      quality: {
        title: siteKey === 'yazilim' ? 'Kaliteli Kod' : siteKey === 'danismanlik' ? 'Uzman Kadro' : siteKey === 'emlak' ? 'Geniş Portföy' : siteKey === 'otomotiv' ? 'Güvenilir Hizmet' : 'Gelişmiş Teknoloji',
        description: siteKey === 'yazilim' ? 'En iyi pratiklerle temiz, sürdürülebilir kod yazıyoruz' :
                     siteKey === 'danismanlik' ? 'Deneyimli danışmanlarımızla en iyi çözümleri sunuyoruz' :
                     siteKey === 'emlak' ? 'Binlerce emlak ilanı arasından size en uygununu buluyoruz' :
                     siteKey === 'otomotiv' ? 'Profesyonel ekibimizle güvenilir hizmet veriyoruz' : 'En son GPS ve AI teknolojileri ile donatıldık'
      },
      support: {
        title: '7/24 Destek',
        description: 'Her zaman ulaşılabilir, kesintisiz müşteri desteği sağlıyoruz'
      },
      delivery: {
        title: siteKey === 'yazilim' ? 'Zamanında Teslimat' : siteKey === 'danismanlik' ? 'Hızlı Çözüm' : siteKey === 'emlak' ? 'Hızlı İşlem' : siteKey === 'otomotiv' ? 'Hızlı Servis' : 'Gerçek Zamanlı',
        description: siteKey === 'yazilim' ? 'Agile metodoloji ile hızlı proje teslimi garanti ediyoruz' :
                     siteKey === 'danismanlik' ? 'İhtiyaçlarınıza hızlı ve etkili çözümler üretiyoruz' :
                     siteKey === 'emlak' ? 'Hızlı ve sorunsuz gayrimenkul işlemleri' :
                     siteKey === 'otomotiv' ? 'Hızlı ve profesyonel servis hizmeti' : 'Anlık trafik güncellemeleri ve bildirimler'
      }
    },
    cta: {
      title: `${site.name} İçin Bize Ulaşın`,
      subtitle: 'Uzman ekibimiz size en uygun çözümü sunmaya hazır',
      button: 'İletişime Geçin'
    },
    footer: {
      description: siteKey === 'yazilim' ? 'Modern yazılım çözümleri ile işinizi dijitale taşıyoruz' :
                   siteKey === 'danismanlik' ? 'Profesyonel danışmanlık ile işinizi büyütüyoruz' :
                   siteKey === 'emlak' ? 'Güvenilir gayrimenkul danışmanlığı ile yanınızdayız' :
                   siteKey === 'otomotiv' ? 'Otomotiv sektöründe güvenilir hizmet' : 'Akıllı navigasyon ile her yolculuk keyifli',
      quickLinks: 'Hızlı Bağlantılar',
      companies: 'Şirketlerimiz',
      rights: 'Tüm hakları saklıdır'
    }
  };

  // Add services to translations
  site.services.forEach((service, idx) => {
    trTranslations.services[service.keyTr] = {
      title: service.titleTr,
      description: service.descTr,
      feature1: service.features[0],
      feature2: service.features[1],
      feature3: service.features[2]
    };
  });

  fs.writeFileSync(
    path.join(messagesDir, 'tr.json'),
    JSON.stringify(trTranslations, null, 2)
  );

  // Create English translations (simplified - you can enhance)
  const enTranslations = JSON.parse(JSON.stringify(trTranslations));
  enTranslations.nav = { home: 'Home', services: 'Our Services', about: 'About Us', contact: 'Contact' };
  enTranslations.hero.title = site.nameEn;
  enTranslations.hero.subtitle = siteKey === 'yazilim' ? 'Software Development' :
                                  siteKey === 'danismanlik' ? 'Business Consulting' :
                                  siteKey === 'emlak' ? 'Real Estate Services' :
                                  siteKey === 'otomotiv' ? 'Automotive Services' : 'Smart Navigation';
  enTranslations.hero.description = siteKey === 'yazilim' ? 'Custom software solutions and consulting services with modern technologies' :
                                    siteKey === 'danismanlik' ? 'Grow your business with strategic planning and business development consulting' :
                                    siteKey === 'emlak' ? 'Find your dream property with professional real estate consulting and wide portfolio' :
                                    siteKey === 'otomotiv' ? 'Reliable vehicle sales and automotive services' : 'With you on every journey with advanced navigation technology';
  enTranslations.hero.primaryCTA = 'Our Services';
  enTranslations.hero.secondaryCTA = 'Contact';
  enTranslations.footer.quickLinks = 'Quick Links';
  enTranslations.footer.companies = 'Our Companies';
  enTranslations.footer.rights = 'All rights reserved';

  // Update English service titles/descriptions
  site.services.forEach((service, idx) => {
    enTranslations.services[service.keyTr].title = service.titleEn;
    enTranslations.services[service.keyTr].description = service.descEn;
  });

  fs.writeFileSync(
    path.join(messagesDir, 'en.json'),
    JSON.stringify(enTranslations, null, 2)
  );

  // Create DE and ES (copy from EN for now)
  fs.writeFileSync(path.join(messagesDir, 'de.json'), JSON.stringify(enTranslations, null, 2));
  fs.writeFileSync(path.join(messagesDir, 'es.json'), JSON.stringify(enTranslations, null, 2));

  console.log(`  ✅ Created translation files for ${siteKey}`);

  // Fix i18n.ts
  const i18nPath = path.join(__dirname, `../apps/${siteKey}/i18n.ts`);
  const i18nContent = `import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['tr', 'en', 'de', 'es'];
export const defaultLocale = 'tr';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(\`./messages/\${locale}.json\`)).default
  };
});
`;
  fs.writeFileSync(i18nPath, i18nContent);
  console.log(`  ✅ Fixed i18n.ts for ${siteKey}`);
});

console.log('\n✅ All sites processed successfully!');
console.log('\n📝 Next steps:');
console.log('  1. Update SiteLayout components');
console.log('  2. Update page.tsx files');
console.log('  3. Test all sites\n');
