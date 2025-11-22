const mongoose = require('mongoose'); 
const mongoURI = "mongodb://localhost:27017/inotebook"; // DB name

const connectToMongo = async () => {
    const conn = await mongoose.connect(mongoURI, {});
    
        if (conn) {
            console.log("Connection Successful.");
        } else {
            console.log("Connection Failed.");
        }
}

module.exports = connectToMongo;
