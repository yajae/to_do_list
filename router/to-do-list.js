const express = require("express");
var router = express.Router();
const model = require("../models"); 
// to-do-list 清單頁面
router.get("/list",(req,res)=>
{res.render("to-do-list.html")}
)
router.get("/list/list",
    async(req,res)=>{
      try{  let data = await model.todolists.find( { })
      // 透過 dramaId 大 -> 小 排序
    res.json({ result:data});
 
    } catch(err) {
    console.log(err);
    res.status(500).json({ message : "Server 端發生錯誤！" });
    };
    }
);

// to-do-list 細節頁面 
router.get("/detail",
    async(req,res)=>{
        res.render("to-do-detail.html");
    }
);

router.post("/detail/:to_do_id",
   async (req,res)=>{
    let to_do_id= req.params.to_do_id;
     await model.todolists.create(req.body)
     console.log(to_do_id)

     res.json({message:"ok.",result:`${req.params.to_do_id}`});
    }
);
router.delete("/detail/:to_do_id",
   async (req,res)=>{
     await model.todolists.deleteOne({"to_do_id":req.params.to_do_id})
     res.json({message:"ok.",result:`${req.params.to_do_id}`});
    }
);

router.get("/the-newest-id",
    async(req,res)=>{
        let data = await model.todolists
         .findOne({},{"to_do_id":1})
         .sort({"to_do_id":-1})
         let newid=String(Number(data.to_do_id)+1)

          res.json({result:newid});
    }
);

module.exports = router;
