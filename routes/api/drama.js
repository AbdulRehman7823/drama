const express = require('express');
const router = express.Router();
const {Drama} = require('../../models/dramaModel');
const {Episode}  = require('../../models/episodeModel');


router.delete('/episodes/:dramaId/:episodeId',async (req, res)=>{
     
    try {
        const dramaId = req.params.dramaId;
        const episodeId = req.params.episodeId;
        const drama = await Drama.findById(dramaId);
        if(drama){
            const episode = await Episode.findByIdAndDelete(episodeId);
            if(episode){
               drama.episodes.remove(episode._id);
               await drama.save();
                res.status(200).send(drama);
            }else{
                res.status(400).send({message:"There is no Such Episode"})
            }
        }else{
           res.status(400).send({message:"There is no Such Drama"});
        }
    } catch (error) {
        res.status(404).send({message:"There is some Problem\n"+error.message});
    }
   
});

router.get("/",async (req, res) => {
    try {
        const dramas  =  await Drama.find();
        if(dramas.length>0){
            res.status(200).send(dramas);
        }else{
            res.status(400).send({message:"There is no drama available"});
        }
    } catch (error) {
        res.status(404).send({message:"There is some error\n"+error.message});
    }
});

router.get('/:id',async (req, res) => {
        
    try {
        const id = req.params.id;
        const drama = await Drama.findById(id);
        if(drama){
             res.status(200).send(drama);
        }else{
             res.status(404).send({message: 'Drama with this Id is not available'});
        }
    } catch (error) {
        res.status(404).send({message:"Invalid Id\n"+error.message});
    }
});

router.delete('/:id',async (req, res) => {
    try {
        const id = req.params.id;
        const drama =  await Draft.findByIdAndDelete(id);
        if(drama){
        res.status(200).send({message:"Deleted Successfully"});
        }else{
            res.status(400).send({message:"Drama with this Id is not available"});
        }
    } catch (error) {
        res.status(404).send({message:"Invalid Id\n"+error.message});

    }
});


router.get('/episodes/:dramaId',async (req, res)=> {
    const dramaId = req.params.dramaId;  
    const drama   =  await Drama.findById(dramaId);
    if(drama) {
        const episodes = drama.episodes;
        if(episodes.length>0){
                 res.status(200).send(episodes);
        }else{
            res.status(404).send({message:"No Episode available for this Drama"});
        }

    }else{
          res.status(400).send({message:"Drama with this Id is not available"});
    }
});

router.put('/:id',async (req,res) => {
    try {
        const id = req.params.id;
        const drama =  await Draft.findByIdAndUpdate(id,req.body);
        if(drama){
        res.status(200).send({message:"Deleted Successfully"});
        }else{
            res.status(400).send({message:"Drama with this Id is not available"});
        }
    } catch (error) {
        res.status(404).send({message:"Invalid Id\n"+error.message});

    }
});


router.post("/",async (req, res) => {
    try {
        const drama = new Drama(req.body);
        await drama.save();
        res.status(200).send({message:"Successfully Posted"});

    } catch (error) {
        res.status(500).send({message:"There is some error while posting\n"+error.message});
    }
});

router.post('/episodes/:dramaId',async (req, res) =>{
    try {
        const dramaId = req.params.dramaId;
        const drama = await Drama.findById(dramaId);
        const episode = new Episode(req.body);
        const savedEpisode = await episode.save();
        if(drama){
              drama.episodes.push(savedEpisode._id);
              await drama.save();
              res.status(200).send(drama);
        }else{
             res.status(404).send({message:"There is no such drama available"});
        }
    } catch (error) {
        res.status(404).send({message:"There is some error While posting this Episode\n"+error.message});
    }
});



module.exports = router;