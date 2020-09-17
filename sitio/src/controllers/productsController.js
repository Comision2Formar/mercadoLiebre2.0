const dbProduct = require('../data/database'); //requiero la base de datos de productos
const dbCategories = require('../data/dbCategories');

const fs = require('fs');
const path = require('path');
const { join } = require('path');

module.exports = { //exporto un objeto literal con todos los metodos
    listar: function(req, res) {
        res.render('products', {
                title: "Todos los Productos",
                css:'index.css',
                user:req.session.user,
                productos: dbProduct
            }) //muestra información de prueba
    },
    search:function(req,res){
        let buscar = req.query.search;
        if(buscar == ""){
            res.redirect('/')
        }else{
        let resultados=[];
        dbProduct.forEach(producto=>{
            if(producto.name.toLowerCase().includes(buscar.toLowerCase())){
                resultados.push(producto)
            }
        })
        res.render('products',{
            title:"Resultado de la busqueda",
            css:'index.css',
            user:req.session.user,
            productos:resultados
        })
    }
    },

    detalle:function(req,res){
        let id = req.params.id;
        let producto = dbProduct.filter(producto=>{
            return producto.id == id
        })
        console.log(producto)
        res.render('productDetail',{
            title:"Detalle del Producto",
            css:'products.css',
            user:req.session.user,
            producto:producto[0]
        })
    },
    agregar:function(req,res){
        let categoria;
        let sub;
        if(req.query.categoria){
            categoria = req.query.categoria;
            sub = req.query.sub
        }
        res.render('productAdd',{
            title:"Agregar Producto",
            css:'products.css',
            user:req.session.user,
            categorias:dbCategories,
            categoria:categoria,
            sub:sub
        })
    },
    publicar:function(req,res,next){
        
        let lastID = 1;

        dbProduct.forEach(producto=>{
            if(producto.id > lastID){
                lastID = producto.id
            }
        })

        let newProduct ={
            id: lastID + 1,
            name: req.body.name.trim(),
            price:Number(req.body.price),
            discount:Number(req.body.discount),
            category:req.body.category.trim(),
            description:req.body.description.trim(),
            image: (req.files[0])?req.files[0].filename:"default-image.png"
        }

        dbProduct.push(newProduct);
        
        fs.writeFileSync(path.join(__dirname,"..",'data',"productsDataBase.json"),JSON.stringify(dbProduct),'utf-8')
        
        res.redirect('/products')
    },
    show:function(req,res){
        let idProducto = req.params.id;
        let resultado = dbProduct.filter(producto =>{
            return producto.id == idProducto
        })
        res.render('productShow',{
            title: "Ver/Editar Producto",
            css:'products.css',
            user:req.session.user,
            producto: resultado[0],
            total: dbProduct.length,
            categorias:dbCategories,
        })
    },
    actualizar:function(req,res){
        let idProducto = req.params.id;
        dbProduct.forEach(producto =>{
            if(producto.id == idProducto){
                producto.id = Number(req.body.id);
                producto.name = req.body.name.trim();
                producto.price = Number(req.body.price);
                producto.discount = Number(req.body.discount);
                producto.category = req.body.category.trim();
                producto.description = req.body.description.trim();
                producto.image = (req.files[0]?req.files[0].filename:producto.image)
            }
        })
        fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'),JSON.stringify(dbProduct),'utf-8');
        res.redirect('/products/show/'+ idProducto)
    },
    eliminar:function(req,res){
        let idProducto = req.params.id;
        let aEliminar;
        dbProduct.forEach(producto=>{
            if(producto.id == idProducto){
                aEliminar = dbProduct.indexOf(producto)
            }
        })
        dbProduct.splice(aEliminar,1)
        fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'),JSON.stringify(dbProduct));
        res.redirect('/users/profile')
    }

}