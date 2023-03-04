const express = require('express');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const JWT_secret = "viditkushwaha%95.76"

//Router 1 to create user and verify user does not exist
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

        try {
            //checking if user existing before
            let user = await User.findOne({ email: req.body.email })
            if (user) { return res.status(400).json({ error: "User exist" }) }

            //to create a secure password 
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)

            //creating a user 
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            })

            //json web token and sign token using JWT_secret
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, JWT_secret);
            res.json({ token })
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error")
        }
    })

//Router 2 to login 
router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
],
    async (req, res) => {
        //error for data validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {

            let user =await User.findOne({ email });
            if (!user) { return res.status(400).json("invalid credentials") }

            const passwordCompare =await bcrypt.compare(password, user.password);
            if(!passwordCompare){ return res.status(400).json("invalid credentials") }

            //json web token and sign token using JWT_secret
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, JWT_secret);
            res.json({ token })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error")
        }
    })

//Router 3 
    router.post('/getin',fetchuser,
        async (req, res) => {
            try{
           const userId=req.user.id;
            const user=await User.findById(userId).select("-password");
            res.send(user);
            }catch(error){
                console.error(error.message);
            res.status(500).send("Internal server error")
            }
        })
module.exports = router;