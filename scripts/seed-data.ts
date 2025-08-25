import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../src/models/User';
import Job from '../src/models/Job';
import Application from '../src/models/Application';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Sample data
const sampleUsers = [
  {
    email: 'admin@jobportal.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin' as const,
    phone: '+1234567890',
    isVerified: true,
    isActive: true,
  },
  {
    email: 'employer1@techcorp.com',
    password: 'employer123',
    firstName: 'John',
    lastName: 'Smith',
    role: 'employer' as const,
    company: 'TechCorp Inc.',
    position: 'HR Manager',
    phone: '+1234567891',
    location: 'San Francisco, CA',
    isVerified: true,
    isActive: true,
  },
  {
    email: 'employer2@startup.com',
    password: 'employer123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'employer' as const,
    company: 'StartupXYZ',
    position: 'CEO',
    phone: '+1234567892',
    location: 'New York, NY',
    isVerified: true,
    isActive: true,
  },
  {
    email: 'jobseeker1@email.com',
    password: 'jobseeker123',
    firstName: 'Mike',
    lastName: 'Davis',
    role: 'jobseeker' as const,
    phone: '+1234567893',
    location: 'Austin, TX',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    experience: '3 years of full-stack development',
    education: 'BS Computer Science, University of Texas',
    isVerified: true,
    isActive: true,
  },
  {
    email: 'jobseeker2@email.com',
    password: 'jobseeker123',
    firstName: 'Emily',
    lastName: 'Wilson',
    role: 'jobseeker' as const,
    phone: '+1234567894',
    location: 'Seattle, WA',
    skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    experience: '2 years of backend development',
    education: 'MS Software Engineering, University of Washington',
    isVerified: true,
    isActive: true,
  },
  {
    email: 'jobseeker3@email.com',
    password: 'jobseeker123',
    firstName: 'David',
    lastName: 'Brown',
    role: 'jobseeker' as const,
    phone: '+1234567895',
    location: 'Chicago, IL',
    skills: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
    experience: '4 years of enterprise development',
    education: 'BS Information Technology, Illinois Institute of Technology',
    isVerified: true,
    isActive: true,
  },
];

