import express from 'express';
import connectDB from './config/database.js';
import collectionRoutes from './routes/collectionRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import logRoutes from './routes/logRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/collection', collectionRoutes);
app.use('/books', bookRoutes);
app.use('/logs', logRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Library_Management - MongoDB API',
    endpoints: {
      collections: {
        createBooks: 'POST /collection/books',
        createAuthors: 'POST /collection/authors',
        createLogs: 'POST /collection/logs/capped',
        createIndex: 'POST /collection/books/index'
      },
      books: {
        insertOne: 'POST /books',
        insertBatch: 'POST /books/batch',
        updateByTitle: 'PATCH /books/:title',
        findByTitle: 'GET /books/title?title=xxx',
        findByYear: 'GET /books/year?from=1990&to=2010',
        findByGenre: 'GET /books/genre?genre=xxx',
        skipLimit: 'GET /books/skip-limit',
        yearInteger: 'GET /books/year-integer',
        excludeGenres: 'GET /books/exclude-genres',
        deleteBeforeYear: 'DELETE /books/before-year?year=2000',
        aggregate1: 'GET /books/aggregate1',
        aggregate2: 'GET /books/aggregate2',
        aggregate3: 'GET /books/aggregate3',
        aggregate4: 'GET /books/aggregate4'
      },
      logs: {
        insertLog: 'POST /logs'
      }
    }
  });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Visit http://localhost:${PORT} for API documentation`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;