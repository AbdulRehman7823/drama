const express = require('express');
const router = express.Router();
const {Episode} = require('../../models/episodeModel');


router.post("/",async function(req, res){
     const episode = new Episode(req.body);
     await episode.save();
     res.status(200).send(episode);
});

router.get('/:id',async (req, res) => {
        
    try {
        const id = req.params.id;
        const episode = await Episode.findById(id);
        if(episode){
             res.status(200).send(episode);
        }else{
             res.status(404).send({message: 'episode with this Id is not available'});
        }
    } catch (error) {
        res.status(404).send({message:"Invalid Id\n"+error.message});
    }
});

router.delete("/:id",async function(req, res){
    
    const episode = await Episode.findByIdAndDelete(req.params.id);
    if(episode){
        res.status(200).send(episode);
    }else{
        res.status(404).send({ message:"There is no Episode"});
    }
});

module.exports = router;