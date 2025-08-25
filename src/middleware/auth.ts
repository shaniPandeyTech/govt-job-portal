import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/src/models/User';
import connectDB from '@/src/lib/database';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
  };
}

export const authenticateToken = async (req: AuthenticatedRequest): Promise<NextResponse | null> => {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { error: 'Access token required' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    await connectDB();
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'Invalid or inactive user' },
        { status: 401 }
      );
    }

    req.user = {
      id: (user as any)._id.toString(),
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return null; // Continue to next middleware
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest): NextResponse | null => {
    if (!req.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (!roles.includes(req.user.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    return null; // Continue to next middleware
  };
};

export const requireAuth = async (req: AuthenticatedRequest): Promise<NextResponse | null> => {
  const authResult = await authenticateToken(req);
  if (authResult) return authResult;
  
  return null;
};

export const requireEmployer = (req: AuthenticatedRequest): NextResponse | null => {
  return requireRole(['employer', 'admin'])(req);
};

export const requireAdmin = (req: AuthenticatedRequest): NextResponse | null => {
  return requireRole(['admin'])(req);
}; 