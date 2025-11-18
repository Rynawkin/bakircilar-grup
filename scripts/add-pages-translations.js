const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'apps', 'main', 'messages');

// Additional translations for companies and about pages
const additionalTranslations = {
  tr: {
    companiesPage: {
      title: "Şirketlerimiz",
      subtitle: "Farklı sektörlerde faaliyet gösteren güçlü şirketlerimizle müşterilerimize kapsamlı çözümler sunuyoruz",
      ecommerce: {
        title: "E-Ticaret Platformumuz",
        description: "Ürünlerimizi online olarak satın almak için e-ticaret sitemizi ziyaret edin",
        button: "Bankted.com'a Git"
      }
    },
    aboutPage: {
      title: "Hakkımızda",
      subtitle: "Bakırcılar Grup, farklı sektörlerde öncü şirketleriyle Türkiye ekonomisine değer katan bir holdingdir.",
      story: {
        title: "Hikayemiz",
        paragraph1: "Bakırcılar Grup, yılların tecrübesi ve sektörel bilgi birikimi ile 2010 yılında kurulmuştur. Kuruluşumuzdan bu yana, farklı sektörlerde güçlü markalar yaratarak Türkiye ekonomisine katkı sağlamaktayız.",
        paragraph2: "Ambalaj sektöründen yazılıma, gayrimenkulden otomotive kadar geniş bir yelpazede faaliyet gösteren şirketlerimizle, müşterilerimize entegre çözümler sunuyoruz.",
        paragraph3: "Vizyonumuz, sürdürülebilir büyüme ve yenilikçi yaklaşımlarla Türkiye'nin en saygın holdingleri arasında yer almaktır."
      },
      visionDetailed: "Türkiye'nin önde gelen çok sektörlü holdingi olarak, sürdürülebilir büyüme ve yenilikçi çözümlerle sektörlerimizde lider konuma ulaşmak. Uluslararası pazarlarda etkin olmak ve küresel bir marka haline gelmek.",
      missionDetailed: "Müşterilerimize en kaliteli ürün ve hizmetleri sunarak, topluma ve ekonomiye değer katmak. Çalışanlarımızın gelişimine yatırım yaparak, sürdürülebilir bir gelecek inşa etmek ve paydaşlarımızla uzun vadeli başarılar elde etmek.",
      valuesTitle: "Değerlerimiz",
      valuesItems: {
        innovation: {
          title: "Yenilikçilik",
          description: "Sürekli gelişim ve yenilikçi çözümlerle sektörümüzde öncü olmayı hedefliyoruz."
        },
        reliability: {
          title: "Güvenilirlik",
          description: "Tüm paydaşlarımıza karşı dürüst, şeffaf ve güvenilir bir iş ortağı oluyoruz."
        },
        quality: {
          title: "Kalite",
          description: "En yüksek kalite standartlarında ürün ve hizmet sunmayı ilke edindik."
        },
        sustainability: {
          title: "Sürdürülebilirlik",
          description: "Çevre ve toplum sorumluluğu bilinciyle sürdürülebilir iş modelleri geliştiriyoruz."
        },
        humanFocused: {
          title: "İnsan Odaklılık",
          description: "Çalışanlarımızın gelişimine yatırım yapıyor, mutluluklarını ön planda tutuyoruz."
        },
        excellence: {
          title: "Mükemmellik",
          description: "Her işimizde mükemmeli hedefleyerek, beklentilerin ötesinde sonuçlar üretiyoruz."
        }
      },
      statsTitle: "Rakamlarla Bakırcılar Grup"
    }
  },
  en: {
    companiesPage: {
      title: "Our Companies",
      subtitle: "We offer comprehensive solutions to our customers with our strong companies operating in different sectors",
      ecommerce: {
        title: "Our E-Commerce Platform",
        description: "Visit our e-commerce site to purchase our products online",
        button: "Go to Bankted.com"
      }
    },
    aboutPage: {
      title: "About Us",
      subtitle: "Bakırcılar Group is a holding company that adds value to the Turkish economy with its leading companies in different sectors.",
      story: {
        title: "Our Story",
        paragraph1: "Bakırcılar Group was established in 2010 with years of experience and sectoral knowledge. Since our establishment, we have been contributing to the Turkish economy by creating strong brands in different sectors.",
        paragraph2: "We offer integrated solutions to our customers with our companies operating in a wide range from packaging to software, from real estate to automotive.",
        paragraph3: "Our vision is to be among Turkey's most respected holdings with sustainable growth and innovative approaches."
      },
      visionDetailed: "As Turkey's leading multi-sector holding, to reach a leading position in our sectors with sustainable growth and innovative solutions. To be active in international markets and become a global brand.",
      missionDetailed: "To add value to society and the economy by providing the highest quality products and services to our customers. To build a sustainable future by investing in the development of our employees and achieve long-term success with our stakeholders.",
      valuesTitle: "Our Values",
      valuesItems: {
        innovation: {
          title: "Innovation",
          description: "We aim to be a pioneer in our sector with continuous improvement and innovative solutions."
        },
        reliability: {
          title: "Reliability",
          description: "We are an honest, transparent and reliable business partner to all our stakeholders."
        },
        quality: {
          title: "Quality",
          description: "We have adopted providing products and services at the highest quality standards."
        },
        sustainability: {
          title: "Sustainability",
          description: "We develop sustainable business models with environmental and social responsibility awareness."
        },
        humanFocused: {
          title: "Human-Focused",
          description: "We invest in the development of our employees and prioritize their happiness."
        },
        excellence: {
          title: "Excellence",
          description: "We aim for excellence in everything we do and produce results beyond expectations."
        }
      },
      statsTitle: "Bakırcılar Group in Numbers"
    }
  },
  de: {
    companiesPage: {
      title: "Unsere Unternehmen",
      subtitle: "Wir bieten umfassende Lösungen für unsere Kunden mit unseren starken Unternehmen in verschiedenen Sektoren",
      ecommerce: {
        title: "Unsere E-Commerce-Plattform",
        description: "Besuchen Sie unsere E-Commerce-Website, um unsere Produkte online zu kaufen",
        button: "Zu Bankted.com gehen"
      }
    },
    aboutPage: {
      title: "Über Uns",
      subtitle: "Bakırcılar Gruppe ist eine Holdinggesellschaft, die mit ihren führenden Unternehmen in verschiedenen Sektoren der türkischen Wirtschaft einen Mehrwert bietet.",
      story: {
        title: "Unsere Geschichte",
        paragraph1: "Die Bakırcılar Gruppe wurde 2010 mit jahrelanger Erfahrung und Branchenkenntnissen gegründet. Seit unserer Gründung tragen wir zur türkischen Wirtschaft bei, indem wir starke Marken in verschiedenen Sektoren schaffen.",
        paragraph2: "Wir bieten unseren Kunden integrierte Lösungen mit unseren Unternehmen, die in einem breiten Spektrum von Verpackungen bis Software, von Immobilien bis Automobilen tätig sind.",
        paragraph3: "Unsere Vision ist es, mit nachhaltigem Wachstum und innovativen Ansätzen zu den angesehensten Holdings der Türkei zu gehören."
      },
      visionDetailed: "Als führende Multi-Sektor-Holding der Türkei mit nachhaltigem Wachstum und innovativen Lösungen eine führende Position in unseren Sektoren erreichen. In internationalen Märkten aktiv sein und eine globale Marke werden.",
      missionDetailed: "Der Gesellschaft und der Wirtschaft einen Mehrwert bieten, indem wir unseren Kunden die qualitativ hochwertigsten Produkte und Dienstleistungen anbieten. Eine nachhaltige Zukunft aufbauen, indem wir in die Entwicklung unserer Mitarbeiter investieren und langfristige Erfolge mit unseren Stakeholdern erzielen.",
      valuesTitle: "Unsere Werte",
      valuesItems: {
        innovation: {
          title: "Innovation",
          description: "Wir streben danach, mit kontinuierlicher Verbesserung und innovativen Lösungen Vorreiter in unserer Branche zu sein."
        },
        reliability: {
          title: "Zuverlässigkeit",
          description: "Wir sind ein ehrlicher, transparenter und zuverlässiger Geschäftspartner für alle unsere Stakeholder."
        },
        quality: {
          title: "Qualität",
          description: "Wir haben uns verpflichtet, Produkte und Dienstleistungen auf höchstem Qualitätsniveau anzubieten."
        },
        sustainability: {
          title: "Nachhaltigkeit",
          description: "Wir entwickeln nachhaltige Geschäftsmodelle mit Umwelt- und Sozialverantwortungsbewusstsein."
        },
        humanFocused: {
          title: "Menschenorientiert",
          description: "Wir investieren in die Entwicklung unserer Mitarbeiter und stellen ihr Glück in den Vordergrund."
        },
        excellence: {
          title: "Exzellenz",
          description: "Wir streben in allem, was wir tun, nach Exzellenz und erzielen Ergebnisse, die die Erwartungen übertreffen."
        }
      },
      statsTitle: "Bakırcılar Gruppe in Zahlen"
    }
  },
  es: {
    companiesPage: {
      title: "Nuestras Empresas",
      subtitle: "Ofrecemos soluciones integrales a nuestros clientes con nuestras empresas sólidas operando en diferentes sectores",
      ecommerce: {
        title: "Nuestra Plataforma de Comercio Electrónico",
        description: "Visite nuestro sitio de comercio electrónico para comprar nuestros productos en línea",
        button: "Ir a Bankted.com"
      }
    },
    aboutPage: {
      title: "Sobre Nosotros",
      subtitle: "Grupo Bakırcılar es una empresa holding que agrega valor a la economía turca con sus empresas líderes en diferentes sectores.",
      story: {
        title: "Nuestra Historia",
        paragraph1: "El Grupo Bakırcılar se estableció en 2010 con años de experiencia y conocimiento sectorial. Desde nuestro establecimiento, hemos estado contribuyendo a la economía turca creando marcas fuertes en diferentes sectores.",
        paragraph2: "Ofrecemos soluciones integradas a nuestros clientes con nuestras empresas operando en una amplia gama desde embalaje hasta software, desde bienes raíces hasta automotriz.",
        paragraph3: "Nuestra visión es estar entre los holdings más respetados de Turquía con crecimiento sostenible y enfoques innovadores."
      },
      visionDetailed: "Como holding multisectorial líder de Turquía, alcanzar una posición de liderazgo en nuestros sectores con crecimiento sostenible y soluciones innovadoras. Ser activos en mercados internacionales y convertirnos en una marca global.",
      missionDetailed: "Agregar valor a la sociedad y la economía proporcionando los productos y servicios de más alta calidad a nuestros clientes. Construir un futuro sostenible invirtiendo en el desarrollo de nuestros empleados y lograr éxitos a largo plazo con nuestros stakeholders.",
      valuesTitle: "Nuestros Valores",
      valuesItems: {
        innovation: {
          title: "Innovación",
          description: "Aspiramos a ser pioneros en nuestro sector con mejora continua y soluciones innovadoras."
        },
        reliability: {
          title: "Confiabilidad",
          description: "Somos un socio comercial honesto, transparente y confiable para todos nuestros stakeholders."
        },
        quality: {
          title: "Calidad",
          description: "Hemos adoptado proporcionar productos y servicios con los más altos estándares de calidad."
        },
        sustainability: {
          title: "Sostenibilidad",
          description: "Desarrollamos modelos de negocio sostenibles con conciencia de responsabilidad ambiental y social."
        },
        humanFocused: {
          title: "Enfocado en las Personas",
          description: "Invertimos en el desarrollo de nuestros empleados y priorizamos su felicidad."
        },
        excellence: {
          title: "Excelencia",
          description: "Aspiramos a la excelencia en todo lo que hacemos y producimos resultados más allá de las expectativas."
        }
      },
      statsTitle: "Grupo Bakırcılar en Números"
    }
  }
};

// Update each language file
for (const [lang, translations] of Object.entries(additionalTranslations)) {
  const filePath = path.join(messagesDir, `${lang}.json`);
  const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const updatedData = {
    ...existingData,
    ...translations
  };

  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
  console.log(`Updated ${lang}.json with page translations`);
}

console.log('\nAll page translations added successfully!');
