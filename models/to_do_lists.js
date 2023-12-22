const mongoose = require('mongoose');
const db       = require("./db");

// 建立 schema
let todolistSchema = new mongoose.Schema({
    "to_do_id"  : String,
        "subject" : String,
        "reserved_time" : String,
        "modified_time" : String,
        "brief"   : String,
        "level"   : Number,
        "author"  : String,
        "content" : String,
        "attachments":Array
  }, { collection: "to-do-lists"}
);
  

// 建立 model
let todolistModel = db.model("to-do-lists",todolistSchema);

// export 出去 , 整合到 index.js 裡
module.exports = todolistModel;
  