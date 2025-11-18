import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: {
    tr: string;
    en: string;
    de: string;
    es: string;
  };
  description: {
    tr: string;
    en: string;
    de: string;
    es: string;
  };
  requirements: {
    tr: string[];
    en: string[];
    de: string[];
    es: string[];
  };
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  department: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  isActive: boolean;
  applicationDeadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema = new Schema(
  {
    title: {
      tr: { type: String, required: true },
      en: { type: String, required: true },
      de: { type: String, required: true },
      es: { type: String, required: true }
    },
    description: {
      tr: { type: String, required: true },
      en: { type: String, required: true },
      de: { type: String, required: true },
      es: { type: String, required: true }
    },
    requirements: {
      tr: [{ type: String }],
      en: [{ type: String }],
      de: [{ type: String }],
      es: [{ type: String }]
    },
    company: {
      type: String,
      required: true,
      enum: [
        'Bakırcılar Grup',
        'Bakırcılar Ambalaj',
        'Bakırcılar Yazılım',
        'Bakırcılar Danışmanlık',
        'Bakırcılar Emlak',
        'Bakırcılar Otomotiv',
        'Yolpilot'
      ]
    },
    location: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['full-time', 'part-time', 'contract', 'internship']
    },
    department: {
      type: String,
      required: true
    },
    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'TRY'
      }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    applicationDeadline: Date
  },
  {
    timestamps: true
  }
);

// Index for search
JobSchema.index({ company: 1, isActive: 1 });
JobSchema.index({ location: 1 });
JobSchema.index({ type: 1 });

export default mongoose.model<IJob>('Job', JobSchema);
