var fs = require('fs')
const todolist = require('../models/todo')



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
module.exports.postHomeFile = (req,res)=>{
    res.redirect('back')
}

module.exports.postHomeAdd = async (req,res)=>{
    // res.send(req.body)
    let{title,subtitle,content} = req.body
    let isuser = req.session.userID
    await todolist.create({
        title,
        subtitle,
        content,
        status:0,
        isuser
    })
    res.redirect('/')
}