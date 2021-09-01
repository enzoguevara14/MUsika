'use strict'

var express  = require('express');
var AlbumController= require ('../controller/album'); 

var md_auth= require ('../middlewares/authenticated'); 
 
var api=express.Router(); 
var multipart= require('connect-multiparty'); 

var md_upload =multipart({ uploadDir: './uploads/album'}); 

api.get('/album/:id', md_auth.ensureAuth, AlbumController.getAlbum);
api.get('/albums/:artist?', md_auth.ensureAuth, AlbumController.getAlbums);
api.post('/album', md_auth.ensureAuth, AlbumController.saveAlbum);
api.put('/album/:id', md_auth.ensureAuth, AlbumController.updateAlbum);

api.delete('/album/:id', md_auth.ensureAuth, AlbumController.deleteAlbum);

api.post("/upload-image-album/:id", [md_auth.ensureAuth, md_upload], AlbumController.uploaadimage);


api.get("/get-image-album/:imagefile", AlbumController.getImageFile); 


module.exports=api;