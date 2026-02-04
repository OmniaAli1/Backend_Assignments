import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('blog_system', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})

export default sequelize
