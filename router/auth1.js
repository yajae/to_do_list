const express=require("express");
const jwt =require("jsonwebtoken");
const bcrypt=require('bcrypt');
const router=express.Router();
const valid_address="https://yajae.github.io";


const fs =require('fs');

const key="six";
let readFilePromise = (dataPath) => {
    return new Promise( (resolve,reject) => {
      fs.readFile(dataPath,"utf8",(err,data)=> {
        if(err) reject(err);
        else resolve(JSON.parse(data));
      });
    });
  };
// 1.註冊
// 客戶提供email帳號密碼 /加密?/儲存?/確認是否重複 如果無相同給jwt簽章
router.post('/signup',async(req,res)=>{

  try{
    res.header('Access-Control-Allow-Origin', valid_address)
    res.header('Access-Contreol-Allow-Credentials', true) 
    const {email,password,nickname}=await(req.body);
    const users = await readFilePromise("./user.json");
    function aaa(value){
        if(Object.keys(value)==email)
        return value
        }
        const user=users.filter(aaa);
    
        if(user.length==0){
        // const hashPassword=await bcrypt.hash(password,10);
        users[users.length]={email:{
        nickname,
        password}};
        res.status(201).send({message:`新會員註冊成功 no:${users.length}`});}
       else{ res.status(201).send({message:"已經註冊過了喔~~~"});}
    }catch(err){
    res.send("檔案有問題 Debuggggggggg！！！");
    console.log(err);
    } 
})
router.options('/signup', (req, res) => {
    res.header('Access-Control-Allow-Origin', valid_address)
    res.header('Access-Contreol-Allow-Credentials', true) 
    res.header('Access-Control-Allow-Headers', 'content-type, X-App-Version')
    res.header("Access-Control-Max-Age"," 86400");
    res.end()
});


// 2.登入
router.post('/login',async(req,res)=>{
    res.header('Access-Control-Allow-Origin', valid_address) // 明確指定
    res.header('Access-Control-Allow-Credentials', true) 
    res.json({
        success: true
      })
    const {email,password}=req.body;
// 2-1驗證用戶是否存在
const user=users[email];
if(!user){
    return res.status(401).send({
        error:"用戶不存在"
    })
}
if(!await(bcrypt.compare(password,user.password))){
    return res.status(401).send({
        error:"登入錯誤"
    });
}

// 2-2密碼驗證
// 2-3JWT簽章
const token=jwt.sign({
    email,
    nickname:user.nickname
},key);
// console.log(token);


res.status(201).send({message:"成功~~",token});
})


router.get('/profile',(req,res)=>{
    const token=req.headers['authorization'];
    console.log('token',token);
    // // 3-1驗證用戶有送
    if(!token){
        return res.status(403).send({errr:"未登入"}
        )
    }
    // 3-2進行驗證
    jwt.verify(token,key,(err,user)=>{
   
        if(err){
            return res.status(403).send({
                error:'驗證錯誤'
            })
        };
        console.log(user);
        res.send({
            message:"成功",
            users
        })
    })

    
})
module.exports=router;