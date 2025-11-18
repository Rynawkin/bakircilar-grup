import { Router } from 'express';
import newsRoutes from './newsRoutes';
import contactRoutes from './contactRoutes';
import jobRoutes from './jobRoutes';
import authRoutes from './authRoutes';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/news', newsRoutes);
router.use('/contact', contactRoutes);
router.use('/jobs', jobRoutes);

export default router;
