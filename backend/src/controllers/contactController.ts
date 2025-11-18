import { Request, Response, NextFunction } from 'express';
import Contact from '../models/Contact';
import { AppError } from '../middleware/errorHandler';
import { sendEmail } from '../utils/email';

// Submit contact form
export const submitContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, phone, subject, message, company } = req.body;

    // Create contact entry
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      company
    });

    await contact.save();

    // Send notification email to admin
    await sendEmail({
      to: process.env.BREVO_SENDER_EMAIL || 'info@bakircilargrup.com',
      subject: `Yeni İletişim Formu: ${subject}`,
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><strong>İsim:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Şirket:</strong> ${company}</p>` : ''}
        <p><strong>Konu:</strong> ${subject}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message}</p>
      `
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: 'Mesajınız Alındı - Bakırcılar Grup',
      html: `
        <h2>Sayın ${name},</h2>
        <p>Mesajınız tarafımıza ulaşmıştır. En kısa sürede size dönüş yapacağız.</p>
        <p><strong>Mesajınız:</strong></p>
        <p>${message}</p>
        <br>
        <p>Saygılarımızla,</p>
        <p>Bakırcılar Grup</p>
      `
    });

    res.status(201).json({
      message: 'Message sent successfully',
      contact
    });
  } catch (error) {
    next(error);
  }
};

// Get all contacts (Admin only)
export const getAllContacts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const query: any = {};
    if (status) query.status = status;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Contact.countDocuments(query);

    res.json({
      contacts,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update contact status (Admin only)
export const updateContactStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, replyMessage } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      {
        status,
        ...(replyMessage && {
          replied: true,
          replyMessage,
          repliedAt: new Date()
        })
      },
      { new: true }
    );

    if (!contact) {
      throw new AppError('Contact not found', 404);
    }

    // If replying, send email to user
    if (replyMessage) {
      await sendEmail({
        to: contact.email,
        subject: `Re: ${contact.subject}`,
        html: `
          <h2>Sayın ${contact.name},</h2>
          <p>${replyMessage}</p>
          <br>
          <p>Saygılarımızla,</p>
          <p>Bakırcılar Grup</p>
        `
      });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// Delete contact (Admin only)
export const deleteContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      throw new AppError('Contact not found', 404);
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    next(error);
  }
};
