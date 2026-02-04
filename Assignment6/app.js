import express from 'express'
import sequelize from './config/config.js'
import './models/associations.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'

const app = express()
app.use(express.json())

app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on port 5000')
  })
})
