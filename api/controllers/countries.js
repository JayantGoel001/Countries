let mongoose = require("mongoose");
const Country = mongoose.model("Country");

let getCountries = function(req, res, next) {
    Country.find((err,countries)=>{
        if(err){
            return res.json({ error : err });
        }
        res.statusJson(200, { countries : countries, message: "Get All Countries" });
    });
}

let getCountryForm = function(req, res, next) {
    res.render("form",{ title : "Create A Country" });
}

let createCountry = function(req, res, next) {
    if (!req.body.name){
        return res.statusJson(400,{message : "Missing name for the country."});
    }
    let country = {
        name : req.body.name
    }
    Country.create(country,(err,newCountry)=>{
        if(err){
            return res.json({ error : err });
        }
        res.statusJson(201, { message: "Create New Country" , country : newCountry});
    })
}

let getCountry = function(req, res, next) {
    Country.findById(req.params.id,(err,country)=>{
        if(err){
            return res.json({ error : err });
        }
        res.statusJson(200, { message: "Get Specific Country", country : country });
    });
}

let getEditCountryForm = function(req, res, next) {
    Country.findById(req.params.id,(err,country)=>{
       if(err){
           return res.json({ error : err });
       }
       res.render("form",{ title : "Edit A Country", country : country });
    });
}

let editCountry = function(req, res, next) {
    if (!req.body.name){
        return res.statusJson(400,{ message : "Missing name from country" });
    }
    Country.findById(req.params.id,(err,country)=>{
        if(err){
            return res.json({ error : err });
        }
        if (!country){
            return res.statusJson(400, { message : "Could not find country." });
        }
        country.name = req.body.name;
        country.save((err,updateCountry)=>{
            if(err){
                return res.json({ error : err });
            }
            res.statusJson(201, { message: "Updated Country",country : updateCountry });
        });
    })
}

deleteCountry = function(req, res, next) {
    Country.findByIdAndRemove(req.params.id,(err,country)=>{
        if(err){
            return res.json({ error : err });
        }
        if (!country){
            return res.statusJson(400,{message : "Could not find country."})
        }
        res.statusJson(204, { message: "Delete Specific Country", country:country });
    })
}

module.exports = {
    getCountries,
    getCountryForm,
    createCountry,
    getCountry,
    getEditCountryForm,
    editCountry,
    deleteCountry
}
