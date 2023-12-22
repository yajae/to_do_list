const mongoose = require("mongoose");

const conn = mongoose.createConnection("");

conn.on("connected" , ()=>{
  console.log("MongoDB is connected.");
});

module.exports = conn;