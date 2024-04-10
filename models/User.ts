import { Schema, model, Document } from 'mongoose';

interface User extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  mobile: string;
  password: string;
  dateJoined: Date;
  isBlocked: boolean;
}


const userSchema = new Schema<User>({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  mobile: {
    type: String,
    required:true,
    trim: true,
    unique:true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  password: {
    type: String,
    minlength: 8
  },
  dateJoined: {
    type: Date,
    default: Date.now
  },
  isBlocked: {
    type: Boolean,
    default: false
  }
});


const User = model<User>('User', userSchema, 'user');
export default User;