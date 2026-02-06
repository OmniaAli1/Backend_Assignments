import express from 'express';
import {
  createNote,
  updateNote,
  replaceNote,
  updateAllNotesTitles,
  deleteNote,
  getPaginatedNotes,
  getNoteById,
  getNoteByContent,
  getNotesWithUser,
  getNotesAggregate,
  deleteAllNotes
} from '../controllers/noteController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// B-1: Create Note
router.post('/', createNote);

// B-4: Update All Notes Titles 
router.patch('/all', updateAllNotesTitles);

// B-6: Get Paginated Notes
router.get('/paginate-sort', getPaginatedNotes);

// B-8: Get Note by Content
router.get('/note-by-content', getNoteByContent);

// B-9: Get Notes with User Info 
router.get('/note-with-user', getNotesWithUser);

// B-10: Aggregate Notes
router.get('/aggregate', getNotesAggregate);

// B-3: Replace Note 
router.put('/replace/:noteId', replaceNote);

// B-11: Delete All Notes
router.delete('/', deleteAllNotes);

// B-2: Update Note (PATCH)
router.patch('/:noteId', updateNote);

// B-5: Delete Note
router.delete('/:noteId', deleteNote);

// B-7: Get Note by ID
router.get('/:id', getNoteById);

export default router;