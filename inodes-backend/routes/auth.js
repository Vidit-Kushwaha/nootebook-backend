const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const JWT_secret="viditkushwaha%95.76"

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
            let user =await User.findOne({ email: req.body.email })
            if (user) { return res.status(400).json({ error: "User exist" }) }
            
            //to create a secure password 
            const salt=await bcrypt.genSalt(10);
            const secPass= await bcrypt.hash(req.body.password,salt)

            //creating a user 
            user =await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            })

            //json web token and sign token using JWT_secret
            const data={
                user:{
                    id: user.id
                }
            }
            const token=jwt.sign(data,JWT_secret);
            res.json({token})
    }
    catch (error){
        console.error(error.message);
        res.status(500).send(error.message)
    }
    })


module.exports = router;