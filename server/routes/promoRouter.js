const express = require('express');
const router = express.Router();
const Promotions = require('../model/promoSchema');


// get all promotions data 
router.get('/', async (req, res) =>{
    try{
        const dishes = await Promotions.find();
        res.json(dishes);
    }
    catch(err){
        res.send(err.message);
    }

})


// get a single data 
router.get(('/:promoId'), async (req, res)=>{
    try{
        const dish = await Promotions.findById(req.params.promoId);
        res.json(dish);
    }
    catch(err){
        res.send(err.message);
        console.log(res.statusCode);
    }
})


// post a promotions data 
router.post('/', async (req, res) => {
    const promoData = new Promotions({
        name: req.body.name,
        cost: req.body.cost
    })

    try{
        const data = await promoData.save();
        res.json(data);
        console.log(res.statusCode);
    }
    catch(err){
        res.send(err.message);
        console.log(res.statusCode);
    }
})


// delete a single promo data
router.delete(('/:promoId'), async (req, res)=>{
    try{
        const deletePromo = await Promotions.findByIdAndDelete(req.params.promoId);
        res.send("Dish deleted....");
    }
    catch(err) {
        res.send(err.message);
    }
})

// delete all promotion data
router.delete('/', async (req, res)=>{
    try{
        const deleteAllPromos = await Promotions.deleteMany();
        res.send("delete all data...");
    }
    catch(err) {
        console.error(err.message);
    }
})

// put a single data 
router.put('/:promoId', async (req, res)=>{
    try{
        const promo = await Promotions.findById(req.params.promoId);
        promo.name = req.body.name;
        promo.cost = req.body.cost;
        const updatePromo = await promo.save();
        res.json(updatePromo);
    }
    catch(err) {
        res.send(err.message);
        console.log(res.statusCode);
    }
})

// router.put('/', async (req, res)=>{
//     try{
//         const promoUpdateAll = await Promotions.updateMany();
//         promoUpdateAll.name = req.params.name;
//         promoUpdateAll.cost = req.params.cost;
//         const updateAllPromo = await promoUpdateAll.save();
//         res.send(updateAllPromo);
//     }
//     catch(err){
//         res.send(err.message);
//     }
// })


module.exports = router;