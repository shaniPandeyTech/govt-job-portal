import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  job: mongoose.Types.ObjectId;
  applicant: mongoose.Types.ObjectId;
  coverLetter: string;
  resume: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'interviewed' | 'accepted' | 'rejected';
  employerNotes?: string;
  applicantNotes?: string;
  interviewDate?: Date;
  interviewLocation?: string;
  interviewType?: 'phone' | 'video' | 'onsite';
  salaryExpectation?: number;
  availability?: string;
  isWithdrawn: boolean;
  withdrawnAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>({
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  coverLetter: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'interviewed', 'accepted', 'rejected'],
    default: 'pending',
  },
  employerNotes: {
    type: String,
  },
  applicantNotes: {
    type: String,
  },
  interviewDate: {
    type: Date,
  },
  interviewLocation: {
    type: String,
    trim: true,
  },
  interviewType: {
    type: String,
    enum: ['phone', 'video', 'onsite'],
  },
  salaryExpectation: {
    type: Number,
  },
  availability: {
    type: String,
    trim: true,
  },
  isWithdrawn: {
    type: Boolean,
    default: false,
  },
  withdrawnAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });
applicationSchema.index({ applicant: 1, status: 1 });
applicationSchema.index({ job: 1, status: 1 });
applicationSchema.index({ status: 1, createdAt: -1 });

// Prevent duplicate applications
applicationSchema.pre('save', async function(next) {
  if (this.isNew) {
    const ApplicationModel = mongoose.model('Application');
    const existingApplication = await ApplicationModel.findOne({
      job: this.job,
      applicant: this.applicant,
    });
    
    if (existingApplication) {
      return next(new Error('Application already exists for this job'));
    }
  }
  next();
});

// Check if model already exists to prevent overwrite error
export default mongoose.models.Application || mongoose.model<IApplication>('Application', applicationSchema); 