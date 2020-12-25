import express from "express";
import session from "express-session";
import path from "path"
import login from "./routers/login"
import api from "./routers/api"
import auth from "./controllers/auth"
import cookieParser from "cookie-parser"

let app = express();
app.listen(3001, function () {
  console.log("Express server has started on port 3001");
});

app.use(express.static(path.join(__dirname, "/")))
app.use(express.json());
app.use(cookieParser())
app.use(
  session({
    secret: "@#@$bclass#@$#$",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12 // 쿠키 유효기간 12시간
    }
  })
);

app.use('api', api)
app.use("/login", login)
app.get("/", auth, function(req, res) {
    console.log("!@#!@#!@#", req.body)
    console.log("!@342112341234", req.session)
    res.status(200).send("landing page")
})