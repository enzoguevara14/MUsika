'use strict'

var mongoose= require('mongoose'); 

var app= require ('./app'); 
var port= process.env.port || 1010; 

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;


// Usamos el método connect para conectarnos a nuestra base de datos
mongoose.connect('mongodb://localhost:27017/dbcurso',{ useNewUrlParser:true, useUnifiedTopology: true }
,(err,res )=> {
    if (err){
        throw err; 
    }else {
        console.log("La base esta corriendo::::");
        
        app.listen(port, function (){
            console.log("Servido de  api rest  escuchando en  http://localhost:"+port); 
        });

    }
});



