import { DataTypes, Sequelize } from 'sequelize'
import sequelize from '../services/sequelize.database.service'

export type Genre = {
    name: string
}

export const Genre = sequelize.define('genres', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})
