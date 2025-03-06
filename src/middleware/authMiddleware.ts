// src/middleware/authMiddleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './tokenUtils';

// Define role-based access permissions
const ROLE_PERMISSIONS = {
  student: [
    '/dashboard',
    '/courses',
    '/documents',
    '/materials'
  ],
  faculty: [
    '/dashboard',
    '/courses',
    '/documents',
    '/documents/upload'
  ],
  hod: [
    '/dashboard',
    '/courses',
    '/documents',
    '/admin',
    '/admin/*'
  ]
};

export function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  const path = req.nextUrl.pathname;

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/reset-password'];
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  // Check if token exists
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Verify token
  try {
    const decoded = verifyToken(token);
    const userRole = decoded.role;

    // Check role-based access
    const allowedRoutes = ROLE_PERMISSIONS[userRole] || [];
    const hasAccess = allowedRoutes.some(route => 
      route.endsWith('/*') 
        ? path.startsWith(route.slice(0, -2)) 
        : path === route
    );

    if (!hasAccess) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Token invalid or expired
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Token utility functions
export function tokenUtils() {
  // src/middleware/tokenUtils.ts
  import jwt from 'jsonwebtoken';

  const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

  export function generateToken(user: {
    id: string, 
    email: string, 
    role: 'student' | 'faculty' | 'hod'
  }) {
    return jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );
  }

  export function verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET) as {
        id: string, 
        email: string, 
        role: 'student' | 'faculty' | 'hod'
      };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

// Authorization Decorator for API Routes
export function withAuthorization(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
  allowedRoles: string[]
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = verifyToken(token);

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}