const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DBconnection = async () =>{
    const MONGO_URL = process.env.MONGODB_URL;
    try{
        await mongoose.connect(MONGO_URL);
        console.log("DB connection established");
    }catch (error){
        console.log("Error while connecting to database",error);
    }
};

module.exports = { DBconnection };