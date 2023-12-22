const express = require("express");
const model   = require("../models");

let router    = express.Router();

router.get("/page",
    (req,res)=>{
        // let name = req.session.userInfo.name;
        res.render("dramas.html");
    }
);


router.get("/list",
    (req,res)=>{
        let category = req.query.type;
        let query    = (category && category !== "全") ? { category } : {};
        model.dramas
             .find(query,{_id : 0 , __v : 0})
             .then(result=>{
                 res.json({result});
             })
             .catch(err=>{
                 res.status(500).json({message:"Server internal fault."});
             });
    }
);


router.post("/detail",
    async(req,res)=>{
        try{
        let lastElement=await model.dramas
        
            ////// 和下方邏輯相同 
            //  .find({},{"dramaId":1})
            //  .sort({"dramaId":-1})
            //  .limit(1)
            //////
             .findOne({},{"dramaId":1})
             .sort({"dramaId":-1})
          
                let newDramaId      = Number(lastElement.dramaId) + 1 ;
                console.log(newDramaId);
                req.body["dramaId"] =  String(newDramaId);
                
                let result= model.dramas.create(req.body);
         
                 res.json({message:req.body});
             }
             catch(err){
                 console.log(err);
                 res.status(500).json({message:"Server internal fault."});
             };
    }
);
router.put("/detail",
async(req,res)=>{

    let foundPutEle=await model.dramas
        
            ////// 和下方邏輯相同 
            //  .find({},{"dramaId":1})
            //  .sort({"dramaId":-1})
            //  .limit(1)
            //////
             .findOneAndUpdate({"dramaId":req.body.dramaId},{"name":req.body.name,"score":req.body.score},function (err, eleFound) {
                if (err) return console.log(err);
               console.log(eleFound);
              },{ useUnifiedTopology: true });
             
    console.log(foundPutEle);
    res.json({
        message :"ok.",
        redirect : "/"
       //  redirect : "https://google.com.tw"
     });
})
router.delete("/detail",
async(req,res)=>{

    let foundPutEle=await model.dramas
        
            ////// 和下方邏輯相同 
            //  .find({},{"dramaId":1})
            //  .sort({"dramaId":-1})
            //  .limit(1)
            //////
             .findOneAndDelete({"dramaId":req.body.dramaId},function (err, eleFound) {
                if (err) return console.log(err);
               console.log(eleFound);
              },{ useUnifiedTopology: true });
             
    // console.log(foundPutEle);
    res.json({
        message :"ok.",
        redirect : "/"
       //  redirect : "https://google.com.tw"
     });
})

module.exports = router;