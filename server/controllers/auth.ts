
import express from "express";
import database from "../userinfoDB.json"
import jwt from 'jsonwebtoken'

const SECRET_KEY = "whwnsqja"

const auth = function(req, res, next) {
    try {
        const clientToken = req.cookies.authtoken;
        console.log("req.cookies.authtoken", clientToken)
        jwt.verify(clientToken, SECRET_KEY, (err, decoded) => {
            if (decoded) {
                res.userid = decoded['userid'];
                next();
            } else if (err && err.name === "TokenExpiredError") {
                console.log("123123", err)
                res.clearCookie("authtoken")
                res.status(401).json({ error: 'Token expired' });
            } else {                
                console.log("!@#!@#", err)
                res.clearCookie("authtoken")
                res.status(401).json({ error: 'Unauthorized'});
            }
        })
    } catch (err) {
        res.status(401).json({ error: 'something went wrong' })
    }
}

export default auth


