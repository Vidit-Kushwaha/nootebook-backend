const mongoose = require('mongoose');
// const mongoURI = "mongodb://0.0.0.0:27017/test"
// const mongoURI = "mongodb+srv://vidit:9120991477@cluster0.fhxgkns.mongodb.net/test"
const mongoURI="mongodb+srv://randomthings1155:jIKaKMkfS14qpAr1@cluster1.ec8uv0q.mongodb.net/?retryWrites=true&w=majority"
const connectToMongo = async() => {
   try{
      mongoose.connect(mongoURI,()=>{

        console.log("Connected to Mongo Successfully");
    }) 
    
   }  catch(err){console.log(err)}
}
mongoose.set('strictQuery', false);
module.exports = connectToMongo;
