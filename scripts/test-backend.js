const mongoose = require('mongoose');
const Redis = require('ioredis');

// Test database connection
async function testDatabase() {
  console.log('🔍 Testing MongoDB connection...');
  
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal';
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');
    
    // Test basic operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📊 Found ${collections.length} collections in database`);
    
    await mongoose.disconnect();
    console.log('✅ MongoDB test completed');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

// Test Redis connection
async function testRedis() {
  console.log('🔍 Testing Redis connection...');
  
  try {
    const redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD || undefined,
    });

    // Test basic operations
    await redis.set('test', 'Hello Redis!');
    const value = await redis.get('test');
    await redis.del('test');
    
    if (value === 'Hello Redis!') {
      console.log('✅ Redis connection and operations successful');
    } else {
      throw new Error('Redis value mismatch');
    }
    
    await redis.disconnect();
    console.log('✅ Redis test completed');
  } catch (error) {
    console.error('❌ Redis connection failed:', error.message);
    process.exit(1);
  }
}

// Test environment variables
function testEnvironment() {
  console.log('🔍 Testing environment variables...');
  
  const requiredVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'REDIS_HOST',
    'REDIS_PORT'
  ];
  
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('❌ Missing environment variables:', missing.join(', '));
    console.log('💡 Make sure to set up your .env.local file');
    process.exit(1);
  }
  
  console.log('✅ Environment variables configured');
}

// Main test function
async function runTests() {
  console.log('🚀 Starting backend tests...\n');
  
  testEnvironment();
  console.log('');
  
  await testDatabase();
  console.log('');
  
  await testRedis();
  console.log('');
  
  console.log('🎉 All tests passed! Backend is ready to use.');
  console.log('💡 Start the development server with: npm run dev');
}

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Run tests
runTests().catch(console.error); 