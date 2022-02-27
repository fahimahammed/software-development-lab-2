const express = require('express');
const router = express.Router();
const Leader = require('../model/leaderSchema');


// get all leader data 
router.get('/', async (req, res) =>{
    try{
        const leaders = await Leader.find();
        res.json(leaders);
    }
    catch(err){
        res.send(err.message);
    }

})


// get leader data from id 
router.get(('/:leaderId'), async (req, res)=>{
    try{
        const leader = await Leader.findById(req.params.leaderId);
        res.json(leader);
    }
    catch(err){
        res.send(err.message);
        console.log(res.statusCode);
    }
})

// post data
router.post('/', async (req, res) => {
    const leaderData = new Leader({
        name: req.body.name,
        designation: req.body.designation,
        age: req.body.age
    })

    try{
        const postLeader = await leaderData.save();
        res.json(postLeader);
        console.log(res.statusCode);
    }
    catch(err){
        res.send(err.message);
        console.log(res.statusCode);
    }
})



router.delete(('/:leaderId'), async (req, res)=>{
    try{
        const deleteLeader = await Leader.findByIdAndDelete(req.params.leaderId);
        res.send("Leader deleted....");
    }
    catch(err) {
        res.send(err.message);
    }
})


router.put('/:leaderId', async (req, res)=>{
    try{
        const leader = await Leader.findById(req.params.leaderId);
        leader.name = req.body.name;
        leader.designation = req.body.designation;
        leader.age = req.body.age;
        const updateLeader = await leader.save();
        res.json(updateLeader);
    }
    catch(err) {
        res.send(err.message);
        console.log(res.statusCode);
    }
})


module.exports = router;