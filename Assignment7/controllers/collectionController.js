import mongoose from "mongoose";
import Book from "../models/book.js";
import Author from "../models/author.js";
import Log from "../models/Log.js";

// ========================================
// 1. Create Explicit Collection "books" with Validation
// POST /collection/books
// ========================================
export const createBooksCollection = async (req, res) => {
  try {
    const db = mongoose.connection.db;

    // Create collection with validation
    await db.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              minLength: 1,
              description: "Title must be a non-empty string",
            },
          },
        },
      },
    });

    res.status(201).json({
      message: "Books collection created successfully with validation",
      collection: "books",
    });
  } catch (error) {
    // Collection might already exist
    if (error.code === 48) {
      return res.status(200).json({
        message: "Books collection already exists",
      });
    }
    res.status(500).json({ error: error.message });
  }
};

// ========================================
// 2. Create Implicit Collection "authors"
// POST /collection/authors
// ========================================
export const createAuthorsCollection = async (req, res) => {
  try {
    // Insert data directly to create implicit collection
    const author = new Author({
      name: "George Orwell",
      birthYear: 1903,
      nationality: "British",
    });

    await author.save();

    res.status(201).json({
      message: "Authors collection created implicitly by inserting data",
      collection: "authors",
      firstAuthor: author,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================================
// 3. Create Capped Collection "logs" (1MB)
// POST /collection/logs/capped
// ========================================
export const createLogsCollection = async (req, res) => {
  try {
    const db = mongoose.connection.db;

    // Create capped collection
    await db.createCollection("logs", {
      capped: true,
      size: 1024 * 1024, // 1MB
      max: 1000, // Max 1000 documents
    });

    res.status(201).json({
      message: "Logs capped collection created successfully",
      collection: "logs",
      size: "1MB",
      maxDocuments: 1000,
    });
  } catch (error) {
    if (error.code === 48) {
      return res.status(200).json({
        message: "Logs collection already exists",
      });
    }
    res.status(500).json({ error: error.message });
  }
};

// ========================================
// 4. Create Index on books.title
// POST /collection/books/index
// ========================================
export const createBooksIndex = async (req, res) => {
  try {
    // Create index on title field
    await Book.collection.createIndex({ title: 1 });

    res.status(201).json({
      message: "Index created on books.title field",
      index: { title: 1 },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
