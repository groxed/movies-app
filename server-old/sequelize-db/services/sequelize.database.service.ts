import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.SEQUELIZE_DB_USERNAME!,
    process.env.SEQUELIZE_DB_PASSWORD!,
    {
        host: process.env.LOCALHOST_URL,
        dialect: 'mysql',
    }
)

export default sequelize
