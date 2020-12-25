import express from "express";
import database from "../userinfoDB.json"
import jwt from 'jsonwebtoken'
import auth from "../controllers/auth"

const SECRET_KEY = "whwnsqja"
let login = express.Router()

login.post("/", function(req, res) {
        let id = req.body.id
        let password = req.body.password

        if(!id || !password) {
            res.status(203).send("id or pass is missing")
        } else if (!database[id] || database[id].password !== password) {
            res.status(203).send("user info does not exist")
        } else if (database[id].password === password){
            const token = jwt.sign({userid: database[id].userid}, SECRET_KEY, {expiresIn: '5000'}) //'1d'
            res.cookie('authtoken', token)
            res.status(201).send("로그인성공 및 JWT토큰 발급함")
        } else {
            res.sendStatus(404)
        }
    }
)

login.get("/authcheck", auth, function(req, res) {
    console.log(res['userid'])
    res.status(201).send(`check_${res['userid']}`)
})


export default login