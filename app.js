const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req,res){

var fName = req.body.firstName;
var lName = req.body.lastName;
var email = req.body.inputEmail;
var data = {
  members: [
    {email_address:email,
  status:"subscribed",
  merge_fields:{
    FNAME:fName,
    LNAME:lName
  }
}
  ]
}
var jsonData = JSON.stringify(data);

var options = {
url:"https://us3.api.mailchimp.com/3.0/lists/b8be87bf7e",
method:"POST",
headers:{
  "Authorization":"ismail1 b13d08a08d0c3013624391740903d805-us3"
},
body:jsonData
};


request(options,function(error,response,body){
console.log(response.statusCode)
if(error){
  res.sendFile(__dirname + "/fail.html")
}
else{
if(response.statusCode === 200){
  res.sendFile(__dirname + "/success.html") 
}
}

})


})



app.get("/",function(req,res){

  res.sendFile(__dirname + "/signup.html")
  var c = req.body;
  console.log(c);

})

app.post('/failure',function(req,res){
  res.redirect("/")
})



app.listen(process.env.PORT || 3000,function(){
  console.log("server is runing")
})


//

// b13d08a08d0c3013624391740903d805-us3