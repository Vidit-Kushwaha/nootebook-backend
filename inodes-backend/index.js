const connectToMongo =require('./db')
const express = require('express')
var cors = require('cors')
require('dotenv').config();
const port = process.env.PORT || 5000

connectToMongo();

const app = express()
app.use(express.json())
app.use(cors())

// available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/',(req,res)=>{
  res.send(req.body)
})
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

