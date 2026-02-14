require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Groundwater = require("../models/Groundwater");

connectDB();

const seed = async () => {

 await Groundwater.deleteMany();

 await Groundwater.insertMany([
   { location:"Nashik", year:2019, depth:12, rainfall:700 },
   { location:"Nashik", year:2020, depth:15, rainfall:820 },
   { location:"Nashik", year:2021, depth:18, rainfall:760 },
   { location:"Nashik", year:2022, depth:21, rainfall:690 },
   { location:"Nashik", year:2023, depth:25, rainfall:640 }
 ]);

 console.log("✅ Data Seeded");
 process.exit();
};

seed();
