import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  actor: {
    type: String,
    required: true,
  }
});

const issueSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Reported', 'Assigned', 'In Progress', 'Fixed', 'Verified'],
      default: 'Reported',
    },
    assignedDepartment: {
      type: String,
      default: 'General Municipal Operations',
    },
    location: {
      address: String,
      lat: Number,
      lng: Number,
    },
    image: {
      type: String,
      required: [true, 'Please add an image of the issue'],
    },
    beforeAfterImage: {
      before: String,
      after: String,
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
    aiDetection: {
      category: String,
      confidence: Number,
      detectedObject: String,
    },
    slaDueDate: {
      type: Date,
    },
    timeline: [timelineSchema],
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate customId if not exists
issueSchema.pre('save', async function (next) {
  if (!this.customId) {
    // A simple approach for incremental custom IDs is counting documents
    const count = await this.constructor.countDocuments();
    this.customId = `CITY-${101 + count}`;
  }
  next();
});

const Issue = mongoose.model('Issue', issueSchema);
export default Issue;
