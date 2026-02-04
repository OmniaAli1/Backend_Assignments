import User from './user.js'      
import Post from './post.js'      
import Comment from './comment.js'

User.hasMany(Post, {
  foreignKey: 'userId',
  as: 'posts'    
})

Post.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User'          
})

Post.hasMany(Comment, {
  foreignKey: 'postId',
  as: 'Comments'      
})

Comment.belongsTo(Post, {
  foreignKey: 'postId',
  as: 'Post'              
})

User.hasMany(Comment, {
  foreignKey: 'userId',
  as: 'comments'
})

Comment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User'        
})

export { User, Post, Comment }  