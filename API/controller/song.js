'use strict'

var path=require ('path'); 
var fs =require('fs'); 
var moogosepaginate= require ('mongoose-pagination');
var Artist= require('../models/artist');
var Album= require('../models/album');
var Song=require('../models/song');



function getSong(req,res){ 
    var songID= req.params.id; 

    Song.findById(songID).populate({path: 'album'}).exec((err, song)=>{
        if (err){
            res.status(500).send({message:"errr en la petecion "}); 

        }else{
            if(!song){
                res.status(404).send({message:"el album no existe"}); 
            }else{ 
                res.status(200).send({song})
            }
        }
    }); 
}

function getSongs (req,res){
    var songId= req.params.id; 
    if (!songId){
        // sacar todos los albums de la BD 
        var find= Song.find({}).sort('number'); 
    }else{

        //sacar lso albums de un artistita 

        var find = Song.find({album:albumId}).sort('number'); 
    }

    find.populate({path: 'album', populate: {path: 'artist'}}).exec((err,songs)=>{
        if(err) {
             res.status(500).send({message:"errr en la petecion "}); 

            }else{
                if(!songs){
                    res.status(404).send({message:"el song no existe"}); 
                }else{
                    res.status(200).send({songs})
                }
            }
    });
}



function saveSong(req,res){
    var song=new Song();
    var params= req.body;

    song.number= params.number;
    song.name=params.name; 
    song.duration= params.duration; 
    song.file= null; 
    song.album= params.album; 

    song.save((err, songStored)=>{
        if (err){
            res.status(500).send({message: 'error al guardar el song'});
        }else{
            if (!songStored){
                res.status(404).send({message:"el song no ha a guardado"});

            }else{
                res.status(200).send({song: songStored});
            }

        }

    });

}


function updateSong (req,res){
    var songID= req.params.id; 
    var update=req.body; 

    Song.findByIdAndUpdate(songID, update, (err, SongUdpadated)=>{
        if(err) {
            res.status(500).send({message:"errr en la petecion "}); 

           }else{
               if(!SongUdpadated){
                   res.status(404).send({message:"el song no existe"}); 
               }else{
                   res.status(200).send({song: SongUdpadated})
               }
           }
    });
}

function deleteSong(req,res){
    var songId=req.params.id; 
    console.log(songId);
    Song.findByIdAndRemove(songId, (err, songRemoved)=>{
        if(err) {
            res.status(500).send({message:"errr en la petecion "}); 

           }else{
               if(!songRemoved){
                   res.status(404).send({message:"el song no existe"}); 
               }else{
                   res.status(200).send({song: songRemoved})
               }
           }
    });
}


function uploadfile(req,res){
    var songID= req.params.id; 
    var files_name="no subido"; 
   
    if (req.files){

        var files_path = req.files.file.path; 
        var files_split= files_path.split('\\');
        var files_name=files_split[2];

        var extencionIMG= files_name.split('\.');
        var files_ext= extencionIMG[1];

       

        if(files_ext == 'mp3'|| files_ext== 'ogg') {
            Song.findByIdAndUpdate (songID, {file: files_name}, (err,songUpdated)=> {
              
                if (err){
                    res.status(500).send({message:"error al actualizar"});
                }else{
                      if(!songUpdated){
                    res.status(404).send({message:"no se a podiddo actualizar el usuario esta linea "});
                    
                }else{
                    res.status(200).send({song: songUpdated});
                }
            }    
        });
    
    }
    
    
}
}


function getSongFile (req,res){
    var songFile=req.params.files; 

    var pathFIle = './uploads/song'+songFile;
    fs.exists(pathFIle, function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFIle));
        }else{
            res.status(200).send({message:"no se actualizo afsdf "}); 
        }

    });
}

module.exports={
    getSong,
    saveSong,
    getSongs,
    updateSong,
    deleteSong, 
    uploadfile,
    getSongFile
}