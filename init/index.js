const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");

const mongourl = 'mongodb://127.0.0.1:27017/wanderlust';

async function main(){
    await mongoose.connect(mongourl);
}

// data cleaning
const initdb = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(data.data);
    console.log("data was initialised");
};

main()
.then(async () => {
    console.log("connected to DB");
    await initdb();
})
.catch(err => console.log(err));