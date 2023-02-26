const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost27017/?&directConnection=true&ssl=false"
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = connectToMongo;
