const mongoose  = require('mongoose');
const joi = require('@hapi/joi');

const userModel = mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    age:{type:Number},
    img:{type:String}
},
 { timestamps: true }
);

const validateUser = (user) => {
    const schema = {
        name: joi.string().max(200).min(6).required(),
        email: joi.email()
    }
  return schema.validate(user,{abortEarly:false});

}


const User =  mongoose.model('User',userModel);
module.exports.User = User;