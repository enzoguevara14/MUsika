'use strict'

var express  = require('express');
var ArtistController= require ('../controller/artist'); 
var api=express.Router(); 
var md_auth= require ('../middlewares/authenticated'); 


var multipart= require('connect-multiparty'); 
const artist = require('../models/artist');
var md_upload =multipart({ uploadDir: './uploads/artist'}); 

api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist);

api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist);

api.get('/artists/:page?',md_auth.ensureAuth, ArtistController.GetArtists);

api.put('/artist/:id',md_auth.ensureAuth, ArtistController.updateArtist);

api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist); 

api.post("/upload-image-artist/:id", [md_auth.ensureAuth, md_upload], ArtistController.uploaadimage);


api.get("/get-image-artist/:imagefile", ArtistController.getImageFile); 

module.exports =api; 
