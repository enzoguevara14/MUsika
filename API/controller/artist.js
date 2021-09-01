'use strict'

var path=require ('path'); 
var fs =require('fs'); 
var moogosepaginate= require ('mongoose-pagination');
var Artist= require('../models/artist');
var Album= require('../models/album');
var Song=require('../models/song');


function getArtist(req,res){

    var aritstID= req.params.id; 
    Artist.findById(aritstID,(err, artits)=>{
        if(err){
            res.status(500).send({message: "error de peticion "});
        }else {
            if (!artits){
                res.status(404).send({message: " el aritista no existe"}); 

            }else {
                res.status(200).send({artist}); 
            }
        }
    });
   
}

function saveArtist (req,res){
    var artist=new Artist(); 
    var params= req.body; 
    artist.name= params.name;
    artist.description= params.description;
    artist.image= 'null';


    artist.save((err, artistStored)=>{
        if (err){
            res.status(500).send({message: 'error al guardar el artista'});
        }else{
            if (!artistStored){
                res.status(404).send({message:"el artista no ha a guardado"});

            }else{
                res.status(200).send({artist: artistStored});
            }

        }

    });

}

function GetArtists (req,res){
    if (req.params.page){
    var page= req.params.page;}
    else {
        var page=1; 
    }
    var itemPerPage=3 ; 
    
    Artist.find().sort('name').paginate(page,itemPerPage,function(err,artists,total){
        if (err){
            res.status(500).send({message: "error a  la peticion"}); 
        }else {
            if (!artists){
                res.status(404).send({message:"no hay artistas"}); 

            }else {
               res.status(200).send({pages: total, artists: artists}); 
            }
        }
    });

}

function updateArtist (req,res){
    var artistId= req.params.id; 
    var update=req.body;
    
    artist.findByIdAndUpdate(artistId,update,(err,artistUpdated)=> {
        if(err){
            res.status(500).send({message:"error al guardar"});
        }else{
            if(!artistUpdated){
                res.status(404).send({message:"el artista no se actualizo assd"});
            }
            else{
                res.status(200).send({artist: artistUpdated}); 
            }
        }
    });



}

function deleteArtist(req,res){
    var artistId= req.params.id; 

    Artist.findByIdAndRemove(artistId, (err,artistRemoved)=>{
        if(err){
            res.status(500).send({message:"error al eleminar el artista"});
        }else{
            if(!artistRemoved) {
                res.status(404).send({message:"el artista no se eleminado"});
            }
            else{
               

                Album.find({artist: artistRemoved._id}).remove((err, albumRemoved)=>{

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
                                        res.status(200).send({artist: artistRemoved});

                                    }
                                }
                });
            } 
        }

    });
}
        }
    });
}


function uploaadimage(req,res){
    var aritstId= req.params.id; 
    var files_name="no subido"; 
   
    if (req.files){

        var files_path = req.files.image.path; 
        var files_split= files_path.split('\\');
        var files_name=files_split[2];

        var extencionIMG= files_name.split('\.');
        var files_ext= extencionIMG[1];

       

        if(files_ext == 'png'|| files_ext== 'jpg'|| files_ext=='jpeg') {
            Artist.findByIdAndUpdate (aritstId, {image: files_name}, (err,artistUpdate)=> {
              
                if (err){
                    res.status(500).send({message:"error al actualizar"});
                }else{
                      if(!artistUpdate){
                    res.status(404).send({message:"no se a podiddo actualizar el usuario esta linea "});
                    
                }else{
                    res.status(200).send({artist: artistUpdate});
                }
            }    
        });
    
    }
    
    
}
}
function getImageFile (req,res){
    var imagefile=req.params.imagefile; 

    var pathFIle = './uploads/artist/'+imagefile;
    fs.exists(pathFIle, function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFIle));
        }else{
            res.status(200).send({message:"no se actualizo "}); 
        }

    });
     
    

}

module.exports={ 
    getArtist,
    saveArtist,
    GetArtists,
    updateArtist,
    deleteArtist,
    uploaadimage,
    getImageFile

}
