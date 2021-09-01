'use strict'
var cors = require('cors')
var express = require("express"); 
var bodyparse= require("body-parser"); 

var app= express(); 
// cargar rutas 
var user_router= require('./routes/user');

var artist_router= require('./routes/artist');
var album_router = require('./routes/album');
var song_router = require('./routes/song');



app.use(bodyparse.urlencoded({extended:false}));
app.use(bodyparse.json()); 

// configurar cabeceras http 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// ruta base 
app.use('/api',user_router); 
app.use('/api',album_router); 
app.use('/api',artist_router); 
app.use('/api',song_router); 
app.use(cors());







module.exports=app; 