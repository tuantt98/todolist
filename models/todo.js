const Sequelize = require('sequelize');

const db = require('./db');

const todo = db.define('todo', {

    title: {
        type: Sequelize.TEXT
    },
    subtitle: {
        type: Sequelize.TEXT
    },
    content: {
        type: Sequelize.TEXT
    },
    status: {
        type: Sequelize.INTEGER
    },
    isuser: {
        type: Sequelize.INTEGER
    },
    slug:{
        type:Sequelize.TEXT
    }

})

module.exports = todo