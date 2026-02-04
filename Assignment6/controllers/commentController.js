import Comment from "../models/comment.js";
import User from "../models/user.js";
import Post from "../models/post.js";
import { Op } from "sequelize";

export const bulkCreateComments = async (req, res) => {
  try {
    const { comments } = req.body;  // ✅ تصحيح
    
    // Validate input
    if (!comments || !Array.isArray(comments) || comments.length === 0) {
      return res.status(400).json({
        error: "Comments array is required and must not be empty"
      });
    }

    const createdComments = await Comment.bulkCreate(comments);
    
    res.status(201).json({
      message: `${createdComments.length} comments created successfully`,
      comments: createdComments
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;
    
    // Validate input
    if (!userId || !content) {
      return res.status(400).json({
        error: "User ID and content are required in request body"
      });
    }

    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Owner check
    if (comment.userId !== parseInt(userId)) {
      return res.status(403).json({ 
        error: "Forbidden: You are not the owner of this comment" 
      });
    }

    await comment.update({ content });
    
    res.json({
      message: "Comment updated successfully",
      comment
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const findOrCreateComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;
    
    // Validate input
    if (!postId || !userId || !content) {
      return res.status(400).json({
        error: "PostId, userId, and content are required"
      });
    }

    const [comment, created] = await Comment.findOrCreate({
      where: { postId, userId, content },
      defaults: { postId, userId, content }
    });

    res.status(created ? 201 : 200).json({
      message: created ? "Comment created" : "Comment already exists",
      comment,
      created 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchComments = async (req, res) => {
  try {
    const { word } = req.query;
    
    // Validate input
    if (!word) {
      return res.status(400).json({
        error: "Word query parameter is required"
      });
    }

    const { count, rows } = await Comment.findAndCountAll({
      where: {
        content: {
          [Op.like]: `%${word}%`,
        },
      },
    });

    res.json({
      count,
      message: `Found ${count} comments containing "${word}"`,
      comments: rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const newestComments = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const comments = await Comment.findAll({
      where: { postId: parseInt(postId) },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    res.json({
      postId: parseInt(postId),
      count: comments.length,
      comments
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCommentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    
    const comment = await Comment.findByPk(id, {
      include: [
        {
          model: User,
          as: "User",
          attributes: ["id", "name", "email"]
        },
        {
          model: Post,
          as: "Post",  
          attributes: ["id", "title", "content"]
        }
      ],
    });
    
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ comment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};