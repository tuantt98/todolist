const Router = require('express').Router;
const router = new Router();

const {getHome} = require('../controller/home.controller')

router.get('/',getHome);

module.exports = router