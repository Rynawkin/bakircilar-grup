import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  company?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  replied: boolean;
  replyMessage?: string;
  repliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema: Schema = new Schema(
  {
    name: {
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
    phone: String,
    subject: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    company: String,
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new'
    },
    replied: {
      type: Boolean,
      default: false
    },
    replyMessage: String,
    repliedAt: Date
  },
  {
    timestamps: true
  }
);

// Index for search
ContactSchema.index({ status: 1, createdAt: -1 });
ContactSchema.index({ email: 1 });

export default mongoose.model<IContact>('Contact', ContactSchema);
