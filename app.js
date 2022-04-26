var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Forms");
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});

var app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/book", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var mode = req.body.mode;
  var therapist = req.body.therapist;
  var symptoms = req.body.symptoms;
  var pay = req.body.pay;
  var data = {
    "name": name,
    "email": email,
    "phone": phone,
    "mode": mode,
    "therapist": therapist,
    "symptoms": symptoms,
    "pay": pay
  };

  db.collection("book").insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });

  return res.redirect("home.html");
});

app.post("/regu", function (req, res) {
  var fname = req.body.fullname;
  var email = req.body.email;
  var username= req.body.username;
  // var phone = req.body.phone;
  var password = req.body.passkey;
  var medical = req.body.mh;
  var data = {
    "name": fname,
    "email": email,
    // "phone": phone,
    "medical":medical,
    "username":username,
    "password":password
    
    // "medical":medical
    
  };

  db.collection("s").insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });

  return res.redirect("home.html");
});

//doctor registration
app.post("/regd", function (req, res) {
  var fname = req.body.fullname;
  var email = req.body.email;
  var username= req.body.username;
  var phone = req.body.contactno;
  var password = req.body.passkey;
  var file = req.body.file;
  var data = {
    "fname": fname,
    "email": email,
    "phone": phone,
    "file":file,
    "username":username,
    "password":password
  };

  db.collection("doctorreg").insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });

  return res.redirect("/public/home.html");
});
//login 
app.post('/login',function(req,res){
  const uname=req.body.username;
  const pass=req.body.password;
  const type=req.body.type;
  const data={
    "username":uname,
    "password":pass
  }
  if(type=="patient"){
    console.log(uname+" "+pass);
    console.log("Say cheese");
      db.collection('userreg').findOne(data,function(err,user){
        if(user){
          console.log("login Successful")
          res.redirect('google.com')
        }
        else{
          console.log("Incorrect details")
          res.redirect('/public/output2.png')
      }
    })
  }
  if(type=="doctor"){
    console.log(uname+" "+pass);
    db.collection('doctorreg').findOne(data,function(err,user){
      if(user){
        console.log("login Successful")
        res.redirect('google.com')
      }
      else{
        console.log("Incorrect details")
        res.redirect('google.com')
      }
    })
  }
})
//feedback database
app.post("/feedback", function (req, res) {
  var Name = req.body.name;
  var Username = req.body.username;
  var doctor=req.body.doctors;
  var Feedback = req.body.feedback;
  var data = {
    "Name": Name,
    "Username": Username,
    "doctor": doctor,
    "Feedback": Feedback
  };

  db.collection("feedback").insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });
  return res.redirect("home.html");
});
//Card database
app.post("/card", function (req, res) {
  var name = req.body.name;
  var cvv = req.body.cvv;
  var number=req.body.number;
  var months = req.body.months;
  var data = {
    "name": name,
    "cvv": cvv,
    "number": number,
    "months": months,
    "years":years
  };

  db.collection("cards").insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });

  return res.redirect("home.html");
});

app
  .get("/", function (req, res) {
    res.set({
      "Access-control-Allow-Origin": "*",
    });
    return res.redirect("home.html");
  })
  .listen(5000);

console.log("server listening at port 5000");
