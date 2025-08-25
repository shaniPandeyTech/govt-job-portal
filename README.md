# Job Portal - Next.js Backend

A modern job portal built with Next.js, MongoDB, and Redis caching. Features include user authentication, job posting, application management, and advanced search capabilities.

## Features

- 🔐 **User Authentication** - JWT-based authentication with role-based access control
- 💼 **Job Management** - Create, update, and manage job postings
- 📝 **Application System** - Job seekers can apply to jobs, employers can review applications
- 🔍 **Advanced Search** - Full-text search with multiple filters
- ⚡ **Redis Caching** - Fast response times with intelligent caching
- 📊 **Analytics** - View tracking and application statistics
- 🎯 **Role-based Access** - Separate interfaces for job seekers, employers, and admins

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: MongoDB with Mongoose ODM
- **Caching**: Redis with ioredis
- **Authentication**: JWT with bcryptjs
- **Language**: TypeScript
- **Styling**: SCSS with CSS Modules

## Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- Redis (local or cloud)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/job-portal
   MONGODB_URI_PROD=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/job-portal

   # Redis Configuration
   REDIS_URL=redis://localhost:6379
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d

   # Server Configuration
   NODE_ENV=development
   PORT=3000

   # API Configuration
   API_BASE_URL=http://localhost:3000/api
   ```

4. **Start MongoDB and Redis**
   
   **Local MongoDB:**
   ```bash
   # Install MongoDB locally or use Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```
   
   **Local Redis:**
   ```bash
   # Install Redis locally or use Docker
   docker run -d -p 6379:6379 --name redis redis:alpine
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Jobs
- `GET /api/jobs` - List jobs with filtering and pagination
- `POST /api/jobs` - Create new job (employer only)
- `GET /api/jobs/[id]` - Get job details
- `PUT /api/jobs/[id]` - Update job (employer only)
- `DELETE /api/jobs/[id]` - Delete job (employer only)

### Applications
- `POST /api/applications` - Submit job application
- `GET /api/applications` - List applications (role-based)

### User Profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Search
- `GET /api/search` - Advanced job search with filters

## Database Models

### User
- Authentication fields (email, password)
- Profile information (name, phone, location)
- Role-based fields (company, skills, experience)
- Account status and verification

### Job
- Job details (title, description, requirements)
- Company and location information
- Salary and benefits
- Work type and experience level
- Application tracking

### Application
- Job and applicant references
- Application content (cover letter, resume)
- Status tracking and employer notes
- Interview scheduling

## Caching Strategy

The application uses Redis for intelligent caching:

- **Job listings**: 5-minute cache with query-based keys
- **Job details**: 10-minute cache per job
- **Search results**: 5-minute cache with filter-based keys
- **User profiles**: 15-minute cache per user

Cache invalidation occurs on:
- Job updates/deletions
- New job postings
- User profile updates

## Authentication & Authorization

### JWT Token Structure
```json
{
  "userId": "user_id",
  "email": "user@example.com",
  "role": "jobseeker|employer|admin",
  "iat": "issued_at",
  "exp": "expires_at"
}
```

### Role-based Access
- **Job Seekers**: Can apply to jobs, view their applications
- **Employers**: Can post jobs, view applications for their jobs
- **Admins**: Full access to all features

## Development

### Project Structure
```
src/
├── components/          # React components
├── lib/                # Database and cache utilities
├── middleware/         # Authentication middleware
├── models/            # MongoDB models
└── utils/             # API utilities

app/
├── api/               # API routes
│   ├── auth/         # Authentication endpoints
│   ├── jobs/         # Job management
│   ├── applications/ # Application handling
│   ├── search/       # Search functionality
│   └── user/         # User profile
└── globals.css       # Global styles
```

### Adding New Features

1. **Create API Route**
   ```typescript
   // app/api/feature/route.ts
   import { NextRequest, NextResponse } from 'next/server';
   import connectDB from '@/src/lib/database';
   
   export async function GET(req: NextRequest) {
     // Implementation
   }
   ```

2. **Add Database Model** (if needed)
   ```typescript
   // src/models/Feature.ts
   import mongoose, { Schema } from 'mongoose';
   
   const featureSchema = new Schema({
     // Schema definition
   });
   
   export default mongoose.model('Feature', featureSchema);
   ```

3. **Update Caching** (if needed)
   ```typescript
   import { cacheService } from '@/src/lib/cache';
   
   // Cache operations
   await cacheService.set(key, data, ttl);
   const cached = await cacheService.get(key);
   ```

## Production Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Use production MongoDB URI
3. Configure Redis for production
4. Set strong JWT secret
5. Enable HTTPS

### Performance Optimization
- Enable MongoDB connection pooling
- Configure Redis for high availability
- Implement rate limiting
- Set up monitoring and logging

### Security Considerations
- Use environment variables for secrets
- Implement rate limiting
- Validate all inputs
- Use HTTPS in production
- Regular security updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@jobportal.com or create an issue in the repository.
