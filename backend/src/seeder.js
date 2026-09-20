import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Issue from './models/Issue.js';
import { initialIssues } from './data/sampleIssues.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Issue.deleteMany();
    await User.deleteMany();

    // Create Admin User
    const adminUser = await User.create({
      name: 'Supervisor Chief Miller',
      email: 'miller@citygov.org',
      password: 'password123',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    });

    // Create Citizen Users
    const citizen1 = await User.create({
      name: 'Alex Rivera',
      email: 'alex.rivera@civicnet.org',
      password: 'password123',
      role: 'citizen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    });

    const citizen2 = await User.create({
      name: 'Marcus Chen',
      email: 'marcus@civicnet.org',
      password: 'password123',
      role: 'citizen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    });

    // Map sample issues
    const sampleIssuesToInsert = initialIssues.map((issue, index) => {
      // Map reporter randomly or based on name
      let reporterId = citizen1._id;
      if (issue.reporter.name === 'Marcus Chen') {
        reporterId = citizen2._id;
      }

      return {
        ...issue,
        customId: issue.id,
        reporter: reporterId,
        upvotedBy: [citizen1._id, citizen2._id], // Mock upvotes
        upvotes: issue.upvotes
      };
    });

    await Issue.insertMany(sampleIssuesToInsert);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with Seeder: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Issue.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error with Seeder: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
