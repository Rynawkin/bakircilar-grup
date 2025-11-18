const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'apps', 'main', 'messages');

// Additional page translations
const pageTranslations = {
  tr: {
    careerPage: {
      title: "Kariyer",
      subtitle: "Bakırcılar Grup ailesine katılın ve kariyerinizi bizimle şekillendirin",
      whyJoinUs: {
        title: "Neden Biz?",
        careerGrowth: {
          title: "Kariyer Gelişimi",
          description: "Eğitim programları ve mentorluk ile sürekli gelişim fırsatı"
        },
        workEnvironment: {
          title: "Çalışma Ortamı",
          description: "Modern ofisler ve esnek çalışma saatleri"
        },
        projects: {
          title: "Projeler",
          description: "Farklı sektörlerde ilham verici projelerde yer alma şansı"
        }
      },
      openPositions: "Açık Pozisyonlar",
      details: "Detaylar",
      spontaneousApplication: {
        title: "Aradığınız Pozisyonu Bulamadınız mı?",
        subtitle: "Açık başvuru yaparak CV'nizi bizimle paylaşın",
        button: "Açık Başvuru Yap"
      },
      jobModal: {
        company: "Şirket",
        location: "Lokasyon",
        type: "Çalışma Şekli",
        description: "Açıklama",
        apply: "Başvur"
      }
    },
    contactPage: {
      title: "İletişim",
      subtitle: "Sorularınız, önerileriniz veya iş birlikleri için bizimle iletişime geçin",
      contactInfo: "İletişim Bilgileri",
      email: "E-posta",
      phone: "Telefon",
      address: "Adres",
      whatsapp: "WhatsApp",
      whatsappMessage: "WhatsApp ile iletişime geç",
      mapPlaceholder: "Google Maps buraya eklenecek",
      sendMessage: "Mesaj Gönderin"
    },
    newsPage: {
      title: "Haberler",
      subtitle: "Bakırcılar Grup'tan son haberler ve gelişmeler",
      readMore: "Devamını Oku",
      image: "Görsel"
    }
  },
  en: {
    careerPage: {
      title: "Careers",
      subtitle: "Join the Bakırcılar Group family and shape your career with us",
      whyJoinUs: {
        title: "Why Join Us?",
        careerGrowth: {
          title: "Career Development",
          description: "Continuous development opportunities with training programs and mentorship"
        },
        workEnvironment: {
          title: "Work Environment",
          description: "Modern offices and flexible working hours"
        },
        projects: {
          title: "Projects",
          description: "Opportunity to participate in inspiring projects across different sectors"
        }
      },
      openPositions: "Open Positions",
      details: "Details",
      spontaneousApplication: {
        title: "Didn't Find the Position You're Looking For?",
        subtitle: "Share your CV with us through spontaneous application",
        button: "Apply Spontaneously"
      },
      jobModal: {
        company: "Company",
        location: "Location",
        type: "Employment Type",
        description: "Description",
        apply: "Apply"
      }
    },
    contactPage: {
      title: "Contact",
      subtitle: "Get in touch with us for your questions, suggestions or business collaborations",
      contactInfo: "Contact Information",
      email: "Email",
      phone: "Phone",
      address: "Address",
      whatsapp: "WhatsApp",
      whatsappMessage: "Contact via WhatsApp",
      mapPlaceholder: "Google Maps will be added here",
      sendMessage: "Send Message"
    },
    newsPage: {
      title: "News",
      subtitle: "Latest news and developments from Bakırcılar Group",
      readMore: "Read More",
      image: "Image"
    }
  },
  de: {
    careerPage: {
      title: "Karriere",
      subtitle: "Werden Sie Teil der Bakırcılar Gruppe Familie und gestalten Sie Ihre Karriere mit uns",
      whyJoinUs: {
        title: "Warum wir?",
        careerGrowth: {
          title: "Karriereentwicklung",
          description: "Kontinuierliche Entwicklungsmöglichkeiten durch Schulungsprogramme und Mentoring"
        },
        workEnvironment: {
          title: "Arbeitsumgebung",
          description: "Moderne Büros und flexible Arbeitszeiten"
        },
        projects: {
          title: "Projekte",
          description: "Möglichkeit zur Teilnahme an inspirierenden Projekten in verschiedenen Sektoren"
        }
      },
      openPositions: "Offene Stellen",
      details: "Details",
      spontaneousApplication: {
        title: "Haben Sie die gesuchte Position nicht gefunden?",
        subtitle: "Teilen Sie Ihren Lebenslauf durch eine Initiativbewerbung mit uns",
        button: "Initiativ bewerben"
      },
      jobModal: {
        company: "Unternehmen",
        location: "Standort",
        type: "Beschäftigungsart",
        description: "Beschreibung",
        apply: "Bewerben"
      }
    },
    contactPage: {
      title: "Kontakt",
      subtitle: "Kontaktieren Sie uns für Ihre Fragen, Anregungen oder Geschäftskooperationen",
      contactInfo: "Kontaktinformationen",
      email: "E-Mail",
      phone: "Telefon",
      address: "Adresse",
      whatsapp: "WhatsApp",
      whatsappMessage: "Kontakt über WhatsApp",
      mapPlaceholder: "Google Maps wird hier hinzugefügt",
      sendMessage: "Nachricht senden"
    },
    newsPage: {
      title: "Nachrichten",
      subtitle: "Neueste Nachrichten und Entwicklungen von der Bakırcılar Gruppe",
      readMore: "Weiterlesen",
      image: "Bild"
    }
  },
  es: {
    careerPage: {
      title: "Carreras",
      subtitle: "Únase a la familia del Grupo Bakırcılar y forme su carrera con nosotros",
      whyJoinUs: {
        title: "¿Por qué nosotros?",
        careerGrowth: {
          title: "Desarrollo Profesional",
          description: "Oportunidades de desarrollo continuo con programas de capacitación y mentoría"
        },
        workEnvironment: {
          title: "Ambiente de Trabajo",
          description: "Oficinas modernas y horarios de trabajo flexibles"
        },
        projects: {
          title: "Proyectos",
          description: "Oportunidad de participar en proyectos inspiradores en diferentes sectores"
        }
      },
      openPositions: "Posiciones Abiertas",
      details: "Detalles",
      spontaneousApplication: {
        title: "¿No encontró la posición que busca?",
        subtitle: "Comparta su CV con nosotros a través de una solicitud espontánea",
        button: "Aplicar Espontáneamente"
      },
      jobModal: {
        company: "Empresa",
        location: "Ubicación",
        type: "Tipo de Empleo",
        description: "Descripción",
        apply: "Aplicar"
      }
    },
    contactPage: {
      title: "Contacto",
      subtitle: "Póngase en contacto con nosotros para sus preguntas, sugerencias o colaboraciones comerciales",
      contactInfo: "Información de Contacto",
      email: "Correo Electrónico",
      phone: "Teléfono",
      address: "Dirección",
      whatsapp: "WhatsApp",
      whatsappMessage: "Contactar vía WhatsApp",
      mapPlaceholder: "Google Maps se agregará aquí",
      sendMessage: "Enviar Mensaje"
    },
    newsPage: {
      title: "Noticias",
      subtitle: "Últimas noticias y desarrollos del Grupo Bakırcılar",
      readMore: "Leer Más",
      image: "Imagen"
    }
  }
};

// Update each language file
for (const [lang, translations] of Object.entries(pageTranslations)) {
  const filePath = path.join(messagesDir, `${lang}.json`);
  const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const updatedData = {
    ...existingData,
    ...translations
  };

  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
  console.log(`Updated ${lang}.json with career, contact, and news page translations`);
}

console.log('\nAll additional page translations added successfully!');
