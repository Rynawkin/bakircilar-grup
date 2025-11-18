import { Router } from 'express';
import {
  getAllNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews
} from '../controllers/newsController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllNews);
router.get('/:slug', getNewsBySlug);

// Protected routes (Admin/Editor only)
router.post('/', authenticate, authorize('admin', 'editor'), createNews);
router.put('/:id', authenticate, authorize('admin', 'editor'), updateNews);
router.delete('/:id', authenticate, authorize('admin'), deleteNews);

export default router;
