import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";
import { fn, col } from "sequelize";

export const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    
    // Validate input
    if (!title || !content || !userId) {
      return res.status(400).json({
        error: "Title, content, and userId are required"
      });
    }

    // Create using new instance and save
    const post = new Post(req.body);
    await post.save();
    
    res.status(201).json({
      message: "Post created successfully",
      post
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    
    // Check userId exists
    if (!userId) {
      return res.status(400).json({
        error: "User ID is required in request body"
      });
    }

    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Owner check
    if (post.userId !== parseInt(userId)) {
      return res.status(403).json({ 
        error: "Forbidden: You are not the owner of this post" 
      });
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostsDetails = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: User,
          as: "User",  
          attributes: ["id", "name"],
        },
        {
          model: Comment,
          as: "Comments",  
          attributes: ["id", "content"],
        },
      ],
    });

    res.json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostsCommentCount = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: [
        "id",
        "title",
        "content",
        "userId",
        "createdAt",
        "updatedAt",
        [fn("COUNT", col("Comments.id")), "commentCount"],
      ],
      include: [
        {
          model: Comment,
          as: "Comments", 
          attributes: [],
        },
      ],
      group: ["Post.id"],
      raw: false
    });

    res.json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};