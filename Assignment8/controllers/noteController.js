import Note from '../models/note.js';

// B-1: Create Note
export const createNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, content } = req.body;
    const note = new Note({ title, content, userId });
    await note.save();
    res.status(201).json({ message: 'Note created successfully', note });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ error: error.message });
  }
};

// B-2: Update Note (PATCH)
export const updateNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { noteId } = req.params;
    const { title, content } = req.body;
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    if (note.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Forbidden: You can only update your own notes' });
    }
    const updatedNote = await Note.findByIdAndUpdate(noteId, { title, content }, { new: true, runValidators: true });
    res.json({ message: 'Note updated successfully', note: updatedNote });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: Object.values(error.errors).map(err => err.message) });
    }
    res.status(500).json({ error: error.message });
  }
};

// B-3: Replace Note (PUT)
export const replaceNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { noteId } = req.params;
    const { title, content } = req.body;
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    if (note.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Forbidden: You can only replace your own notes' });
    }
    const replacedNote = await Note.findOneAndReplace({ _id: noteId }, { title, content, userId }, { new: true, runValidators: true });
    res.json({ message: 'Note replaced successfully', note: replacedNote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// B-4: Update All Notes Titles
export const updateAllNotesTitles = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const result = await Note.updateMany({ userId }, { title }, { runValidators: true });
    res.json({ message: 'All notes updated successfully', modifiedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// B-5: Delete Note
export const deleteNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    if (note.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Forbidden: You can only delete your own notes' });
    }
    const deletedNote = await Note.findByIdAndDelete(noteId);
    res.json({ message: 'Note deleted successfully', note: deletedNote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// B-6: Paginated Notes
export const getPaginatedNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const notes = await Note.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Note.countDocuments({ userId });
    res.json({ page, limit, totalNotes: total, totalPages: Math.ceil(total / limit), notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// B-7: Get Note by ID
export const getNoteById = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    if (note.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Forbidden: You can only view your own notes' });
    }
    res.json({ note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// B-8: Get Note by Content
export const getNoteByContent = async (req, res) => {
  try {
    const userId = req.userId;
    const { content } = req.query;
    if (!content) return res.status(400).json({ error: 'Content query parameter is required' });
    const note = await Note.findOne({ userId, content: { $regex: content, $options: 'i' } });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// B-9: Notes with User Info
export const getNotesWithUser = async (req, res) => {
  try {
    const userId = req.userId;
    const notes = await Note.find({ userId }).select('title userId createdAt').populate({ path: 'userId', select: 'email' });
    res.json({ count: notes.length, notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// B-10: Aggregate Notes
export const getNotesAggregate = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.query;
    const matchStage = { userId };
    if (title) matchStage.title = { $regex: title, $options: 'i' };
    const notes = await Note.aggregate([
      { $match: matchStage },
      { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'userInfo' } },
      { $unwind: '$userInfo' },
      { $project: { _id: 1, title: 1, content: 1, createdAt: 1, updatedAt: 1, 'userInfo.name': 1, 'userInfo.email': 1 } }
    ]);
    res.json({ count: notes.length, notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// B-11: Delete All Notes
export const deleteAllNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await Note.deleteMany({ userId });
    res.json({ message: 'All notes deleted successfully', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};