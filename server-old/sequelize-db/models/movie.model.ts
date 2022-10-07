import { DataTypes, Sequelize } from 'sequelize'
import sequelize from '../services/sequelize.database.service'

export type Movie = {
    name: string
    time: string[]
    rating: number
    genreId?: number
}

export const Movie = sequelize.define('movies', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('time').split(';')
        },
        set(timeArr: string[]) {
            this.setDataValue('time', timeArr.join(';'))
        },
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})
