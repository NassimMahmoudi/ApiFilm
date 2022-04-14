const router = require('express').Router();
const {Acteur} = require('../models/acteur');
const { Film } = require('../models/film');

// Get Acteur by ID 
router.get('/:id',async (req,res)=>{
    let acteur = await Acteur.findById(req.params.id)
    if (!acteur){
          return res.status(400).json({
            message: "Acteur Not Exist"
          });
        }else{
            res.status(200).send(acteur);    
        }
    
    });
// Add Acteur
router.post('',async (req,res)=>{
    let acteur = new Acteur(req.body);   
    try {
        res.send(await acteur.save());
    } catch (error) {
        res.status(400).send(error.message);
    }
    
});
//delete Acteur
router.delete('/delete/:id',async (req,res)=>{
    try {
        let acteur = await Acteur.findByIdAndRemove(req.params.id);
        if(!acteur)
            return res.status(404).send('Acteur with id is not found');
        res.send(acteur);
    }catch (error) {
        res.status(400).send('Error Deleting Acteur :'+error.message);
    }
    
});
// Update Acteur
router.put('/Update/:id',async (req,res)=>{
    let acteur = await Acteur.findById(req.params.id);   
    if(!acteur)
        return res.status(404).send('Id not found');
    try {
        await Acteur.updateOne({_id : req.params.id}, req.body);
        res.send(await Acteur.findById(req.params.id));
    } catch (error) {
        res.status(400).send(error.message);
    }
    
});

//Get actor's films by id actor
router.get('/:id/films',async (req,res)=>{
    let acteur = await Acteur.findById(req.params.id)
    
    if (!acteur){
          return res.status(400).json({
            message: "Acteur Not Exist"
          });
        }else{
            let films = await Film.find();
            if (!films){
                return res.status(400).json({
                    message: "No Film here"
                });
            }else{
                let films_act =[];
                films.forEach(film => {
                    let act =film.acteurs.findById(req.params.id); 
                    if (act) {
                         films_act.push(film);
                    }               
                });
                return res.status(200).send(films_act);
            }  
        }
    
    });
module.exports=router;