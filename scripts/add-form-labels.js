const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '..', 'apps', 'main', 'messages');

// Form labels for contact form
const formLabels = {
  tr: {
    contactForm: {
      name: "Ad Soyad *",
      email: "E-posta *",
      phone: "Telefon",
      subject: "Konu *",
      message: "Mesajınız *",
      submit: "Mesaj Gönder",
      submitting: "Gönderiliyor...",
      success: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
      error: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin."
    }
  },
  en: {
    contactForm: {
      name: "Full Name *",
      email: "Email *",
      phone: "Phone",
      subject: "Subject *",
      message: "Your Message *",
      submit: "Send Message",
      submitting: "Sending...",
      success: "Your message has been sent successfully. We'll get back to you soon.",
      error: "Failed to send message. Please try again later."
    }
  },
  de: {
    contactForm: {
      name: "Vollständiger Name *",
      email: "E-Mail *",
      phone: "Telefon",
      subject: "Betreff *",
      message: "Ihre Nachricht *",
      submit: "Nachricht senden",
      submitting: "Wird gesendet...",
      success: "Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns bald bei Ihnen melden.",
      error: "Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut."
    }
  },
  es: {
    contactForm: {
      name: "Nombre Completo *",
      email: "Correo Electrónico *",
      phone: "Teléfono",
      subject: "Asunto *",
      message: "Su Mensaje *",
      submit: "Enviar Mensaje",
      submitting: "Enviando...",
      success: "Su mensaje ha sido enviado exitosamente. Nos pondremos en contacto pronto.",
      error: "No se pudo enviar el mensaje. Por favor, inténtelo de nuevo más tarde."
    }
  }
};

// Update each language file
for (const [lang, translations] of Object.entries(formLabels)) {
  const filePath = path.join(messagesDir, `${lang}.json`);
  const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const updatedData = {
    ...existingData,
    ...translations
  };

  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
  console.log(`Updated ${lang}.json with contact form labels`);
}

console.log('\nAll contact form labels added successfully!');
