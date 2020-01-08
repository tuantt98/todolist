const Sequelize = require('sequelize');

var url = process.env.DATABASE_URL || "postgres://postgres:123@localhost:5432/todolistv2";
var db = new Sequelize(url,{
    logging: false,
    define:{
        freezeTableName: true // => không thêm s trong db 😈😈😈
    }
});

module.exports = db;