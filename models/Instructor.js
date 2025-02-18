import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address']
  },
  bio: {
    type: String,
    required: true
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  profilePicture: {
    type: String,
    default: 'default-profile-pic.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Instructor', instructorSchema);
