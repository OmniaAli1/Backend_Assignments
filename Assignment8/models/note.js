import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    validate: {
      // Custom validator: Title must not be entirely uppercase
      validator: function(v) {
        return v !== v.toUpperCase();
      },
      message: 'Title must not be entirely uppercase'
    }
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  }
}, {
  timestamps: true 
});

const Note = mongoose.model('Note', noteSchema);

export default Note;