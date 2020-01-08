const user = require('../models/user'),
    bcrypt = require("bcrypt"),
    saltRounds = 10;

module.exports.authGet = async (req, res) => {
    res.render('auth/login')
}

module.exports.authPostLogin = async (req, res) => {

    let { username, password } = req.body

    console.log({ username, password })
    let currentUser = await user.findOne({
        where: {
            username,
            status: 1
        }
    })
    if (!currentUser) {
        res.redirect('/auth')
    } else {
        if (bcrypt.compareSync(password, currentUser.password)) {
            req.session.userID = currentUser.id
            req.session.userType = currentUser.typeuser
            res.redirect('/')
        } else {
            res.redirect('/auth')
        }
    }
    // res.send(req.body)
}
module.exports.authGetRegister = async (req, res) => {
    res.render('auth/register', { errMessage: '' })
}
module.exports.authPostRegister = async (req, res) => {
    let { username, password, name } = req.body

    let currentUser = await user.findOne({
        where: {
            username
        }
    })
    if (currentUser) {
        res.render('auth/register', { errMessage: 'Tên tài khoản đã tồn tại' })
    } else {
        let hashPassword = bcrypt.hashSync(password, saltRounds)
        await user.create({
            username,
            password: hashPassword,
            name,
            status: 1,
            typeuser: 0
        })
        res.redirect('/auth')
    }
}

module.exports.authGetLogout =  (req, res) => {
    delete req.session.userID
    delete req.session.userType
    res.redirect('/auth')
}