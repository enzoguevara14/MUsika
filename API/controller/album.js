'use strict'

var path=require ('path'); 
var fs =require('fs'); 
var moogosepaginate= require ('mongoose-pagination');
var Artist= require('../models/artist');
var Album= require('../models/album');
var Song=require('../models/song');


function getAlbum(req,res){  
    var albumID= req.params.id;  

    Album.findById(albumID).populate({path: 'artist'}).exec((err, album)=>{
        if (err){
            res.status(500).send({message:"errr en la petecion "}); 

        }else{
            if(!album){
                res.status(404).send({message:"el album no existe"}); 
            }else{
                res.status(200).send({album})
            }
        }
    }); 

   
}

function getAlbums (req,res){
    var artistId= req.params.id; 
    if (!artistId){
        // sacar todos los albums de la BD 
        var find= Album.find({}).sort('title'); 
    }else{

        //sacar lso albums de un artistita 

        var find = Album.find({artist:artistId}).sort('year'); 
    }

    find.populate({path: 'artist'}).exec((err,albums)=>{
        if(err) {
             res.status(500).send({message:"errr en la petecion "}); 

            }else{
                if(!albums){
                    res.status(404).send({message:"el album no existe"}); 
                }else{
                    res.status(200).send({albums})
                }
            }
    });
}


function saveAlbum (req,res){
    var album=new Album(); 
    var params= req.body; 
    album.title= params.title;
    album.description= params.description;
    album.year=params.year;
    album.artist=params.artist;
    album.image= 'null';


    album.save((err, albumStored)=>{
        if (err){
            res.status(500).send({message: 'error al guardar el album'});
        }else{
            if (!albumStored){
                res.status(404).send({message:"el album no ha a guardado"});

            }else{
                res.status(200).send({album: albumStored});
            }

        }

    });

}

function updateAlbum (req,res){
    var albumID= req.params.id; 
    var update=req.body; 

    Album.findByIdAndUpdate(albumID, update, (err, albumupdated)=>{
        if(err) {
            res.status(500).send({message:"errr en la petecion "}); 

           }else{
               if(!albumupdated){
                   res.status(404).send({message:"el album no existe"}); 
               }else{
                   res.status(200).send({album: albumupdated})
               }
           }
    });
}

function deleteAlbum(req,res){
    var albumId=req.params.id; 

    Album.findByIdAndRemove( albumId,((err, albumRemoved)=>{

        if(err){
            res.status(500).send({message:"error al elimiar el album"});
        }else{
            if(!albumRemoved) {
                res.status(404).send({message:"el album no se eleminado"});
            }
            else{
                Song.find({album: albumRemoved._id}).remove((err, SongRemoved)=>{

                    if(err){
                        res.status(500).send({message:"error al elimiar las canciones"});
                    }else{
                        if(!SongRemoved) {
                            res.status(404).send({message:"la cancion no se eleminado"});
                        }
                        else{
                            res.status(200).send({album: albumRemoved});

                        }
                    }
                
                });
            }
          }
    }));
}


function uploaadimage(req,res){
    var albumId= req.params.id; 
    var files_name="no subido"; 
   
    if (req.files){

        var files_path = req.files.image.path; 
        var files_split= files_path.split('\\');
        var files_name=files_split[2];

        var extencionIMG= files_name.split('\.');
        var files_ext= extencionIMG[1];

       

        if(files_ext == 'png'|| files_ext== 'jpg'|| files_ext=='jpeg') {
            Album.findByIdAndUpdate (albumId, {image: files_name}, (err,albumUpdated)=> {
              
                if (err){
                    res.status(500).send({message:"error al actualizar"});
                }else{
                      if(!albumUpdated){
                    res.status(404).send({message:"no se a podiddo actualizar el usuario esta linea "});
                    
                }else{
                    res.status(200).send({album: albumUpdated});
                }
            }    
        });
    
    }
    
    
}
}


function getImageFile (req,res){
    var imagefile=req.params.imagefile; 

    var pathFIle = './uploads/album/'+imagefile;
    fs.exists(pathFIle, function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFIle));
        }else{
            res.status(200).send({message:"no se actualizo "}); 
        }

    });
     
    

}
module.exports={
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    uploaadimage,
    getImageFile,
}