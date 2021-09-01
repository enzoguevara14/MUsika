'use strict'

var mongoose  = require('mongoose');
var Schema= mongoose.Schema; 

var AlbumSchema= Schema({
    title: String,
    description: String,
    image: String,
    year: Number,
    artist: {type: Schema.ObjectId, ref: 'Artist'}
});

module.exports=mongoose.model('Album', AlbumSchema); 