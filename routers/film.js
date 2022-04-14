const router = require('express').Router();
const {Film} = require('../models/film');

// Get Film by ID 
router.get('/:id',async (req,res)=>{
    let film = await Film.findById(req.params.id)
    if (!film){
          return res.status(400).json({
            message: "Film Not Exist"
          });
        }else{
            res.status(200).send(film);    
        }
    
    });
// Add Film
router.post('',async (req,res)=>{
    let film = new Film(req.body);   
    try {
        res.send(await film.save());
    } catch (error) {
        res.status(400).send(error.message);
    }
    
});
// Update Film
router.put('/Update/:id',async (req,res)=>{
    let film = await Film.findById(req.params.id);   
    if(!film)
        return res.status(404).send('Id not found');
    try {
        await Film.updateOne({_id : req.params.id}, req.body);
        res.send(await Film.findById(req.params.id));
    } catch (error) {
        res.status(400).send(error.message);
    }
    
});
//add Acteur to film
router.put('/add/acteur/:id/:id_act',async (req,res)=>{
    let film = await Film.findById(req.params.id);   
    if(!film)
        return res.status(404).send('Id not found');
    try {
        film.acteurs.push(req.params.id_act);
        res.send(await film.save());
    } catch (error) {
        res.status(400).send(error.message);
    }
    
});

//delete Film
router.delete('/delete/:id',async (req,res)=>{
    try {
        let film = await Film.findByIdAndRemove(req.params.id);
        if(!film)
            return res.status(404).send('Film with id is not found');
        res.send(film);
    }catch (error) {
        res.status(400).send('Error Deleting Film :'+error.message);
    }
    
});
module.exports=router;