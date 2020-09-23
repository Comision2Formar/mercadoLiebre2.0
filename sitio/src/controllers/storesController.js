const db = require('../database/models')

module.exports = {
    preRegister:function(req,res){
        req.session.store = "store"
        res.redirect('/users/register')
    },
    register:function(req,res){
        res.render('storeRegister',{
            title:"Registro de Tienda OnLine",
            css:"index.css",
            usuario:req.session.store
        })
    }
}