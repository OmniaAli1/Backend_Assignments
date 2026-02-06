import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Sticky Notes API',
    endpoints: {
      users: {
        signup: 'POST /users/signup',
        login: 'POST /users/login',
        update: 'PATCH /users (requires token)',
        delete: 'DELETE /users (requires token)',
        get: 'GET /users (requires token)'
      },
      notes: {
        create: 'POST /notes (requires token)',
        update: 'PATCH /notes/:noteId (requires token)',
        replace: 'PUT /notes/replace/:noteId (requires token)',
        updateAll: 'PATCH /notes/all (requires token)',
        delete: 'DELETE /notes/:noteId (requires token)',
        paginate: 'GET /notes/paginate-sort?page=1&limit=10 (requires token)',
        getById: 'GET /notes/:id (requires token)',
        getByContent: 'GET /notes/note-by-content?content=xxx (requires token)',
        withUser: 'GET /notes/note-with-user (requires token)',
        aggregate: 'GET /notes/aggregate?title=xxx (requires token)',
        deleteAll: 'DELETE /notes (requires token)'
      },
      authentication: 'Send token in headers: Authorization: Bearer <token> OR token: <token>'
    }
  });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
