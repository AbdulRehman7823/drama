const mongoose = require('mongoose');
const joi = require('@hapi/joi');
  
const dramaModel =  mongoose.Schema({
    title:{type:String, required:true},
    desc:{type:String, required:true},
    img:{type:String, required:true},
    category:{type:String},
    episodes:[{episodeId:{type:String}}]
},
 { timestamps: true }
 );


 const validateDrama = (drama) => {
    const schema = {
        title: joi.string().max(200).min(10).required(),
        desc: joi.string().max(2000).min(10).required(),
        image: joi.string().required(),
        category: joi.string(),

    }
      return schema.validate(drama,{abortEarly:false});

}



const Drama  =  mongoose.model('Drama',dramaModel);
module.exports.Drama = Drama;
module.exports.validateDrama = validateDrama; 

