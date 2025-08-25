import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  category: string;
  salary?: {
    min?: number;
    max?: number;
    currency: string;
    period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  };
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  skills: string[];
  experience: 'entry' | 'mid' | 'senior' | 'executive';
  education: string;
  remote: boolean;
  hybrid: boolean;
  onsite: boolean;
  employer: mongoose.Types.ObjectId;
  applications: mongoose.Types.ObjectId[];
  status: 'active' | 'paused' | 'closed' | 'draft';
  isFeatured: boolean;
  isUrgent: boolean;
  views: number;
  applicationsCount: number;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    period: {
      type: String,
      enum: ['hourly', 'daily', 'weekly', 'monthly', 'yearly'],
      default: 'yearly',
    },
  },
  requirements: [{
    type: String,
    trim: true,
  }],
  responsibilities: [{
    type: String,
    trim: true,
  }],
  benefits: [{
    type: String,
    trim: true,
  }],
  skills: [{
    type: String,
    trim: true,
  }],
  experience: {
    type: String,
    enum: ['entry', 'mid', 'senior', 'executive'],
    required: true,
  },
  education: {
    type: String,
    trim: true,
  },
  remote: {
    type: Boolean,
    default: false,
  },
  hybrid: {
    type: Boolean,
    default: false,
  },
  onsite: {
    type: Boolean,
    default: true,
  },
  employer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  applications: [{
    type: Schema.Types.ObjectId,
    ref: 'Application',
  }],
  status: {
    type: String,
    enum: ['active', 'paused', 'closed', 'draft'],
    default: 'draft',
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isUrgent: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  applicationsCount: {
    type: Number,
    default: 0,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
jobSchema.index({ title: 'text', description: 'text', company: 'text', location: 'text' });
jobSchema.index({ status: 1, createdAt: -1 });
jobSchema.index({ employer: 1 });
jobSchema.index({ category: 1 });
jobSchema.index({ location: 1 });
jobSchema.index({ type: 1 });
jobSchema.index({ experience: 1 });
jobSchema.index({ isFeatured: 1, status: 1 });
jobSchema.index({ expiresAt: 1 });
jobSchema.index({ skills: 1 });

// Virtual for full name
jobSchema.virtual('isExpired').get(function() {
  return new Date() > this.expiresAt;
});

// Ensure virtuals are serialized
jobSchema.set('toJSON', { virtuals: true });
jobSchema.set('toObject', { virtuals: true });

// Check if model already exists to prevent overwrite error
export default mongoose.models.Job || mongoose.model<IJob>('Job', jobSchema); 