import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthYear: {
    type: Number
  },
  nationality: {
    type: String
  }
}, {
  timestamps: true
});

const Author = mongoose.model('Author', authorSchema);

export default Author;