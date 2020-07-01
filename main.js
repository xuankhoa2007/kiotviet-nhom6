var http = require('http');
var express = require('express');
var fs = require('fs');
var app = express();
app.listen(8084, "10.10.20.240");
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
        res.render("dangnhap", {
          msgerror: "Tài khoản không tồn tại"
        });
      }
      else {
        if (result[0].password == password) {
          var obj = JSON.stringify(result);
          localStorage.setItem(cachekey, obj)
          res.redirect("/home");

        }
        else {
          res.render("dangnhap", {
            msgerror: "Mật khẩu không chính xác"
          });
        }
      }

    });
  }
  );

  app.get("/", function (req, res) {
    res.render('index' ,{

    });
  }
  );


  app.get("/dangnhap", function (req, res) {
    res.render('dangnhap', {
      msgerror: ""
    });
  }
  );

  app.get("/logout", function (req, res) {
    var cachekey = "thongtin";
    localStorage.removeItem(cachekey);
    res.redirect('/hanghoa');
  }
  );

  app.post("/dangky", function (req, res) {
    var username = req.body.tendangnhap;
    var password = req.body.matkhau;
    var fullname = req.body.hovaten;
    var phonenumber = req.body.sodienthoai;
    var email = req.body.email;
    var address = req.body.diachi;
    var sql = "INSERT INTO `users` (`username`, `password`, `fullname`, `phonenumber`, `email`, `address`) VALUES ('" + username + "', '" + password + "', '" + fullname + "', '" + phonenumber + "', '" + email + "', '" + address + "')";
    con.query(sql, function (error, result) {
      if (error) throw error;
      console.log(sql);
      res.redirect("/dangnhap");
    }
    );
  });

  app.get("/dangky", function (req, res) {
    res.render('dangky', {

    });
  }
  );

  app.get("/hanghoa", function (req, res) {
    res.render('hanghoa', {
      
    });
  }
  );
  app.post("/themhanghoa", function (req, res) {
    var tenhang = req.body.tenhang;
    var idnhomhang = req.body.idnhomhang;
    var idthuonghieu = req.body.idthuonghieu;
    var idvitri = req.body.idvitri;
    var giavon = req.body.giavon;
    var giaban = req.body.giaban;
    var trongluong = req.body.trongluong;
    var images = req.body.images;
    var sql = "INSERT INTO `hang_hoa` (`ten_hang`, `id_nhom_hang`, `id_thuong_hieu`, `id_vi_tri`, `gia_von`, `gia_ban`, `trong_luong`, `images`) VALUES ('"+tenhang+"', '"+idnhomhang+"', '"+idthuonghieu+"', '"+idvitri+"', '"+giavon+"', '"+giaban+"', '"+trongluong+"', '"+images+"');";
    con.query(sql, function (error, result) {
      if (error) throw error;
      console.log(sql);
      res.redirect("/hanghoa");
    }
    );
  });

  app.get("/home", function (req, res) {
    res.render('index_trangchu', {

    });
  }
  );

  app.get("/test", function (req, res) {
    res.render('test', {

    });
  }
  );

  app.get("/upload", function (req, res) {
    res.render('upload', {

    });
  }
  );