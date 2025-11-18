import { Router } from 'express';
import {
  submitContact,
  getAllContacts,
  updateContactStatus,
  deleteContact
} from '../controllers/contactController';
import { authenticate, authorize } from '../middleware/auth';
import { contactLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public route
router.post('/', contactLimiter, submitContact);

// Protected routes (Admin only)
router.get('/', authenticate, authorize('admin', 'editor'), getAllContacts);
router.patch('/:id', authenticate, authorize('admin', 'editor'), updateContactStatus);
router.delete('/:id', authenticate, authorize('admin'), deleteContact);

export default router;
