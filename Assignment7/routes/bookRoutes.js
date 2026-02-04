import express from 'express';
import {
  insertOneBook,
  insertMultipleBooks,
  updateBookByTitle,
  findBookByTitle,
  findBooksByYearRange,
  findBooksByGenre,
  skipLimitSort,
  findBooksYearInteger,
  excludeGenres,
  deleteBooksBeforeYear,
  aggregateFilterSort,
  aggregateProjectFields,
  aggregateUnwindGenres,
  aggregateJoinLogs
} from '../controllers/bookController.js';

const router = express.Router();

router.post('/', insertOneBook);

router.post('/batch', insertMultipleBooks);

router.patch('/:title', updateBookByTitle);

router.get('/title', findBookByTitle);

router.get('/year', findBooksByYearRange);

router.get('/genre', findBooksByGenre);

router.get('/skip-limit', skipLimitSort);

router.get('/year-integer', findBooksYearInteger);

router.get('/exclude-genres', excludeGenres);

router.delete('/before-year', deleteBooksBeforeYear);

router.get('/aggregate1', aggregateFilterSort);

router.get('/aggregate2', aggregateProjectFields);

router.get('/aggregate3', aggregateUnwindGenres);

router.get('/aggregate4', aggregateJoinLogs);

export default router;