const express = require('express');
const app = express();
const hbs    = require("hbs");
const path   = require("path");


app.use( express.json() );
app.use( express.urlencoded( {
		extended : false ,
		limit : "1mb",
		parameterLimit : '10000'
}));


//// Model 部分建立完 , 再開啟即可使用
const toDoListRouter = require("./router/to-do-list");
const dramasRouter   = require("./router/dramas");
const aboutRouter    = require("./router/about");

app.use("/dramas",dramasRouter);
app.use("/about", aboutRouter);
app.use("/to-do-list",toDoListRouter);

app.engine('html',hbs.__express);
app.set("views" , path.join(__dirname ,"application","views"));
app.use(express.static(path.join(__dirname,"application")));


app.get("/",(req,res)=>{
  res.render("welcome.html");
  });

app.use((req,res)=>{
  res.status(404).send("API 尚未開發！");
});



app.listen(8088,function(){
    console.log("Server is running at http://localhost:" + String(8088));
});
