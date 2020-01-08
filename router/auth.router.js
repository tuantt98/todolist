const Router = require('express').Router;
const router = new Router();

const user = require('../models/user')
const {authGet,authPostLogin,authGetRegister,authPostRegister,authGetLogout} = require('../controller/auth.controller')

router.get('/',authGet)
router.post('/login',authPostLogin)
router.get('/dang-ky',authGetRegister)
router.post('/dang-ky',authPostRegister)
router.get('/logout',authGetLogout)

module.exports = router