const user = require('../models/user')


module.exports.authHome = async (req,res,next) => {

    const {userID:id} = req.session
    if(!id){
        res.redirect('/auth')
    }else{
        let currentUser = await user.findOne({
            where:{
                id,
                status:1
            }
        })
        if(!currentUser){
            res.redirect('/auth')
        }else{
            next()
        }
    }
}