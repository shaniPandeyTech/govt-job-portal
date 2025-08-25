import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function clearDatabase() {
  try {
    console.log('🗑️  Clearing database...');
    
    // Connect to database
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal';
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
    
    // Clear all collections
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    
    const collections = await db.listCollections().toArray();
    
    for (const collection of collections) {
      await db.collection(collection.name).deleteMany({});
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
clearDatabase(); 