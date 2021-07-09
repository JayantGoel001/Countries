const request = require("request");


let getCountryList = (req,res)=>{
    res.render('index',{ title : "RESTFull Routing" });
}
let getCountry = (req,res)=>{
    res.render('index',{ title : "RESTFull Routing" });
}
let createCountry = (req,res)=>{
    res.render('index',{ title : "RESTFull Routing" });
}
let editCountry = (req,res)=>{
    res.render('index',{ title : "RESTFull Routing" });
}
let deleteCountry = (req,res)=>{
    res.render('index',{ title : "RESTFull Routing" });
}

module.exports = {
    getCountryList,
    getCountry,
    createCountry,
    editCountry,
    deleteCountry
}