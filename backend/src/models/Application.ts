import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  cvUrl: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema: Schema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true
    },
    coverLetter: {
      type: String,
      required: true
    },
    cvUrl: {
      type: String,
      required: true
    },
    linkedinUrl: String,
    portfolioUrl: String,
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'shortlisted', 'rejected', 'hired'],
      default: 'pending'
    },
    notes: String
  },
  {
    timestamps: true
  }
);

// Index for search
ApplicationSchema.index({ jobId: 1 });
ApplicationSchema.index({ email: 1 });
ApplicationSchema.index({ status: 1 });

export default mongoose.model<IApplication>('Application', ApplicationSchema);
