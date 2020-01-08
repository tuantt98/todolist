const Sequelize = require('sequelize');

const db = require('./db');

const  users = db.define('users',{
    username:{
        type:Sequelize.TEXT
    },
    password:{
        type:Sequelize.TEXT
    },
    status:{
        type: Sequelize.INTEGER // 1 hiện, 0 ẩn
    },
    typeuser:{
        type: Sequelize.INTEGER // admin, thường, quản lý...
    },
    name:{
        type:Sequelize.TEXT
    }

})

module.exports = users