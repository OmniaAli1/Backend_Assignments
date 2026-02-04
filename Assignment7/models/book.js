import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [1, 'Title cannot be empty']
  },
  author: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genres: {
    type: [String],
    default: []
  }
}, {
  timestamps: true,
  collection: 'books'  
});

// Create index on title field
bookSchema.index({ title: 1 });

const Book = mongoose.model('Book', bookSchema);

export default Book;