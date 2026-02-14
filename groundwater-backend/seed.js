const mongoose = require("mongoose");
const Model = require("./models/Groundwater");

mongoose.connect("mongodb://127.0.0.1:27017/groundwater");

async function seed(){
 await Model.deleteMany();

 await Model.insertMany([
  {year:2019, depth:12, location:"Nashik"},
  {year:2020, depth:15, location:"Nashik"},
  {year:2021, depth:18, location:"Nashik"},
  {year:2022, depth:21, location:"Nashik"},
  {year:2023, depth:25, location:"Nashik"}
 ]);

 console.log("Database Seeded");
 process.exit();
}

seed();
