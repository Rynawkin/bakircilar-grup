import { Request, Response, NextFunction } from 'express';
import News from '../models/News';
import { AppError } from '../middleware/errorHandler';
import { getRedisClient } from '../config/redis';

// Get all published news
export const getAllNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 10, category, lang = 'tr' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    // Try to get from cache
    const redis = getRedisClient();
    const cacheKey = `news:${page}:${limit}:${category || 'all'}:${lang}`;

    if (redis) {
      const cached = await redis.get(cacheKey);
      if (cached) {
        res.json(JSON.parse(cached));
        return;
      }
    }

    const query: any = { isPublished: true };
    if (category) query.category = category;

    const news = await News.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select(`title.${lang} excerpt.${lang} image category publishedAt views slug`);

    const total = await News.countDocuments(query);

    const result = {
      news,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    };

    // Cache the result
    if (redis) {
      await redis.setEx(cacheKey, 300, JSON.stringify(result)); // Cache for 5 minutes
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Get single news by slug
export const getNewsBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const { lang = 'tr' } = req.query;

    const news = await News.findOne({ slug, isPublished: true });

    if (!news) {
      throw new AppError('News not found', 404);
    }

    // Increment views
    news.views += 1;
    await news.save();

    res.json(news);
  } catch (error) {
    next(error);
  }
};

// Create news (Admin only)
export const createNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const news = new News(req.body);
    await news.save();

    // Invalidate cache
    const redis = getRedisClient();
    if (redis) {
      const keys = await redis.keys('news:*');
      if (keys.length > 0) {
        await redis.del(keys);
      }
    }

    res.status(201).json(news);
  } catch (error) {
    next(error);
  }
};

// Update news (Admin only)
export const updateNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const news = await News.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!news) {
      throw new AppError('News not found', 404);
    }

    // Invalidate cache
    const redis = getRedisClient();
    if (redis) {
      const keys = await redis.keys('news:*');
      if (keys.length > 0) {
        await redis.del(keys);
      }
    }

    res.json(news);
  } catch (error) {
    next(error);
  }
};

// Delete news (Admin only)
export const deleteNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const news = await News.findByIdAndDelete(id);

    if (!news) {
      throw new AppError('News not found', 404);
    }

    // Invalidate cache
    const redis = getRedisClient();
    if (redis) {
      const keys = await redis.keys('news:*');
      if (keys.length > 0) {
        await redis.del(keys);
      }
    }

    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    next(error);
  }
};
