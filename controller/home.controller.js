var fs = require('fs')
const todolist = require('../models/todo')

// Function chung
function to_slug(str) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
}


module.exports.getHome = async (req, res) => {

    let allTodos = await todolist.findAll()
    res.render('client/home', { allTodos })
}

module.exports.getHomeAdd = (req, res) => {
    res.render('client/add')
}

module.exports.getHomeFile = (req, res) => {

    const images = fs.readdirSync('public/upload')
    var sorted = []
    for (let item of images) {
        if (item.split('.').pop() === 'png'
            || item.split('.').pop() === 'jpg'
            || item.split('.').pop() === 'jpeg'
            || item.split('.').pop() === 'svg') {
            var abc = {
                "image": "/upload/" + item,
                "folder": '/'
            }
            sorted.push(abc)
        }
    }
    res.send(sorted);
}
module.exports.postHomeDeleteFile = (req, res) => {

    var url_del = 'public' + req.body.url_del
    if (fs.existsSync(url_del)) {
        fs.unlinkSync(url_del)
    }
    res.redirect('back')
}
module.exports.postHomeFile = (req, res) => {
    res.redirect('back')
}

module.exports.postHomeAdd = async (req, res) => {

    let { title, subtitle, content } = req.body
    let isuser = req.session.userID
    let slug = ''
    slug += to_slug(title)
    await todolist.create({
        title,
        subtitle,
        content,
        status: 0,
        isuser,
        slug
    })
    res.redirect('/')
}

module.exports.getHomeDetailPost = async (req, res) => {

    let {slug,id}  = req.params
    res.send({slug,id})
}