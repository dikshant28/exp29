var express = require("express")
var app= express();
var mysql= require("mysql")
var connection= mysql.createConnection({
  host : "192.168.0.105",
  database: "myapp_db",
  user: "root",
  password: "root",
  port: 9099
})

connection.connect()

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



app.get("/product",(request, response)=>{
    var queryText=`select * from product`;
    connection.query(queryText, (err,data)=>{
        if(err==null)
        {
            response.send(JSON.stringify(data))
        }
        else
        {
            response.send(JSON.stringify(err))
        }
    })
})

app.post("/product",(request, response)=>{
    var title=request.body.title;
    var description=request.body.description;
    var price=request.body.price;
    var queryText=`insert into product(title,description,price) values('${title}','${description}',${price})`;
    connection.query(queryText, (err,data)=>{
        if(err==null)
        {
            response.send(JSON.stringify(data))
        }
        else
        {
            response.send(JSON.stringify(err))
        }
    })
})

app.put("/product/:id",(request, response)=>{
    var id=request.params.id;
    var title=request.body.title;
    var description=request.body.description;
    var price=request.body.price;
    var queryText="update product set title='${title}',description='${description}',price=${price} where id=${id}"
    connection.query(queryText, (err,data)=>{
        if(err==null)
        {
            response.send(JSON.stringify(data))
        }
        else
        {
            response.send(JSON.stringify(err))
        }
    })
})

app.listen(9898,()=>{

    console.log("Server Started...")
})
