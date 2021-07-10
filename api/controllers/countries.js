let mongoose = require("mongoose");
const Country = mongoose.model("Country");
let countryData = require("../../data");

let getCountries = function(req, res) {
    Country.find((err,countries)=>{
        if(err){
            return res.json({ error : err });
        }
        res.statusJson(200, { countries : countries, message: "Get All Countries" });
    });
}

let getCountryForm = function(req, res) {
    res.render("form",{ title : "Create A Country" });
}

let createCountry = function(req, res) {
    if (!req.body.name){
        return res.statusJson(400,{message : "Missing name for the country."});
    }
    let country = {
        name : req.body.name
    }
    Country.find({},null,{sort : { fakeID : 1} },(err,countries)=> {
        if(err){
            return res.json({ error : err });
        }
        let fakeID = countries.length+1;
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].fakeID !== i+1){
                fakeID = i+1;
                break;
            }
        }
        country.fakeID = fakeID;
        Country.create(country,(err, newCountry) => {
            if (err) {
                return res.json({error: err});
            }
            res.statusJson(201, {message: "Create New Country", country: newCountry});
        });
    });
}

let getCountry = function(req, res) {
    Country.findOne({fakeID : req.params.id},null,{},(err,country)=>{
        if(err){
            return res.json({ error : err });
        }
        res.statusJson(200, { message: "Get Specific Country", country : country });
    });
}

let getEditCountryForm = function(req, res) {
    Country.findById(req.params.id,(err,country)=>{
       if(err){
           return res.json({ error : err });
       }
       res.render("form",{ title : "Edit A Country", country : country });
    });
}

let editCountry = function(req, res) {
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

let deleteCountry = function(req, res) {
    Country.findByIdAndRemove(req.params.id,(err,country)=>{
        if(err){
            return res.json({ error : err });
        }
        if (!country){
            return res.statusJson(404,{message : "Could not find country."})
        }
        res.statusJson(204, { message: "Delete Specific Country", country:country });
    })
}
let reset = (req,res)=>{
    Country.deleteMany({},(err,_)=>{
        if(err){
            return res.json({ error : err });
        }
        Country.insertMany(countryData).then(_  => {
            return res.redirect("/countries");
        }).catch((err)=>{
            return res.json({error: err});
        });
    })
}
module.exports = {
    getCountries,
    getCountryForm,
    createCountry,
    getCountry,
    getEditCountryForm,
    editCountry,
    deleteCountry,
    reset
}
