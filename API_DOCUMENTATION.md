# Job Portal API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "jobseeker",
  "phone": "+1234567890",
  "company": "Company Name" // Optional for employers
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "jobseeker",
    "isVerified": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

### Login User
**POST** `/auth/login`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "jobseeker",
    "company": "Company Name",
    "location": "City, State",
    "skills": ["JavaScript", "React"],
    "experience": "3 years",
    "education": "BS Computer Science",
    "isVerified": true,
    "lastLogin": "2024-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

---

## Jobs Endpoints

### Get Jobs (Public)
**GET** `/jobs`

Get paginated list of jobs with filtering options.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `search` (string): Search term
- `location` (string): Location filter
- `category` (string): Job category
- `type` (string): Job type (full-time, part-time, contract, internship, freelance)
- `experience` (string): Experience level (entry, mid, senior, executive)
- `remote` (boolean): Remote work filter
- `sortBy` (string): Sort field (default: createdAt)
- `sortOrder` (string): Sort order (asc, desc)

**Example Request:**
```
GET /api/jobs?page=1&limit=10&location=San Francisco&type=full-time&remote=true
```

**Response:**
```json
{
  "jobs": [
    {
      "_id": "job_id",
      "title": "Senior Frontend Developer",
      "description": "Job description...",
      "company": "TechCorp Inc.",
      "location": "San Francisco, CA",
      "type": "full-time",
      "category": "Software Development",
      "salary": {
        "min": 120000,
        "max": 180000,
        "currency": "USD",
        "period": "yearly"
      },
      "requirements": ["5+ years experience", "React knowledge"],
      "responsibilities": ["Develop features", "Code reviews"],
      "benefits": ["Health insurance", "401k"],
      "skills": ["React", "JavaScript", "TypeScript"],
      "experience": "senior",
      "education": "BS Computer Science",
      "remote": true,
      "hybrid": false,
      "onsite": true,
      "isFeatured": true,
      "isUrgent": false,
      "views": 150,
      "applicationsCount": 12,
      "expiresAt": "2024-02-01T00:00:00.000Z",
      "employer": {
        "_id": "employer_id",
        "firstName": "John",
        "lastName": "Smith",
        "company": "TechCorp Inc."
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalJobs": 50,
    "hasNextPage": true,
    "hasPrevPage": false,
    "limit": 10
  },
  "filters": {
    "search": "",
    "location": "San Francisco",
    "category": "",
    "type": "full-time",
    "experience": "",
    "remote": "true"
  }
}
```

### Get Job Details (Public)
**GET** `/jobs/{id}`

Get detailed information about a specific job.

