const mongoose = require('mongoose');
const joi = require('@hapi/joi');

const episodeModel = mongoose.Schema({
    title:{type:String, required: true},
    video:{type:String, required: true},
    desc:{type:String},
},{timeStamp:true});

 const validateEpisode = (episode) => {
    const Schema = {
        title: joi.string().max(200).min(10).required(),
        desc: joi.string().max(2000).min(10).required(),
        video: joi.string().required(),
    }

      return schema.validate(episode,{abortEarly:false});

    
    }

const Episode = mongoose.model("Episode",episodeModel);

module.exports.Episode = Episode;
