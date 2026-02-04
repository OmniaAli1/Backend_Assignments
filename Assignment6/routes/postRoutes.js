import express from 'express'
import {
  createPost,
  deletePost,
  getPostsDetails,
  getPostsCommentCount,
} from '../controllers/postController.js'

const router = express.Router()

router.post('/', createPost)
router.delete('/:postId', deletePost)
router.get('/details', getPostsDetails)
router.get('/comment-count', getPostsCommentCount)

export default router