const sampleJobs = [
  {
    title: 'Senior Frontend Developer',
    description: 'We are looking for a talented Senior Frontend Developer to join our team. You will be responsible for building user-friendly web applications using modern JavaScript frameworks.',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'full-time' as const,
    category: 'Software Development',
    salary: {
      min: 120000,
      max: 180000,
      currency: 'USD',
      period: 'yearly' as const,
    },
    requirements: [
      '5+ years of experience in frontend development',
      'Strong knowledge of React, Vue.js, or Angular',
      'Experience with modern CSS and responsive design',
      'Understanding of web accessibility standards',
      'Experience with Git and version control',
    ],
    responsibilities: [
      'Develop and maintain user-facing features',
      'Collaborate with design and backend teams',
      'Write clean, maintainable code',
      'Participate in code reviews',
      'Mentor junior developers',
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      'Flexible work hours and remote options',
      'Professional development budget',
      '401(k) matching',
    ],
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS3', 'HTML5', 'Git'],
    experience: 'senior' as const,
    education: 'BS in Computer Science or related field',
    remote: true,
    hybrid: false,
    onsite: true,
    isFeatured: true,
    isUrgent: false,
    status: 'active' as const,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  },
  {
    title: 'Backend Engineer',
    description: 'Join our backend team to build scalable APIs and microservices. We use Node.js, Python, and cloud technologies to deliver high-performance solutions.',
    company: 'StartupXYZ',
    location: 'New York, NY',
    type: 'full-time' as const,
    category: 'Software Development',
    salary: {
      min: 100000,
      max: 150000,
      currency: 'USD',
      period: 'yearly' as const,
    },
    requirements: [
      '3+ years of backend development experience',
      'Proficiency in Node.js, Python, or Go',
      'Experience with databases (MongoDB, PostgreSQL)',
      'Knowledge of cloud platforms (AWS, GCP)',
      'Understanding of RESTful APIs and microservices',
    ],
    responsibilities: [
      'Design and implement backend services',
      'Optimize database queries and performance',
      'Write unit and integration tests',
      'Deploy and maintain services in production',
      'Collaborate with frontend and DevOps teams',
    ],
    benefits: [
      'Competitive salary with equity',
      'Comprehensive health benefits',
      'Remote-first culture',
      'Learning and conference budget',
      'Flexible PTO policy',
    ],
    skills: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'],
    experience: 'mid' as const,
    education: 'BS in Computer Science or equivalent experience',
    remote: true,
    hybrid: true,
    onsite: false,
    isFeatured: false,
    isUrgent: true,
    status: 'active' as const,
    expiresAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days
  },
  {
    title: 'DevOps Engineer',
    description: 'We are seeking a DevOps Engineer to help us build and maintain our cloud infrastructure. You will work with modern tools and technologies to ensure our systems are reliable and scalable.',
    company: 'TechCorp Inc.',
    location: 'Remote',
    type: 'full-time' as const,
    category: 'DevOps',
    salary: {
      min: 110000,
      max: 160000,
      currency: 'USD',
      period: 'yearly' as const,
    },
    requirements: [
      '3+ years of DevOps or infrastructure experience',
      'Experience with AWS, Azure, or GCP',
      'Knowledge of Docker and Kubernetes',
      'Experience with CI/CD pipelines',
      'Understanding of monitoring and logging tools',
    ],
    responsibilities: [
      'Manage cloud infrastructure and services',
      'Automate deployment and scaling processes',
      'Monitor system performance and reliability',
      'Implement security best practices',
      'Collaborate with development teams',
    ],
    benefits: [
      'Competitive salary and benefits',
      'Remote work environment',
      'Professional development opportunities',
      'Health and wellness benefits',
      'Flexible work schedule',
    ],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Prometheus'],
    experience: 'mid' as const,
    education: 'BS in Computer Science or related field',
    remote: true,
    hybrid: false,
    onsite: false,
    isFeatured: false,
    isUrgent: false,
    status: 'active' as const,
    expiresAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days
  },
  {
    title: 'UI/UX Designer',
    description: 'Join our design team to create beautiful and intuitive user experiences. You will work closely with product managers and developers to bring designs to life.',
    company: 'StartupXYZ',
    location: 'New York, NY',
    type: 'full-time' as const,
    category: 'Design',
    salary: {
      min: 80000,
      max: 120000,
      currency: 'USD',
      period: 'yearly' as const,
    },
    requirements: [
      '2+ years of UI/UX design experience',
      'Proficiency in Figma, Sketch, or Adobe XD',
      'Understanding of user-centered design principles',
      'Experience with design systems and component libraries',
      'Portfolio demonstrating web and mobile design work',
    ],
    responsibilities: [
      'Create user interface designs and prototypes',
      'Conduct user research and usability testing',
      'Collaborate with product and development teams',
      'Maintain and evolve design systems',
      'Present design solutions to stakeholders',
    ],
    benefits: [
      'Competitive salary and equity',
      'Health and dental insurance',
      'Professional development budget',
      'Flexible work arrangements',
      'Creative and collaborative environment',
    ],
    skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
    experience: 'mid' as const,
    education: 'BS in Design, HCI, or related field',
    remote: true,
    hybrid: true,
    onsite: false,
    isFeatured: true,
    isUrgent: false,
    status: 'active' as const,
    expiresAt: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000), // 35 days
  },
  {
    title: 'Data Scientist',
    description: 'We are looking for a Data Scientist to help us extract insights from our data and build machine learning models. You will work with large datasets and cutting-edge technologies.',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'full-time' as const,
    category: 'Data Science',
    salary: {
      min: 130000,
      max: 190000,
      currency: 'USD',
      period: 'yearly' as const,
    },
    requirements: [
      '3+ years of data science experience',
      'Strong programming skills in Python or R',
      'Experience with machine learning frameworks',
      'Knowledge of SQL and big data technologies',
      'Understanding of statistical analysis and modeling',
    ],
    responsibilities: [
      'Develop and implement machine learning models',
      'Analyze large datasets to extract insights',
      'Create data visualizations and reports',
      'Collaborate with engineering and product teams',
      'Present findings to stakeholders',
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health benefits',
      'Professional development opportunities',
      'Flexible work environment',
      'Access to cutting-edge tools and technologies',
    ],
    skills: ['Python', 'R', 'SQL', 'TensorFlow', 'PyTorch', 'Tableau'],
    experience: 'senior' as const,
    education: 'MS or PhD in Statistics, Computer Science, or related field',
    remote: true,
    hybrid: true,
    onsite: true,
    isFeatured: false,
    isUrgent: true,
    status: 'active' as const,
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
  },
];

const sampleApplications = [
  {
    coverLetter: 'I am excited to apply for the Senior Frontend Developer position at TechCorp Inc. With 3 years of experience in React and modern JavaScript, I believe I would be a great fit for your team. I have worked on several large-scale applications and have experience mentoring junior developers.',
    resume: 'https://example.com/resume1.pdf',
    salaryExpectation: 140000,
    availability: 'Available to start within 2 weeks',
    status: 'pending' as const,
  },
  {
    coverLetter: 'I am interested in the Backend Engineer position at StartupXYZ. My experience with Node.js and MongoDB aligns perfectly with your requirements. I have built scalable APIs and microservices, and I am passionate about cloud technologies.',
    resume: 'https://example.com/resume2.pdf',
    salaryExpectation: 120000,
    availability: 'Available immediately',
    status: 'reviewed' as const,
  },
  {
    coverLetter: 'I would love to join your team as a UI/UX Designer. I have 2 years of experience creating user-centered designs and have worked with various design tools. I am particularly interested in your focus on user research and design systems.',
    resume: 'https://example.com/resume3.pdf',
    salaryExpectation: 95000,
    availability: 'Available to start in 3 weeks',
    status: 'shortlisted' as const,
  },
];

