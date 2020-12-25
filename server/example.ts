import express from "express";
import session from "express-session";

var app = express();
app.use(express.json());
app.use(
  session({
    secret: "@#@$MYSIGN#@$#$",
    resave: false,
    saveUninitialized: true
  })
);

app.listen(3000, function () {
  console.log("Express server has started on port 3000");
});
app.set("views", __dirname + "\\res");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

let name_database = {
  junbeumc: {
    age: 25,
    height: "177cm",
  },
  daddy: {
    age: 55,
    height: "170cm",
  },
};

let login_database = {
  junbeumc: "junbeumcpassword",
  daddy: "daddypassword",
};

app.get("/", function (req, res) {
  res.send("landing page");
});

app.get("/loginneeded", function (req, res) {
  let sess = req.session;
  res.send("hi there you need to login ");
});

app.post("/newuser", function (req, res) {
  let newuser_id = req.body.id;
  let newuser_password = req.body.password;

  if (login_database[newuser_id]) {
    res.send("your id already exists");
  } else {
    login_database[newuser_id] = newuser_password;
    res.send("newuser registered");
  }
  console.log("current login db: ", login_database);
});

app.get("/login/:id/:password", function (req, res) {
  console.log(req);
  let sess = req.session;
  let id = req.params.id;
  let pass = req.params.password;
  console.log(req.params);
  if (login_database[id] === pass) {
    console.log(true);
    req.session["user_id"] = id;
    req.session["user_password"] = pass;
    res.redirect("/");
  } else {
    console.log(false);
    res.send("id or password is wrong");
  }
});

app.get("/logout", function (req, res) {
  let sess = req.session;
  console.log(sess);
  if (req.session["user_id"]) {
    sess.destroy(function (err) {
      console.log(err);
    });
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

app.get("/myinfo", function (req, res) {
  let sess = req.session;
  console.log(sess);
  if (req.session["user_id"]) {
    res.json(name_database[req.session["user_id"]]);
  } else {
    console.log("로그인이 안됨");
    res.redirect("/loginneeded");
  }
});

app.get("/", function (req, res) {
  app.set("view engine", "html");
  res.render("output");
  // res.send(__dirname+ '/../res')
});

app.get("/example/:name", function (req, res) {
  let name = req.params.name;
  app.set("view engine", "ejs");
  res.render("example", {
    title: name,
    length: 5,
    name: name,
  });
});

app.post("/name", function (req, res) {
  for (let x of req.body) {
    console.timeLog(x);
  }
  console.log(req.body["name"]);
  console.log(req.body.name);
  res.send("new user. name: " + req.body["name"]);
});

app.post("/example2/:name", function (req, res) {
  app.set("view engine", "ejs");
  let name = req.params.name;
  console.log(req.body);
  // console.log(req.body["id"], req.body["pass"])
  if (!req.body["id"] || !req.body["pass"]) {
    res.json({ failed: 400 });
    return;
  }

  let id = req.body["id"];
  let pass = req.body["pass"];
  console.log(name);
  // res.render("example", {
  //     title: id,
  //     length: Number(pass)
  // })
  res.json({ success: 200 });
  return;
});

app.get("/test/:name", function (req, res) {
  let name = req.params.name;
  if (name_database[name]) {
    res.json(name_database[req.params.name]);
  } else {
    res.send("User info does not exist");
  }
});
