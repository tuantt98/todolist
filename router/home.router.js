var multer = require('multer');
const Router = require('express').Router;
const router = new Router();



const { getHome, getHomeAdd, getHomeFile, postHomeFile, postHomeDeleteFile ,postHomeAdd} = require('../controller/home.controller')


var storage = multer.diskStorage({
    destination: 'public/upload/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage });


router.get('/', getHome);
router.get('/add', getHomeAdd)
router.post('/add',postHomeAdd)
router.get('/files', getHomeFile)
router.post('/delete_file', postHomeDeleteFile)
router.post('/upload', upload.array('flFileUpload', Infinity), postHomeFile)
module.exports = router