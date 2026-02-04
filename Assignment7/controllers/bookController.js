import Book from "../models/book.js";
import Log from "../models/Log.js";

export const insertOneBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();

    res.status(201).json({
      message: "Book inserted successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const insertMultipleBooks = async (req, res) => {
  try {
    const { books } = req.body;

    if (!books || !Array.isArray(books) || books.length < 3) {
      return res.status(400).json({
        error: "Please provide at least 3 books in the books array",
      });
    }

    const insertedBooks = await Book.insertMany(books);

    res.status(201).json({
      message: `${insertedBooks.length} books inserted successfully`,
      books: insertedBooks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBookByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const { year } = req.body;

    const book = await Book.findOneAndUpdate(
      { title },
      { year },
      { new: true },
    );

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findBookByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res
        .status(400)
        .json({ error: "Title query parameter is required" });
    }

    const book = await Book.findOne({ title });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findBooksByYearRange = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        error: "Both from and to query parameters are required",
      });
    }

    const books = await Book.find({
      year: {
        $gte: parseInt(from),
        $lte: parseInt(to),
      },
    });

    res.json({
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findBooksByGenre = async (req, res) => {
  try {
    const { genre } = req.query;

    if (!genre) {
      return res
        .status(400)
        .json({ error: "Genre query parameter is required" });
    }

    const books = await Book.find({
      genres: genre,
    });

    res.json({
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const skipLimitSort = async (req, res) => {
  try {
    const books = await Book.find().skip(2).limit(3).sort({ year: -1 });

    res.json({
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findBooksYearInteger = async (req, res) => {
  try {
    const books = await Book.find({
      year: { $type: "number" },
    });

    res.json({
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const excludeGenres = async (req, res) => {
  try {
    const books = await Book.find({
      genres: { $nin: ["Horror", "Science Fiction"] },
    });

    res.json({
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBooksBeforeYear = async (req, res) => {
  try {
    const { year } = req.query;

    if (!year) {
      return res
        .status(400)
        .json({ error: "Year query parameter is required" });
    }

    const result = await Book.deleteMany({
      year: { $lt: parseInt(year) },
    });

    res.json({
      message: `${result.deletedCount} books deleted`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const aggregateFilterSort = async (req, res) => {
  try {
    const books = await Book.aggregate([
      {
        $match: { year: { $gt: 2000 } },
      },
      {
        $sort: { year: -1 },
      },
    ]);

    res.json({
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const aggregateProjectFields = async (req, res) => {
  try {
    const books = await Book.aggregate([
      {
        $match: { year: { $gt: 2000 } },
      },
      {
        $project: {
          _id: 0,
          title: 1,
          author: 1,
          year: 1,
        },
      },
    ]);

    res.json({
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const aggregateUnwindGenres = async (req, res) => {
  try {
    const result = await Book.aggregate([
      {
        $unwind: "$genres",
      },
      {
        $project: {
          title: 1,
          author: 1,
          genre: "$genres",
        },
      },
    ]);

    res.json({
      count: result.length,
      books: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const aggregateJoinLogs = async (req, res) => {
  try {
    const result = await Book.aggregate([
      {
        $lookup: {
          from: "logs",
          localField: "title",
          foreignField: "message",
          as: "relatedLogs",
        },
      },
    ]);

    res.json({
      count: result.length,
      books: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
