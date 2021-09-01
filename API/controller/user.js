'use strict'

var bcrypt= require('bcrypt-nodejs'); 
var  FS =require('fs');  
var path= require('path');

var User = require('../models/user');
var jwt =require('../services/jwt');


function pruebas(req,res){
    res.status(200).send ({message : 'probando controlador user '});
}

function saveUser (req,res){
    var user = new User(); 

    var params= req.body; 

    console.log (params);
    user.name= params.name; 
    user.surname= params.surname;
    user.email= params.email; 
    user.role = 'ROLE_USER';
    user.image= 'null'; 
    console.log (params);

    if (params.password){
        // encriptar
        bcrypt.hash(params.password, null,null,function(err,hash){
            user.password=hash; 
            if(user.name!= null && user.surname!= null && user.email!= null){
                // guardar user

                user.save((err,userstored)=>{
                    if (err){
                        res.status(500).send({message: 'error al guarddar user'}); 

                    }else{
                        if(!userstored){
                            res.status(404).send({message: 'no se registro el usario'}); 

                        }else {
                            res.status(200).send({user:userstored});
                        }
                    }
                });

            }else{
                res.status(200).send({message: 'introduce todos los campos'}); 
            }
        });
    }else{
        res.status(500).send({message: 'introduce la contraseña'}); 
    }
}

// funcion para logearse 

function loginUser(req,res) {
    var params =req.body; 
    var email= params.email;
    var password= params.password; 

    User.findOne({ email: email.toLowerCase()}, (err,user)=> {
        if (err){
            res.status(500).send({message: " error de peticion"});
        }else{
            if(!user){
                res.status(404).send({message:"el user no existe"});
            }else{
                //comparar la contraseña 
                bcrypt.compare(password,user.password , function (err,check){
                    if(check){
                        // devolver los datos de user log
                        if(params.gethash){
                            //devolver el token jwt
                            res.status(200).send({
                                token: jwt.createToken(user)

                            });
                        }else{
                            res.status(200).send({user}); 
                        }

                    }else{
                        res.status(404).send({message: "los valores del usuriarios no son correcto"});
                    }
                });
            }

        }

    });

}

function updateUser (req,res){
    var update= req.body; 
    var userId= req.params.id;
    
    if(userId!=req.user.sub){
        return       res.status(500).status({message: "no tienes permiso  de actualizar "});
    }
    User.findByIdAndUpdate (userId,update,{ new:  true, runValidators:  true }, (err,userUpdate)=> {
        if (err){
            res.status(500).send({message:"error al actualizar"})
        }else{
            if(!userUpdate){
                res.status(404).send({message:"no se a podiddo actualizar el usuario esta linea  "});
                
            }else{
                res.status(200).send({user: userUpdate}); 
            }

        }
    });
}





function uploadImage (req,res){
    var userId= req.params.id; 
    var files_name="no subido"; 
   
    if (req.files){

        var files_path = req.files.image.path; 
        var files_split= files_path.split('\\');
        var files_name=files_split[2];

        var extencionIMG= files_name.split('\.');
        var files_ext= extencionIMG[1];

       

        if(files_ext == 'png'|| files_ext== 'jpg'|| files_ext=='jpeg') {
            User.findByIdAndUpdate (userId, {image: files_name}, (err,userUpdate)=> {
              
                if (err){
                    res.status(500).send({message:"error al actualizar"});
                }else{
                      if(!userUpdate){
                    res.status(404).send({message:"no se a podiddo actualizar el usuario esta linea "});
                    
                }else{
                    res.status(200).send({image: files_name , user: userUpdate});
                }
            }    
        });
    
    }
    
    
}
     
    

}

function getImageFile (req,res){
    var imagefile=req.params.imagefile; 

    var pathFIle = './uploads/users/'+imagefile;
    FS.exists(pathFIle, function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFIle));
        }else{
            res.status(200).send({message:"no se actualizo "}); 
        }

    });
}



module.exports= {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
    
}