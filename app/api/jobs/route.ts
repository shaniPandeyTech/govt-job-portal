import '@/src/lib/urlParsePolyfill';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/database';
import '@/src/lib/models'; // Ensure all models are registered
import Job from '@/src/models/Job';
import User from '@/src/models/User';
import { cacheService } from '@/src/lib/cache';

export async function GET(req: NextRequest) {
  try {
   
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const category = searchParams.get('category') || '';
    const type = searchParams.get('type') || '';
    const experience = searchParams.get('experience') || '';
    const remote = searchParams.get('remote') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Create cache key based on query parameters
    const cacheKey = cacheService.generateKey(
      'jobs',
      `page:${page}`,
      `limit:${limit}`,
      `search:${search}`,
      `location:${location}`,
      `category:${category}`,
      `type:${type}`,
      `experience:${experience}`,
      `remote:${remote}`,
      `sortBy:${sortBy}`,
      `sortOrder:${sortOrder}`
    );

    // Try to get from cache first
    const cachedData = await cacheService.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    await connectDB();

    // Build query
    const query: any = { status: 'active' };

    if (search) {
      query.$text = { $search: search };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (type) {
      query.type = type;
    }

    if (experience) {
      query.experience = experience;
    }

    if (remote === 'true') {
      query.remote = true;
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Execute query
    const [jobs, total] = await Promise.all([
      Job.find(query)
        .populate('employer', 'firstName lastName company')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Job.countDocuments(query)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const response = {
      jobs,
      pagination: {
        currentPage: page,
        totalPages,
        totalJobs: total,
        hasNextPage,
        hasPrevPage,
        limit,
      },
      filters: {
        search,
        location,
        category,
        type,
        experience,
        remote,
      },
    };

    // Cache the response for 5 minutes
    await cacheService.set(cacheKey, response, 300);

    return NextResponse.json(response);

  } catch (error) {
    console.error('Jobs fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    await connectDB();

    // Create new job
    const job = new Job({
      ...body,
      employer: body.employerId, // Assuming employerId is passed in the request
      expiresAt: body.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days default
    });

    await job.save();

    // Clear jobs cache to ensure fresh data
    await cacheService.delete('jobs:*');

    return NextResponse.json({
      message: 'Job created successfully',
      job,
    }, { status: 201 });

  } catch (error) {
    console.error('Job creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 