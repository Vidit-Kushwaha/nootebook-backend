const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

router.post('/createUser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
],
    async (req, res) => {
        //error for data validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{
        //checking if user existing before
        let user = User.findOne({ email: req.body.email })
        // if (!user) { return res.status(400).json({ error: "User exist" }) }

        //creating a user 
        user =await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        })
        res.json(user)
    }
    catch (error){
        console.error(error.message);
        res.status(500).send(error.message)
    }
    })


module.exports = router;