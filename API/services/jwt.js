'use strict'


var jwt = require('jwt-simple'); 
var secret='clave_secreta'; 
var moment = require('moment'); 

exports.createToken = function(user){
    var payload={ 
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.subname,
        role: user.role,
        Image: user.Image,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix
    };

    return jwt.encode(payload, secret);
}