**Response:**
```json
{
  "_id": "job_id",
  "title": "Senior Frontend Developer",
  "description": "Detailed job description...",
  "company": "TechCorp Inc.",
  "location": "San Francisco, CA",
  "type": "full-time",
  "category": "Software Development",
  "salary": {
    "min": 120000,
    "max": 180000,
    "currency": "USD",
    "period": "yearly"
  },
  "requirements": ["5+ years experience", "React knowledge"],
  "responsibilities": ["Develop features", "Code reviews"],
  "benefits": ["Health insurance", "401k"],
  "skills": ["React", "JavaScript", "TypeScript"],
  "experience": "senior",
  "education": "BS Computer Science",
  "remote": true,
  "hybrid": false,
  "onsite": true,
  "isFeatured": true,
  "isUrgent": false,
  "views": 150,
  "applicationsCount": 12,
  "expiresAt": "2024-02-01T00:00:00.000Z",
  "employer": {
    "_id": "employer_id",
    "firstName": "John",
    "lastName": "Smith",
    "company": "TechCorp Inc.",
    "email": "john@techcorp.com",
    "phone": "+1234567890"
  },
  "applications": [
    {
      "_id": "application_id",
      "applicant": {
        "_id": "applicant_id",
        "firstName": "Mike",
        "lastName": "Davis",
        "email": "mike@email.com"
      },
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Create Job (Employer/Admin Only)
**POST** `/jobs`

Create a new job posting.

**Request Body:**
```json
{
  "title": "Senior Frontend Developer",
  "description": "Job description...",
  "company": "TechCorp Inc.",
  "location": "San Francisco, CA",
  "type": "full-time",
  "category": "Software Development",
  "salary": {
    "min": 120000,
    "max": 180000,
    "currency": "USD",
    "period": "yearly"
  },
  "requirements": ["5+ years experience", "React knowledge"],
  "responsibilities": ["Develop features", "Code reviews"],
  "benefits": ["Health insurance", "401k"],
  "skills": ["React", "JavaScript", "TypeScript"],
  "experience": "senior",
  "education": "BS Computer Science",
  "remote": true,
  "hybrid": false,
  "onsite": true,
  "isFeatured": false,
  "isUrgent": false,
  "expiresAt": "2024-02-01T00:00:00.000Z"
}
```

### Update Job (Employer/Admin Only)
**PUT** `/jobs/{id}`

Update an existing job posting.

### Delete Job (Employer/Admin Only)
**DELETE** `/jobs/{id}`

Delete a job posting.

---

## Applications Endpoints

### Submit Application (Authenticated)
**POST** `/applications`

Submit a job application.

**Request Body:**
```json
{
  "jobId": "job_id",
  "coverLetter": "I am excited to apply for this position...",
  "resume": "https://example.com/resume.pdf",
  "salaryExpectation": 140000,
  "availability": "Available to start within 2 weeks"
}
```

**Response:**
```json
{
  "message": "Application submitted successfully",
  "application": {
    "_id": "application_id",
    "job": "job_id",
    "applicant": "user_id",
    "coverLetter": "I am excited to apply...",
    "resume": "https://example.com/resume.pdf",
    "status": "pending",
    "salaryExpectation": 140000,
    "availability": "Available to start within 2 weeks",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get Applications (Authenticated)
**GET** `/applications`

Get applications based on user role.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `status` (string): Application status filter
- `jobId` (string): Filter by specific job (employers only)

**Response for Job Seekers:**
```json
{
  "applications": [
    {
      "_id": "application_id",
      "job": {
        "_id": "job_id",
        "title": "Senior Frontend Developer",
        "company": "TechCorp Inc.",
        "location": "San Francisco, CA",
        "type": "full-time"
      },
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalApplications": 15,
    "hasNextPage": true,
    "hasPrevPage": false,
    "limit": 10
  }
}
```

**Response for Employers:**
```json
{
  "applications": [
    {
      "_id": "application_id",
      "job": {
        "_id": "job_id",
        "title": "Senior Frontend Developer",
        "company": "TechCorp Inc.",
        "location": "San Francisco, CA",
        "type": "full-time"
      },
      "applicant": {
        "_id": "applicant_id",
        "firstName": "Mike",
        "lastName": "Davis",
        "email": "mike@email.com"
      },
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalApplications": 25,
    "hasNextPage": true,
    "hasPrevPage": false,
    "limit": 10
  }
}
```

---

## User Profile Endpoints

### Get User Profile (Authenticated)
**GET** `/user/profile`

Get current user's profile information.

**Response:**
```json
{
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "jobseeker",
    "phone": "+1234567890",
    "company": "Company Name",
    "position": "Software Engineer",
    "location": "San Francisco, CA",
    "skills": ["JavaScript", "React", "Node.js"],
    "experience": "3 years of development",
    "education": "BS Computer Science",
    "resume": "https://example.com/resume.pdf",
    "profilePicture": "https://example.com/avatar.jpg",
    "isVerified": true,
    "isActive": true,
    "lastLogin": "2024-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update User Profile (Authenticated)
**PUT** `/user/profile`

Update current user's profile information.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "location": "San Francisco, CA",
  "skills": ["JavaScript", "React", "Node.js"],
  "experience": "3 years of development",
  "education": "BS Computer Science",
  "resume": "https://example.com/resume.pdf"
}
```

---

## Search Endpoints

### Advanced Job Search (Public)
**GET** `/search`

Advanced job search with multiple filters.

**Query Parameters:**
- `q` (string): Search query
- `location` (string): Location filter
- `category` (string): Job category
- `type` (string): Job type
- `experience` (string): Experience level
- `remote` (boolean): Remote work filter
- `salaryMin` (number): Minimum salary
- `salaryMax` (number): Maximum salary
- `skills` (string): Comma-separated skills
- `page` (number): Page number
- `limit` (number): Items per page
- `sortBy` (string): Sort field
- `sortOrder` (string): Sort order

**Example Request:**
```
GET /api/search?q=react developer&location=San Francisco&remote=true&salaryMin=100000&skills=React,JavaScript
```

**Response:**
```json
{
  "jobs": [
    {
      "_id": "job_id",
      "title": "Senior Frontend Developer",
      "description": "Job description...",
      "company": "TechCorp Inc.",
      "location": "San Francisco, CA",
      "type": "full-time",
      "category": "Software Development",
      "salary": {
        "min": 120000,
        "max": 180000,
        "currency": "USD",
        "period": "yearly"
      },
      "skills": ["React", "JavaScript", "TypeScript"],
      "experience": "senior",
      "remote": true,
      "employer": {
        "_id": "employer_id",
        "firstName": "John",
        "lastName": "Smith",
        "company": "TechCorp Inc."
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalJobs": 25,
    "hasNextPage": true,
    "hasPrevPage": false,
    "limit": 10
  },
  "filters": {
    "query": "react developer",
    "location": "San Francisco",
    "category": "",
    "type": "",
    "experience": "",
    "remote": "true",
    "salaryMin": "100000",
    "salaryMax": "",
    "skills": "React,JavaScript"
  }
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Access token required"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 409 Conflict
```json
{
  "error": "Resource already exists"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

API endpoints are subject to rate limiting:
- Authentication endpoints: 5 requests per minute
- Job endpoints: 100 requests per minute
- Search endpoints: 50 requests per minute

---

## Caching

The following endpoints use Redis caching:
- Job listings: 5-minute cache
- Job details: 10-minute cache
- Search results: 5-minute cache

Cache is automatically invalidated when data is updated.

---

## Testing with Sample Data

After running the seed script (`npm run seed`), you can test the API with these sample accounts:

### Admin Account
- Email: `admin@jobportal.com`
- Password: `admin123`

### Employer Account
- Email: `employer1@techcorp.com`
- Password: `employer123`

### Job Seeker Account
- Email: `jobseeker1@email.com`
- Password: `jobseeker123`

### Example API Calls

1. **Login as job seeker:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jobseeker1@email.com","password":"jobseeker123"}'
```

2. **Get jobs:**
```bash
curl http://localhost:3000/api/jobs?page=1&limit=5
```

3. **Search jobs:**
```bash
curl "http://localhost:3000/api/search?q=developer&location=San Francisco&remote=true"
```

4. **Apply to job (with token):**
```bash
curl -X POST http://localhost:3000/api/applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"jobId":"JOB_ID","coverLetter":"I am excited to apply...","resume":"https://example.com/resume.pdf"}'
``` 