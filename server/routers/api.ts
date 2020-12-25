import express from "express";
import session from "express-session";

let api = express.Router()

api.get("/loadData", function(req, rest) {
    
})

api.post("/addList/:listname", function(req, rest) {

})

api.delete("/deleteList/:listname", function(req, rest) {

})

api.post("/addItem/:listname/:item", function(req, rest) {

})

api.delete("/deleteList/:listname/:item", function(req, rest) {

})

export default api