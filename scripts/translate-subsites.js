const fs = require('fs');
const path = require('path');

const sites = {
  yazilim: {
    de: {
      nav: {
        home: "Startseite",
        services: "Unsere Dienstleistungen",
        about: "Über Uns",
        contact: "Kontakt"
      },
      hero: {
        title: "Bakırcılar Software",
        subtitle: "Softwareentwicklung",
        description: "Maßgeschneiderte Softwarelösungen und Beratungsdienste mit modernen Technologien",
        primaryCTA: "Unsere Dienstleistungen",
        secondaryCTA: "Kontakt"
      },
      services: {
        title: "Unsere Dienstleistungen",
        subtitle: "Wir digitalisieren Ihr Geschäft mit modernen Technologien",
        web: {
          title: "Webentwicklung",
          description: "Responsive und schnelle Webanwendungen mit React, Next.js und modernen Technologien. SEO-freundlich, benutzerfreundliche Oberflächen.",
          feature1: "React & Next.js",
          feature2: "SEO",
          feature3: "Responsive"
        },
        mobile: {
          title: "Mobile Anwendung",
          description: "Native und plattformübergreifende mobile Anwendungen für iOS und Android. React Native und Flutter Technologien.",
          feature1: "iOS & Android",
          feature2: "Cross-Platform",
          feature3: "Native"
        },
        cloud: {
          title: "Cloud-Lösungen",
          description: "Skalierbare und sichere Cloud-Infrastruktur. AWS, Azure und Google Cloud Dienste.",
          feature1: "Skalierbar",
          feature2: "Sicher",
          feature3: "Zuverlässig"
        },
        ai: {
          title: "KI & Datenanalyse",
          description: "Künstliche Intelligenz und maschinelles Lernen. Datenanalyse und Visualisierung.",
          feature1: "KI",
          feature2: "Datenanalyse",
          feature3: "Vorhersage"
        }
      },
      features: {
        quality: {
          title: "Hohe Qualität",
          description: "Sauberer Code, Best Practices"
        },
        support: {
          title: "24/7 Support",
          description: "Immer für Sie da"
        },
        delivery: {
          title: "Pünktliche Lieferung",
          description: "Projekte termingerecht abgeschlossen"
        }
      },
      cta: {
        title: "Lassen Sie uns Ihr Projekt besprechen",
        subtitle: "Kontaktieren Sie uns für maßgeschneiderte Softwarelösungen",
        button: "Kontakt aufnehmen"
      }
    },
    es: {
      nav: {
        home: "Inicio",
        services: "Nuestros Servicios",
        about: "Sobre Nosotros",
        contact: "Contacto"
      },
      hero: {
        title: "Bakırcılar Software",
        subtitle: "Desarrollo de Software",
        description: "Soluciones de software personalizadas y servicios de consultoría con tecnologías modernas",
        primaryCTA: "Nuestros Servicios",
        secondaryCTA: "Contacto"
      },
      services: {
        title: "Nuestros Servicios",
        subtitle: "Digitalizamos su negocio con tecnologías modernas",
        web: {
          title: "Desarrollo Web",
          description: "Aplicaciones web responsivas y rápidas con React, Next.js y tecnologías modernas. Interfaces amigables con SEO y usuario.",
          feature1: "React & Next.js",
          feature2: "SEO",
          feature3: "Responsive"
        },
        mobile: {
          title: "Aplicación Móvil",
          description: "Aplicaciones móviles nativas y multiplataforma para iOS y Android. Tecnologías React Native y Flutter.",
          feature1: "iOS & Android",
          feature2: "Cross-Platform",
          feature3: "Native"
        },
        cloud: {
          title: "Soluciones en la Nube",
          description: "Infraestructura en la nube escalable y segura. Servicios AWS, Azure y Google Cloud.",
          feature1: "Escalable",
          feature2: "Seguro",
          feature3: "Confiable"
        },
        ai: {
          title: "IA y Análisis de Datos",
          description: "Inteligencia artificial y aprendizaje automático. Análisis y visualización de datos.",
          feature1: "IA",
          feature2: "Análisis",
          feature3: "Predicción"
        }
      },
      features: {
        quality: {
          title: "Alta Calidad",
          description: "Código limpio, mejores prácticas"
        },
        support: {
          title: "Soporte 24/7",
          description: "Siempre a su disposición"
        },
        delivery: {
          title: "Entrega Puntual",
          description: "Proyectos completados a tiempo"
        }
      },
      cta: {
        title: "Hablemos de su proyecto",
        subtitle: "Contáctenos para soluciones de software personalizadas",
        button: "Ponerse en Contacto"
      }
    }
  },
  danismanlik: {
    de: {
      nav: {
        home: "Startseite",
        services: "Unsere Dienstleistungen",
        about: "Über Uns",
        contact: "Kontakt"
      },
      hero: {
        title: "Bakırcılar Beratung",
        subtitle: "Unternehmensberatung",
        description: "Lassen Sie Ihr Unternehmen mit strategischer Planung und Geschäftsentwicklungsberatung wachsen",
        primaryCTA: "Unsere Dienstleistungen",
        secondaryCTA: "Kontakt"
      },
      services: {
        title: "Unsere Dienstleistungen",
        subtitle: "Bringen Sie Ihr Unternehmen mit unserem Expertenteam auf die nächste Stufe",
        strategy: {
          title: "Strategieberatung",
          description: "Unternehmensstrategie-Entwicklung, Marktanalyse und Wettbewerbsstrategien. Fahrplan für Ihr Geschäftswachstum.",
          feature1: "Strategie",
          feature2: "Analyse",
          feature3: "Planung"
        },
        digital: {
          title: "Digitale Transformation",
          description: "Digitalisierungsstrategien, Prozessoptimierung und Technologieintegration. Moderne Geschäftsprozesse.",
          feature1: "Digital",
          feature2: "Optimierung",
          feature3: "Integration"
        },
        business: {
          title: "Geschäftsentwicklung",
          description: "Marktexpansion, Partnerschaften und Verkaufsstrategien. Steigern Sie Ihren Umsatz.",
          feature1: "Expansion",
          feature2: "Partnerschaften",
          feature3: "Verkauf"
        },
        hr: {
          title: "Personalberatung",
          description: "Talentmanagement, Organisationsentwicklung und Schulungsprogramme. Investieren Sie in Ihre Mitarbeiter.",
          feature1: "Talent",
          feature2: "Organisation",
          feature3: "Schulung"
        }
      },
      features: {
        quality: {
          title: "Expertenteam",
          description: "Erfahrene Berater"
        },
        support: {
          title: "Kontinuierliche Unterstützung",
          description: "Langfristige Partnerschaften"
        },
        delivery: {
          title: "Ergebnisorientiert",
          description: "Messbare Erfolge"
        }
      },
      cta: {
        title: "Lassen Sie Ihr Unternehmen wachsen",
        subtitle: "Kontaktieren Sie uns für professionelle Beratungsdienstleistungen",
        button: "Kontakt aufnehmen"
      }
    },
    es: {
      nav: {
        home: "Inicio",
        services: "Nuestros Servicios",
        about: "Sobre Nosotros",
        contact: "Contacto"
      },
      hero: {
        title: "Bakırcılar Consultoría",
        subtitle: "Consultoría Empresarial",
        description: "Haga crecer su negocio con planificación estratégica y consultoría de desarrollo empresarial",
        primaryCTA: "Nuestros Servicios",
        secondaryCTA: "Contacto"
      },
      services: {
        title: "Nuestros Servicios",
        subtitle: "Lleve su negocio al siguiente nivel con nuestro equipo experto",
        strategy: {
          title: "Consultoría Estratégica",
          description: "Desarrollo de estrategia corporativa, análisis de mercado y estrategias competitivas. Hoja de ruta para el crecimiento de su negocio.",
          feature1: "Estrategia",
          feature2: "Análisis",
          feature3: "Planificación"
        },
        digital: {
          title: "Transformación Digital",
          description: "Estrategias de digitalización, optimización de procesos e integración tecnológica. Procesos empresariales modernos.",
          feature1: "Digital",
          feature2: "Optimización",
          feature3: "Integración"
        },
        business: {
          title: "Desarrollo Empresarial",
          description: "Expansión de mercado, asociaciones y estrategias de ventas. Aumente sus ingresos.",
          feature1: "Expansión",
          feature2: "Asociaciones",
          feature3: "Ventas"
        },
        hr: {
          title: "Consultoría de Recursos Humanos",
          description: "Gestión de talentos, desarrollo organizacional y programas de capacitación. Invierta en sus empleados.",
          feature1: "Talento",
          feature2: "Organización",
          feature3: "Capacitación"
        }
      },
      features: {
        quality: {
          title: "Equipo Experto",
          description: "Consultores experimentados"
        },
        support: {
          title: "Apoyo Continuo",
          description: "Asociaciones a largo plazo"
        },
        delivery: {
          title: "Orientado a Resultados",
          description: "Éxitos medibles"
        }
      },
      cta: {
        title: "Haga crecer su negocio",
        subtitle: "Contáctenos para servicios de consultoría profesional",
        button: "Ponerse en Contacto"
      }
    }
  },
  emlak: {
    de: {
      nav: {
        home: "Startseite",
        services: "Unsere Dienstleistungen",
        about: "Über Uns",
        contact: "Kontakt"
      },
      hero: {
        title: "Bakırcılar Immobilien",
        subtitle: "Immobiliendienstleistungen",
        description: "Finden Sie Ihre Traumimmobilie mit professioneller Immobilienberatung und breitem Portfolio",
        primaryCTA: "Unsere Dienstleistungen",
        secondaryCTA: "Kontakt"
      },
      services: {
        title: "Unsere Dienstleistungen",
        subtitle: "Wir finden die passendste Immobilie für Sie mit unserem breiten Portfolio",
        residential: {
          title: "Wohnimmobilien",
          description: "Finden Sie Ihr Traumhaus mit unserem umfangreichen Wohnimmobilien-Portfolio. Professionelle Beratung und rechtliche Unterstützung.",
          feature1: "Breites Portfolio",
          feature2: "Beratung",
          feature3: "Rechtliche Unterstützung"
        },
        commercial: {
          title: "Gewerbeimmobilien",
          description: "Büros, Geschäfte und Gewerbeflächen. Gewerbeimmobilien mit hohem Investitionswert.",
          feature1: "Büro",
          feature2: "Einzelhandel",
          feature3: "Investition"
        },
        management: {
          title: "Immobilienverwaltung",
          description: "Professionelle Immobilienverwaltung. Mietersuche, Instandhaltung und rechtliche Prozesse.",
          feature1: "Verwaltung",
          feature2: "Instandhaltung",
          feature3: "Rechtlich"
        },
        investment: {
          title: "Anlageberatung",
          description: "Immobilieninvestitionsberatung. Marktanalyse und Renditeprognosen.",
          feature1: "Analyse",
          feature2: "Rendite",
          feature3: "Investition"
        }
      },
      features: {
        quality: {
          title: "Breites Portfolio",
          description: "Tausende von Immobilien"
        },
        support: {
          title: "Expertenteam",
          description: "Professionelle Beratung"
        },
        delivery: {
          title: "Rechtliche Unterstützung",
          description: "Sichere Transaktionen"
        }
      },
      cta: {
        title: "Finden Sie Ihre Traumimmobilie",
        subtitle: "Kontaktieren Sie uns für professionelle Immobiliendienstleistungen",
        button: "Kontakt aufnehmen"
      }
    },
    es: {
      nav: {
        home: "Inicio",
        services: "Nuestros Servicios",
        about: "Sobre Nosotros",
        contact: "Contacto"
      },
      hero: {
        title: "Bakırcılar Inmobiliaria",
        subtitle: "Servicios Inmobiliarios",
        description: "Encuentre su propiedad soñada con consultoría inmobiliaria profesional y amplio portafolio",
        primaryCTA: "Nuestros Servicios",
        secondaryCTA: "Contacto"
      },
      services: {
        title: "Nuestros Servicios",
        subtitle: "Encontramos la propiedad más adecuada para usted con nuestro amplio portafolio",
        residential: {
          title: "Ventas Residenciales",
          description: "Encuentre la casa de sus sueños con nuestro extenso portafolio residencial. Consultoría profesional y apoyo legal.",
          feature1: "Amplio Portafolio",
          feature2: "Consultoría",
          feature3: "Apoyo Legal"
        },
        commercial: {
          title: "Bienes Raíces Comerciales",
          description: "Oficinas, tiendas y espacios comerciales. Oportunidades inmobiliarias comerciales de alto valor de inversión.",
          feature1: "Oficina",
          feature2: "Comercio",
          feature3: "Inversión"
        },
        management: {
          title: "Gestión de Propiedades",
          description: "Gestión profesional de propiedades. Búsqueda de inquilinos, mantenimiento y procesos legales.",
          feature1: "Gestión",
          feature2: "Mantenimiento",
          feature3: "Legal"
        },
        investment: {
          title: "Consultoría de Inversión",
          description: "Consultoría de inversión inmobiliaria. Análisis de mercado y proyecciones de rentabilidad.",
          feature1: "Análisis",
          feature2: "Rentabilidad",
          feature3: "Inversión"
        }
      },
      features: {
        quality: {
          title: "Amplio Portafolio",
          description: "Miles de propiedades"
        },
        support: {
          title: "Equipo Experto",
          description: "Consultoría profesional"
        },
        delivery: {
          title: "Apoyo Legal",
          description: "Transacciones seguras"
        }
      },
      cta: {
        title: "Encuentre su propiedad soñada",
        subtitle: "Contáctenos para servicios inmobiliarios profesionales",
        button: "Ponerse en Contacto"
      }
    }
  },
  otomotiv: {
    de: {
      nav: {
        home: "Startseite",
        services: "Unsere Dienstleistungen",
        about: "Über Uns",
        contact: "Kontakt"
      },
      hero: {
        title: "Bakırcılar Automotive",
        subtitle: "Automobildienstleistungen",
        description: "Zuverlässiger Fahrzeugverkauf und Automobildienstleistungen",
        primaryCTA: "Unsere Dienstleistungen",
        secondaryCTA: "Kontakt"
      },
      services: {
        title: "Unsere Dienstleistungen",
        subtitle: "Wir sind mit umfassenden Automobildienstleistungen für Sie da",
        sales: {
          title: "Fahrzeugverkauf",
          description: "Neu- und Gebrauchtwagenverkauf. Breite Fahrzeugauswahl und günstige Preise.",
          feature1: "Neu & Gebraucht",
          feature2: "Breite Auswahl",
          feature3: "Beste Preise"
        },
        rental: {
          title: "Fahrzeugvermietung",
          description: "Tages-, Monats- und Langzeitfahrzeugvermietung. Wirtschaftlich und komfortabel.",
          feature1: "Täglich",
          feature2: "Monatlich",
          feature3: "Langzeit"
        },
        expertise: {
          title: "Fahrzeugbegutachtung",
          description: "Professionelle Fahrzeugbegutachtungsdienste. Detaillierte technische und optische Prüfung.",
          feature1: "Expertenprüfung",
          feature2: "Detailliert",
          feature3: "Berichterstattung"
        },
        maintenance: {
          title: "Wartung und Reparatur",
          description: "Wartung und Reparaturdienste für alle Fahrzeugmarken. Autorisierter Service und Originalteile.",
          feature1: "Wartung",
          feature2: "Reparatur",
          feature3: "Originalteile"
        }
      },
      features: {
        quality: {
          title: "Qualitätsgarantie",
          description: "Garantierte Fahrzeuge"
        },
        support: {
          title: "Kundenzufriedenheit",
          description: "Immer für Sie da"
        },
        delivery: {
          title: "Schnelle Lieferung",
          description: "Sofortige Lieferung"
        }
      },
      cta: {
        title: "Finden Sie Ihr Traumauto",
        subtitle: "Kontaktieren Sie uns für zuverlässige Automobildienstleistungen",
        button: "Kontakt aufnehmen"
      }
    },
    es: {
      nav: {
        home: "Inicio",
        services: "Nuestros Servicios",
        about: "Sobre Nosotros",
        contact: "Contacto"
      },
      hero: {
        title: "Bakırcılar Automotriz",
        subtitle: "Servicios Automotrices",
        description: "Venta de vehículos confiables y servicios automotrices",
        primaryCTA: "Nuestros Servicios",
        secondaryCTA: "Contacto"
      },
      services: {
        title: "Nuestros Servicios",
        subtitle: "Estamos con usted con servicios automotrices integrales",
        sales: {
          title: "Venta de Vehículos",
          description: "Venta de vehículos nuevos y usados. Amplia selección de vehículos y precios ventajosos.",
          feature1: "Nuevo y Usado",
          feature2: "Amplia Selección",
          feature3: "Mejores Precios"
        },
        rental: {
          title: "Alquiler de Vehículos",
          description: "Servicios de alquiler de vehículos diarios, mensuales y a largo plazo. Económico y cómodo.",
          feature1: "Diario",
          feature2: "Mensual",
          feature3: "Largo Plazo"
        },
        expertise: {
          title: "Evaluación de Vehículos",
          description: "Servicios profesionales de evaluación de vehículos. Inspección técnica y visual detallada.",
          feature1: "Inspección Experta",
          feature2: "Detallada",
          feature3: "Informes"
        },
        maintenance: {
          title: "Mantenimiento y Reparación",
          description: "Servicios de mantenimiento y reparación para todas las marcas. Servicio autorizado y piezas originales.",
          feature1: "Mantenimiento",
          feature2: "Reparación",
          feature3: "Piezas Originales"
        }
      },
      features: {
        quality: {
          title: "Garantía de Calidad",
          description: "Vehículos garantizados"
        },
        support: {
          title: "Satisfacción del Cliente",
          description: "Siempre a su servicio"
        },
        delivery: {
          title: "Entrega Rápida",
          description: "Entrega inmediata"
        }
      },
      cta: {
        title: "Encuentre su auto soñado",
        subtitle: "Contáctenos para servicios automotrices confiables",
        button: "Ponerse en Contacto"
      }
    }
  }
};

// Update each site's translation files
for (const [siteName, translations] of Object.entries(sites)) {
  const siteDir = path.join(__dirname, '..', 'apps', siteName, 'messages');

  // Read existing TR and EN files to preserve their structure
  const trPath = path.join(siteDir, 'tr.json');
  const enPath = path.join(siteDir, 'en.json');

  const trData = JSON.parse(fs.readFileSync(trPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  // Create DE file
  const deData = { ...enData, ...translations.de };
  fs.writeFileSync(path.join(siteDir, 'de.json'), JSON.stringify(deData, null, 2));
  console.log(`Updated ${siteName}/messages/de.json`);

  // Create ES file
  const esData = { ...enData, ...translations.es };
  fs.writeFileSync(path.join(siteDir, 'es.json'), JSON.stringify(esData, null, 2));
  console.log(`Updated ${siteName}/messages/es.json`);
}

console.log('\nAll translation files updated successfully!');
