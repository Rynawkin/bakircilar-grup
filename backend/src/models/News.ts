import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
  title: {
    tr: string;
    en: string;
    de: string;
    es: string;
  };
  slug: string;
  excerpt: {
    tr: string;
    en: string;
    de: string;
    es: string;
  };
  content: {
    tr: string;
    en: string;
    de: string;
    es: string;
  };
  image: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: Date;
  isPublished: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema: Schema = new Schema(
  {
    title: {
      tr: { type: String, required: true },
      en: { type: String, required: true },
      de: { type: String, required: true },
      es: { type: String, required: true }
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    excerpt: {
      tr: { type: String, required: true },
      en: { type: String, required: true },
      de: { type: String, required: true },
      es: { type: String, required: true }
    },
    content: {
      tr: { type: String, required: true },
      en: { type: String, required: true },
      de: { type: String, required: true },
      es: { type: String, required: true }
    },
    image: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['company', 'technology', 'sustainability', 'announcement']
    },
    tags: [{ type: String }],
    author: {
      type: String,
      required: true
    },
    publishedAt: {
      type: Date,
      default: Date.now
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Index for search and performance
NewsSchema.index({ slug: 1 });
NewsSchema.index({ isPublished: 1, publishedAt: -1 });
NewsSchema.index({ category: 1 });
NewsSchema.index({ tags: 1 });

export default mongoose.model<INews>('News', NewsSchema);
