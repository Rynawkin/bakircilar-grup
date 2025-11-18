import axios from 'axios';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  cc?: string[];
  bcc?: string[];
  replyTo?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const brevoApiKey = process.env.BREVO_API_KEY;

    if (!brevoApiKey) {
      console.warn('⚠️  Brevo API key not configured. Email not sent.');
      return;
    }

    const recipients = Array.isArray(options.to)
      ? options.to.map(email => ({ email }))
      : [{ email: options.to }];

    const data = {
      sender: {
        name: process.env.BREVO_SENDER_NAME || 'Bakırcılar Grup',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@bakircilargrup.com'
      },
      to: recipients,
      subject: options.subject,
      htmlContent: options.html,
      ...(options.cc && { cc: options.cc.map(email => ({ email })) }),
      ...(options.bcc && { bcc: options.bcc.map(email => ({ email })) }),
      ...(options.replyTo && { replyTo: { email: options.replyTo } })
    };

    await axios.post('https://api.brevo.com/v3/smtp/email', data, {
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ Email sent to ${options.to}`);
  } catch (error: any) {
    console.error('❌ Email sending failed:', error.response?.data || error.message);
    throw new Error('Failed to send email');
  }
};

// Email templates
export const emailTemplates = {
  contactConfirmation: (name: string, message: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1e3a8a; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Bakırcılar Grup</h1>
        </div>
        <div class="content">
          <h2>Sayın ${name},</h2>
          <p>Mesajınız tarafımıza ulaşmıştır. En kısa sürede size dönüş yapacağız.</p>
          <p><strong>Mesajınız:</strong></p>
          <p>${message}</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Bakırcılar Grup. Tüm hakları saklıdır.</p>
          <p>Bu otomatik bir mesajdır, lütfen yanıtlamayın.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  applicationConfirmation: (name: string, jobTitle: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1e3a8a; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Bakırcılar Grup</h1>
        </div>
        <div class="content">
          <h2>Sayın ${name},</h2>
          <p><strong>${jobTitle}</strong> pozisyonuna başvurunuz tarafımıza ulaşmıştır.</p>
          <p>Başvurunuz değerlendirildikten sonra size geri dönüş yapılacaktır.</p>
          <p>İlginiz için teşekkür ederiz.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Bakırcılar Grup. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </body>
    </html>
  `
};
