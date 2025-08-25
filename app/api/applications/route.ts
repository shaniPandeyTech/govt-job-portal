import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/database';
import '@/src/lib/models'; // Ensure all models are registered
import Application from '@/src/models/Application';
import Job from '@/src/models/Job';
import User from '@/src/models/User';
import { requireAuth, AuthenticatedRequest } from '@/src/middleware/auth';

export async function POST(req: AuthenticatedRequest) {
  try {
    // Check authentication
    const authResult = await requireAuth(req);
    if (authResult) return authResult;

    const { jobId, coverLetter, resume, salaryExpectation, availability } = await req.json();

    // Validation
    if (!jobId || !coverLetter || !resume) {
      return NextResponse.json(
        { error: 'Job ID, cover letter, and resume are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if job exists and is active
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    if (job.status !== 'active') {
      return NextResponse.json(
        { error: 'This job is not accepting applications' },
        { status: 400 }
      );
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user!.id,
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: 'You have already applied for this job' },
        { status: 409 }
      );
    }

    // Create application
    const application = new Application({
      job: jobId,
      applicant: req.user!.id,
      coverLetter,
      resume,
      salaryExpectation,
      availability,
    });

    await application.save();

    // Update job applications count
    await Job.findByIdAndUpdate(jobId, { $inc: { applicationsCount: 1 } });

    return NextResponse.json({
      message: 'Application submitted successfully',
      application,
    }, { status: 201 });

  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: AuthenticatedRequest) {
  try {
    // Check authentication
    const authResult = await requireAuth(req);
    if (authResult) return authResult;

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || '';
    const jobId = searchParams.get('jobId') || '';

    await connectDB();

    // Build query based on user role
    const query: any = {};
    
    if (req.user!.role === 'employer' || req.user!.role === 'admin') {
      // Employers can see applications for their jobs
      if (jobId) {
        query.job = jobId;
      } else {
        // Get all jobs by this employer
        const employerJobs = await Job.find({ employer: req.user!.id }).select('_id');
        query.job = { $in: employerJobs.map(job => job._id) };
      }
    } else {
      // Job seekers can only see their own applications
      query.applicant = req.user!.id;
    }

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const [applications, total] = await Promise.all([
      Application.find(query)
        .populate('job', 'title company location type')
        .populate('applicant', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Application.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      applications,
      pagination: {
        currentPage: page,
        totalPages,
        totalApplications: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit,
      },
    });

  } catch (error) {
    console.error('Applications fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 