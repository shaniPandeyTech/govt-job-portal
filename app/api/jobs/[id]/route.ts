import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/database';
import '@/src/lib/models'; // Ensure all models are registered
import Job from '@/src/models/Job';
import { cacheService } from '@/src/lib/cache';

export async function GET(
  req: NextRequest,
  paramsPromise: Promise<{ params: { id: string } }>
) {
  try {
    const { params } = await paramsPromise;
    const { id } = params;

    // Try to get from cache first
    const cacheKey = cacheService.generateKey('job', id);
    const cachedJob = await cacheService.get(cacheKey);
    
    if (cachedJob) {
      // Increment view count in background
      incrementJobViews(id);
      return NextResponse.json(cachedJob);
    }

    await connectDB();

    const job = await Job.findById(id)
      .populate('employer', 'firstName lastName company email phone')
      .populate('applications', 'applicant status createdAt')
      .lean();

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await Job.findByIdAndUpdate(id, { $inc: { views: 1 } });

    // Cache the job for 10 minutes
    await cacheService.set(cacheKey, job, 600);

    return NextResponse.json(job);

  } catch (error) {
    console.error('Job fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  paramsPromise: Promise<{ params: { id: string } }>
) {
  try {
    const { params } = await paramsPromise;
    const { id } = params;
    const body = await req.json();

    await connectDB();

    const job = await Job.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    ).populate('employer', 'firstName lastName company');

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Clear cache for this job
    const cacheKey = cacheService.generateKey('job', id);
    await cacheService.delete(cacheKey);

    return NextResponse.json({
      message: 'Job updated successfully',
      job,
    });

  } catch (error) {
    console.error('Job update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  paramsPromise: Promise<{ params: { id: string } }>
) {
  try {
    const { params } = await paramsPromise;
    const { id } = params;

    await connectDB();

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Clear cache for this job
    const cacheKey = cacheService.generateKey('job', id);
    await cacheService.delete(cacheKey);

    return NextResponse.json({
      message: 'Job deleted successfully',
    });

  } catch (error) {
    console.error('Job delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to increment job views
async function incrementJobViews(jobId: string) {
  try {
    await connectDB();
    await Job.findByIdAndUpdate(jobId, { $inc: { views: 1 } });
  } catch (error) {
    console.error('Error incrementing job views:', error);
  }
} 