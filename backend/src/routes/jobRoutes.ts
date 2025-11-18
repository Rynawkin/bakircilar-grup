import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { applicationLimiter } from '../middleware/rateLimiter';
import Job from '../models/Job';
import Application from '../models/Application';
import { AppError } from '../middleware/errorHandler';
import { uploadCV } from '../middleware/upload';
import { sendEmail, emailTemplates } from '../utils/email';

const router = Router();

// Get all active jobs
router.get('/', async (req, res, next) => {
  try {
    const { company, location, type, lang = 'tr' } = req.query;

    const query: any = { isActive: true };
    if (company) query.company = company;
    if (location) query.location = location;
    if (type) query.type = type;

    const jobs = await Job.find(query)
      .select(`title.${lang} description.${lang} company location type department`)
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

// Get single job
router.get('/:id', async (req, res, next) => {
  try {
    const { lang = 'tr' } = req.query;
    const job = await Job.findOne({ _id: req.params.id, isActive: true });

    if (!job) {
      throw new AppError('Job not found', 404);
    }

    res.json(job);
  } catch (error) {
    next(error);
  }
});

// Submit application
router.post('/:id/apply', applicationLimiter, uploadCV.single('cv'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, coverLetter, linkedinUrl, portfolioUrl } = req.body;

    // Check if job exists
    const job = await Job.findOne({ _id: id, isActive: true });
    if (!job) {
      throw new AppError('Job not found', 404);
    }

    // Check if CV is uploaded
    if (!req.file) {
      throw new AppError('CV is required', 400);
    }

    // Create application
    const application = new Application({
      jobId: id,
      firstName,
      lastName,
      email,
      phone,
      coverLetter,
      cvUrl: req.file.path,
      linkedinUrl,
      portfolioUrl
    });

    await application.save();

    // Send confirmation email
    await sendEmail({
      to: email,
      subject: 'Başvurunuz Alındı - Bakırcılar Grup',
      html: emailTemplates.applicationConfirmation(
        `${firstName} ${lastName}`,
        job.title.tr
      )
    });

    // Notify admin
    await sendEmail({
      to: process.env.BREVO_SENDER_EMAIL || 'info@bakircilargrup.com',
      subject: `Yeni İş Başvurusu: ${job.title.tr}`,
      html: `
        <h2>Yeni İş Başvurusu</h2>
        <p><strong>Pozisyon:</strong> ${job.title.tr}</p>
        <p><strong>Aday:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
      `
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    next(error);
  }
});

// Admin routes
router.post('/', authenticate, authorize('admin', 'editor'), async (req, res, next) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticate, authorize('admin', 'editor'), async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!job) {
      throw new AppError('Job not found', 404);
    }

    res.json(job);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      throw new AppError('Job not found', 404);
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Get all applications (Admin only)
router.get('/:id/applications', authenticate, authorize('admin', 'editor'), async (req, res, next) => {
  try {
    const applications = await Application.find({ jobId: req.params.id }).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    next(error);
  }
});

export default router;
