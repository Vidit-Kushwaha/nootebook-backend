const mongoose = require('mongoose');
const mongoURI=process.env.MONGO_CONNECTION;
const connectToMongo = async() => {
   try{
      mongoose.connect(mongoURI,()=>{

        console.log("Connected to Mongo Successfully");
    }) 
    
   }  catch(err){console.log(err)}
}
mongoose.set('strictQuery', false);
module.exports = connectToMongo;