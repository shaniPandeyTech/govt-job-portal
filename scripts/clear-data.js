import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import models
let User, Job, Application;

try {
  User = (await import(path.join(__dirname, '../src/models/User.js'))).default;
  Job = (await import(path.join(__dirname, '../src/models/Job.js'))).default;
  Application = (await import(path.join(__dirname, '../src/models/Application.js'))).default;
} catch (error) {
  console.error('❌ Error importing models:', error.message);
  console.log('💡 Make sure to compile TypeScript files first: npx tsc');
  process.exit(1);
}

async function clearDatabase() {
  try {
    console.log('🗑️  Clearing database...');
    
    // Connect to database
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal';
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
    
    // Clear all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    for (const collection of collections) {
      await mongoose.connection.db.collection(collection.name).deleteMany({});
      console.log(`🗑️  Cleared collection: ${collection.name}`);
    }
    
    console.log('\n✅ Database cleared successfully!');
    console.log('💡 Run "npm run seed" to populate with sample data');
    
    await mongoose.disconnect();
    console.log('✅ Database connection closed');
    
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
}

// Run the clear script
(async () => {
  await clearDatabase();
})(); 