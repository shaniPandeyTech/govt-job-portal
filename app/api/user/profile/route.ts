import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/database';
import User from '@/src/models/User';
import { requireAuth, AuthenticatedRequest } from '@/src/middleware/auth';

export async function GET(req: AuthenticatedRequest) {
  try {
    // Check authentication
    const authResult = await requireAuth(req);
    if (authResult) return authResult;

    await connectDB();

    const user = await User.findById(req.user!.id).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });

  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: AuthenticatedRequest) {
  try {
    // Check authentication
    const authResult = await requireAuth(req);
    if (authResult) return authResult;

    const body = await req.json();
    
    // Remove sensitive fields that shouldn't be updated via this endpoint
    const { password, email, role, isVerified, isActive, ...updateData } = body;

    await connectDB();

    const user = await User.findByIdAndUpdate(
      req.user!.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      user,
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 