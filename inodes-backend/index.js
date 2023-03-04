const connectToMongo =require('./db')
const express = require('express')
const port = 5000

connectToMongo();

const app = express()
app.use(express.json())

// available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/',(req,res)=>{
  console.log(req.body)
  res.send(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

