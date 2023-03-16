const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

//Router 1 fetching all notes from server
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

//Router 2 adding note to db
router.post('/addnotes', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 })
], async (req, res) => {
    //error for data validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;
        const note = new Notes({ title, description, tag, user: req.user.id })
        const saveNote = await note.save();
        res.json(saveNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})

//Routes 3 updating existing note using put
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title,description,tag}=req.body;
    try{
    //creating newNote object
    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    //Finding note to be update and update it
    let note= await Notes.findById(req.params.id);
    if(note.user.toString() !== req.user.id){ return res.status(401).send("Not Allowed")}
    if(!note){ return res.status(404).send("Not Found")}

    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})
//Routes 4 deleting existing note using delete
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try {
    //Finding note to be delete and delete it
    let note= await Notes.findById(req.params.id);
    if(note.user.toString() !== req.user.id){ return res.status(401).send("Not Allowed")}
    if(!note){ return res.status(404).send("Not Found")}

    note=await Notes.findByIdAndDelete(req.params.id)
    res.json({"sucessfully":"note deleted"});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
}
})

module.exports = router;