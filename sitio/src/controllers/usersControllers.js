const dbProducts = require('../data/database');
const dbUsers = require('../data/dbUsers');

const db = require('../database/models');

const {validationResult, body} = require('express-validator');
const bcrypt =require('bcrypt');
const fs = require('fs');
const path = require('path');


module.exports = {
    register:function(req,res){
        console.log(req.session.store);
        res.render('userRegister',{
            title:"Registro de Usuario",
            css:'index.css'
        })
    },
    processRegister:function(req,res){
        let errors = validationResult(req);
     
        if(errors.isEmpty()){
           
            db.Users.create(
                {
                    nombre:req.body.nombre.trim(),
                    apellido:req.body.apellido.trim(),
                    email:req.body.email.trim(),
                    password:bcrypt.hashSync(req.body.pass.trim(),10),
                    avatar:(req.files[0])?req.files[0].filename:"default.png",
                    rol:(req.session.store)?req.session.store:"user"
                }
            )
            .then(result => {
                console.log(result)
                if(req.session.store){
                    req.session.store = result;
                    return res.redirect('/stores/register')
                }
                return res.redirect('/users/login');
            })
            .catch(errores => {
                console.log(errores)
            })
        }else{
            res.render('userRegister',{
                title:"Registro de Usuarios",
                css:'index.css',
                errors:errors.mapped(),
                old:req.body,
                user:req.session.user
            })
        }
    },
    login:function(req,res){
        res.render('userLogin',{
            title:"Ingreso de Usuarios",
            css:'index.css',
            user:req.session.user
        })
    },
    processLogin:function(req,res){
        let errors = validationResult(req);
        if(errors.isEmpty()){
     
            db.Users.findOne({
                where:{
                    email:req.body.email
                }
            })
            .then(user => {
                req.session.user = {
                    id: user.id,
                    nick: user.nombre +  " " + user.apellido,
                    email: user.email,
                    avatar: user.avatar,
                    rol: user.rol
                }

                if(req.body.recordar){
                    res.cookie('userMercadoLiebre',req.session.user,{maxAge:1000*60*2})
                }

                res.locals.user = req.session.user;

                return res.redirect('/')
            })

        }else{
            return res.render('userLogin',{
                title:"Ingreso de Usuarios",
                css:'index.css',
                errors: errors.mapped(),
                old:req.body,
                user:req.session.user

            })
        }
    },
    logout:function(req,res){
        req.session.destroy();
        if(req.cookies.userMercadoLiebre){
            res.cookie('userMercadoLiebre','',{maxAge:-1})
        }
        res.redirect('/')
    },
    profile:function(req,res){
        if(req.session.user){
            db.Users.findByPk(req.session.user.id)
            .then(user => {
                res.render('userProfile',{
                    title:"Perfil de Usuario",
                    css:'index.css',
                    usuario:user,                    
                    productos: dbProducts.filter(producto=>{
                        return producto.category != "visited" && producto.category != "in-sale"
                    })
        
                })
            })
        }else{
            return res.redirect('/')
        }
    },
    updateProfile:function(req,res){
        db.Users.update(
            {
                fecha:req.body.fecha,
                avatar:(req.files[0])?req.files[0].filename:req.session.user.avatar,
                direccion:(req.body.direccion!="")?req.body.direccion.trim():null,
                ciudad:(req.body.ciudad!="")?req.body.ciudad.trim():null,
                provincia:(req.body.provincia!="")?req.body.provincia.trim():null
            },
            {
                where:{
                    id:req.params.id
                }
            }

        )
        .then( result => {
            console.log(result)
            return res.redirect('/users/profile')
        })
        .catch( errors => {
            console.log(errors)
        })
    },
    delete: function(req,res){
        //borrar el archivo de imagen de perfil
        if(fs.existsSync('public/images/avatares/'+req.session.user.avatar)&&req.session.user.avatar != "default.png"){
            fs.unlinkSync('public/images/avatares/'+req.session.user.avatar)
        }
        //cerrar la session y borrar cookie
        req.session.destroy();
        if(req.cookies.userMercadoLiebre){
            res.cookie('userMercadoLiebre','',{maxAge:-1});
        }
        //borrar el registro de la base de datos
        db.Users.destroy({
            where:{
                id:req.params.id
            }
        })
        return res.redirect('/')
    }
}