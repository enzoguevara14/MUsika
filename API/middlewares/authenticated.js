'use strict'


var jwt = require('jwt-simple'); 
var secret='clave_secreta'; 
var moment = require('moment'); 

 function ensureAuth(req,res,next){

    if(!req.headers.authorization){
        return res.status(403).send({message: 'la peticion no tiene la cabeza q necesito'});
    }
    //le quita las comillas al token q traigo
    var token = req.headers.authorization.replace(/['"]+/g,'');

    try{
        var payload =jwt.decode(token, secret); 

        if(payload.exp <= moment().unix()){
            return res.status(401).send({message:"el token a expirado"}); 
        }

    }catch(ex){
        //console.log(ex);
        return res.status(404).send({message:'token no valido'});
    }

    req.user=payload;
    next()
};

module.exports ={
    ensureAuth
}