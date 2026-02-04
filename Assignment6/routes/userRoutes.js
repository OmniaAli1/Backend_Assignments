import express from 'express'
import {
  signup,
  updateOrCreateUser,
  getUserByEmail,
  getUserById,
} from '../controllers/userController.js'

const router = express.Router()

router.post('/signup', signup)
router.put('/:id', updateOrCreateUser)
router.get('/by-email', getUserByEmail)
router.get('/:id', getUserById)

export default router
