import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/database';
import '@/src/lib/models'; // Ensure all models are registered
import Job from '@/src/models/Job';
import User from '@/src/models/User';
import { cacheService } from '@/src/lib/cache';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const location = searchParams.get('location') || '';
    const category = searchParams.get('category') || '';
    const type = searchParams.get('type') || '';
    const experience = searchParams.get('experience') || '';
    const remote = searchParams.get('remote') || '';
    const salaryMin = searchParams.get('salaryMin') || '';
    const salaryMax = searchParams.get('salaryMax') || '';
    const skills = searchParams.get('skills') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Create cache key
    const cacheKey = cacheService.generateKey(
      'search',
      `q:${query}`,
      `location:${location}`,
      `category:${category}`,
      `type:${type}`,
      `experience:${experience}`,
      `remote:${remote}`,
      `salaryMin:${salaryMin}`,
      `salaryMax:${salaryMax}`,
      `skills:${skills}`,
      `page:${page}`,
      `limit:${limit}`,
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
    const searchQuery: any = { status: 'active' };

    // Text search
    if (query) {
      searchQuery.$text = { $search: query };
    }

    // Location filter
    if (location) {
      searchQuery.location = { $regex: location, $options: 'i' };
    }

    // Category filter
    if (category) {
      searchQuery.category = { $regex: category, $options: 'i' };
    }

    // Job type filter
    if (type) {
      searchQuery.type = type;
    }

    // Experience level filter
    if (experience) {
      searchQuery.experience = experience;
    }

    // Remote work filter
    if (remote === 'true') {
      searchQuery.remote = true;
    }

    // Salary range filter
    if (salaryMin || salaryMax) {
      searchQuery.salary = {};
      if (salaryMin) {
        searchQuery.salary.$gte = parseInt(salaryMin);
      }
      if (salaryMax) {
        searchQuery.salary.$lte = parseInt(salaryMax);
      }
    }

    // Skills filter
    if (skills) {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      searchQuery.skills = { $in: skillsArray };
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate skip value
    const skip = (page - 1) * limit;

    // Execute search
    const [jobs, total] = await Promise.all([
      Job.find(searchQuery)
        .populate('employer', 'firstName lastName company')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Job.countDocuments(searchQuery)
    ]);

    // Calculate pagination
    const totalPages = Math.ceil(total / limit);

    const response = {
      jobs,
      pagination: {
        currentPage: page,
        totalPages,
        totalJobs: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit,
      },
      filters: {
        query,
        location,
        category,
        type,
        experience,
        remote,
        salaryMin,
        salaryMax,
        skills,
      },
    };

    // Cache for 5 minutes
    await cacheService.set(cacheKey, response, 300);

    return NextResponse.json(response);

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 