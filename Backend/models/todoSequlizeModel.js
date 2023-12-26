const sequelize =require('./config')
const {DataTypes} =require('sequelize')

const Todos = sequelize.define('todos', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    todo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW,
    }
},
);

module.exports = {Todos}




