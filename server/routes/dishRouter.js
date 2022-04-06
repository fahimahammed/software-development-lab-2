const express = require('express');
const router = express.Router();
const Dish = require('../model/dishSchema');

// get dishes 
router.get('/', async (req, res) =>{
    try{
        const dishes = await Dish.find();
        res.json(dishes);
    }
    catch(err){
        res.send(err.message);
    }

})

// get dishes by dish id
router.get(('/:dishId'), async (req, res)=>{
    try{
        const dish = await Dish.findById(req.params.dishId);
        res.json(dish);
    }
    catch(err){
        res.send(err.message);
        console.log(res.statusCode);
    }
})


// post dish 
router.post('/', async (req, res) => {
    const dishData = new Dish({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    })

    try{
        const postDishes = await dishData.save();
        res.json(postDishes);
        console.log(res.statusCode);
        res.redirect('/');
    }
    catch(err){
        res.send(err.message);
        res.redirect('/');
        console.log(res.statusCode);
    }
})

// delete dish
router.delete(('/:dishId'), async (req, res)=>{
    try{
        const deleteDish = await Dish.findByIdAndDelete(req.params.dishId);
        res.send("Dish deleted....");
    }
    catch(err) {
        res.send(err.message);
    }
})

// update or put dish by dish id 
router.put('/:dishId', async (req, res)=>{
    try{
        const dish = await Dish.findById(req.params.dishId);
        dish.name = req.body.name;
        dish.price = req.body.price;
        const updateDish = await dish.save();
        res.json(updateDish);
    }
    catch(err) {
        res.send(err.message);
        console.log(res.statusCode);
    }
})


module.exports = router;