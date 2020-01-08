const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
var multer = require('multer');

const app = express()

const db = require('./models/db')
const home = require('./router/home.router')
const auth = require('./router/auth.router')
const { authHome } = require('./middleware/home.middleware')

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'))


app.use(bodyParser.urlencoded({
    extended: false,
}));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));


const PORT = process.env.PORT || 5000

app.use('/auth', auth)
app.use('/', authHome, home)


app.use(function (req, res) {

    res.status(404)
    res.send('404 not found');
});


db.sync()
    .then(() => {
        console.log('Database ok');
    })
    .catch((err) => {
        console.log(err);
    })

app.listen(PORT, () => console.log(`App running ${PORT}`))