async function seedUsers() {
  console.log('👥 Seeding users...');
  
  for (const userData of sampleUsers) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`⚠️  User ${userData.email} already exists, skipping...`);
        continue;
      }

      // Hash password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Create user
      const user = new User({
        ...userData,
        password: hashedPassword,
      });

      await user.save();
      console.log(`✅ Created user: ${userData.email} (${userData.role})`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`❌ Error creating user ${userData.email}:`, errorMessage);
    }
  }
}

async function seedJobs() {
  console.log('\n💼 Seeding jobs...');
  
  // Get employer users
  const employers = await User.find({ role: 'employer' });
  if (employers.length === 0) {
    console.log('⚠️  No employer users found, skipping job creation...');
    return;
  }

  for (let i = 0; i < sampleJobs.length; i++) {
    try {
      const jobData = sampleJobs[i];
      const employer = employers[i % employers.length]; // Distribute jobs among employers

      // Check if job already exists
      const existingJob = await Job.findOne({ 
        title: jobData.title, 
        company: jobData.company 
      });
      
      if (existingJob) {
        console.log(`⚠️  Job "${jobData.title}" already exists, skipping...`);
        continue;
      }

      // Create job
      const job = new Job({
        ...jobData,
        employer: employer._id,
      });

      await job.save();
      console.log(`✅ Created job: ${jobData.title} at ${jobData.company}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`❌ Error creating job:`, errorMessage);
    }
  }
}

async function seedApplications() {
  console.log('\n📝 Seeding applications...');
  
  // Get job seeker users
  const jobSeekers = await User.find({ role: 'jobseeker' });
  if (jobSeekers.length === 0) {
    console.log('⚠️  No job seeker users found, skipping application creation...');
    return;
  }

  // Get active jobs
  const jobs = await Job.find({ status: 'active' });
  if (jobs.length === 0) {
    console.log('⚠️  No active jobs found, skipping application creation...');
    return;
  }

  for (let i = 0; i < sampleApplications.length; i++) {
    try {
      const applicationData = sampleApplications[i];
      const jobSeeker = jobSeekers[i % jobSeekers.length];
      const job = jobs[i % jobs.length];

      // Check if application already exists
      const existingApplication = await Application.findOne({
        job: job._id,
        applicant: jobSeeker._id,
      });

      if (existingApplication) {
        console.log(`⚠️  Application for job "${job.title}" by ${jobSeeker.email} already exists, skipping...`);
        continue;
      }

      // Create application
      const application = new Application({
        ...applicationData,
        job: job._id,
        applicant: jobSeeker._id,
      });

      await application.save();

      // Update job applications count
      await Job.findByIdAndUpdate(job._id, { $inc: { applicationsCount: 1 } });

      console.log(`✅ Created application: ${jobSeeker.firstName} ${jobSeeker.lastName} applied to ${job.title}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`❌ Error creating application:`, errorMessage);
    }
  }
}

async function displayStats() {
  console.log('\n📊 Database Statistics:');
  
  const userCount = await User.countDocuments();
  const jobCount = await Job.countDocuments();
  const applicationCount = await Application.countDocuments();
  
  console.log(`👥 Users: ${userCount}`);
  console.log(`💼 Jobs: ${jobCount}`);
  console.log(`📝 Applications: ${applicationCount}`);
  
  // Display users by role
  const adminCount = await User.countDocuments({ role: 'admin' });
  const employerCount = await User.countDocuments({ role: 'employer' });
  const jobSeekerCount = await User.countDocuments({ role: 'jobseeker' });
  
  console.log(`   - Admins: ${adminCount}`);
  console.log(`   - Employers: ${employerCount}`);
  console.log(`   - Job Seekers: ${jobSeekerCount}`);
  
  // Display jobs by status
  const activeJobs = await Job.countDocuments({ status: 'active' });
  const featuredJobs = await Job.countDocuments({ isFeatured: true });
  const urgentJobs = await Job.countDocuments({ isUrgent: true });
  
  console.log(`   - Active Jobs: ${activeJobs}`);
  console.log(`   - Featured Jobs: ${featuredJobs}`);
  console.log(`   - Urgent Jobs: ${urgentJobs}`);
}

async function main() {
  try {
    console.log('🚀 Starting database seeding...\n');
    
    // Connect to database
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal';
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB\n');
    
    // Seed data
    await seedUsers();
    await seedJobs();
    await seedApplications();
    
    // Display statistics
    await displayStats();
    
    console.log('\n🎉 Seeding completed successfully!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('👤 Admin: admin@jobportal.com / admin123');
    console.log('🏢 Employer: employer1@techcorp.com / employer123');
    console.log('👨‍💼 Job Seeker: jobseeker1@email.com / jobseeker123');
    
    await mongoose.disconnect();
    console.log('\n✅ Database connection closed');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeding script
main(); 