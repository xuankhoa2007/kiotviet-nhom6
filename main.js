var http = require('http');
var express = require('express');
var fs = require('fs');
var app = express();
app.listen(8084, "10.22.213.230");
var bodyParser = require('body-parser');
var localStorage = require('localStorage');
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kiotviet",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Đã connect tới server");
});
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.post("/dangnhap", function (req, res) {
    var username = req.body.username;
    var password = req.body.pass;
    var cachekey = "thongtin";
    var sql = "SELECT * FROM `users` WHERE username = '" + username + "'";
    con.query(sql, function (error, result) {
      if (result.length == 0) {
        console.log("Tài khoản không tồn tại!");
      }
      else {
        if (result[0].password == password) {
          var obj = JSON.stringify(result);
          localStorage.setItem(cachekey, obj)
          res.redirect("/home");
  
        }
        else {
          res.redirect("/dangnhap");
        }
      }
  
    });
  }
  );

  app.get("/home", function (req, res) {
    res.render('home', {
  
    });
  }
  );
  
  app.get("/", function (req, res) {
    res.render('index', {
  
    });
  }
  );
  
  app.get("/dangnhap", function (req, res) {
    res.render('dangnhap', {
  
    });
  }
  );

  app.get("/dangky", function (req, res) {
    res.render('dangky', {
  
    });
  }
  );