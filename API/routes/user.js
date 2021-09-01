'use strict'

var express =require ('express');
var multipart= require('connect-multiparty'); 

var UserController= require('../controller/user'); 



var api = express.Router(); 
var md_auth= require('../middlewares/authenticated'); 
var md_upload =multipart({ uploadDir: './uploads/users'}); 

api.get('/probando-controlador',md_auth.ensureAuth , UserController.pruebas); 
api.post('/register', UserController.saveUser); 
api.post('/login', UserController.loginUser); 
api.put('/UpdateUser/:id',md_auth.ensureAuth,UserController.updateUser);

api.post("/upload-image-user/:id", [md_auth.ensureAuth, md_upload], UserController.uploadImage);

api.get("/get-image-user/:imagefile", UserController.getImageFile); 
  
module.exports=api;   