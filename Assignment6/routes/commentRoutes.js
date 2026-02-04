import express from 'express'
import {
  bulkCreateComments,
  updateComment,
  findOrCreateComment,
  searchComments,
  newestComments,
  getCommentDetails,
} from '../controllers/commentController.js'

const router = express.Router()

router.post('/', bulkCreateComments)
router.patch('/:commentId', updateComment)
router.post('/find-or-create', findOrCreateComment)
router.get('/search', searchComments)
router.get('/newest/:postId', newestComments)
router.get('/details/:id', getCommentDetails)

export default router
