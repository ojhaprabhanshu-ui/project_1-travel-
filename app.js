const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");
const Listing = require("./models/listing.js");

const mongourl = 'mongodb://127.0.0.1:27017/wanderlust';

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
// DB connection
async function main() {
    await mongoose.connect(mongourl);
}

main()
.then(() => console.log("connected to DB"))
.catch(err => console.log(err));

// ================= ROUTES =================

// root
app.get("/", (req, res) => {
    res.send("hi i m root");
});

// INDEX
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
});

// NEW
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

// CREATE
app.post("/listings", async (req, res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// EDIT
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
    
});

// UPDATE
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect("/listings"); 
});
//delete route 
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let DeletedListing= await Listing.findByIdAndDelete(id);
    console.log(DeletedListing);
    res.redirect("/listings");


});

// SHOW
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
});

// ==========================================

app.listen(8080, () => {
    console.log("server is listening on port 8080");
});