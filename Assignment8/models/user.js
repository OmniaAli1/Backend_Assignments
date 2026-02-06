import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { encryptPhone } from '../utils/encryption.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required']
  },
  age: {
    type: Number,
    min: [18, 'Age must be at least 18'],
    max: [60, 'Age must not exceed 60'],
    validate: {
      validator: function(v) {
        return v >= 18 && v <= 60;
      },
      message: 'Age must be between 18 and 60'
    }
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function() {
  // Only hash password if it's modified
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  
  // Only encrypt phone if it's modified
  if (this.isModified('phone')) {
    this.phone = encryptPhone(this.phone);
  }
  
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;