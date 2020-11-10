const mongoose = require('mongoose');


const myschema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    movieid:{
    type:String
    
    },
    movietitle:{
    type:String
    
    },
    movieimg:{
    type:String
    
    },
    movierun:{
        type:String
    },
    identifier:{
       type:String

    },
    tvtitle:{
      type:String

    }



})

module.exports = mongoose.model('Mylist',myschema)