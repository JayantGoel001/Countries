const request = require("request");

let domainPath = "http://localhost:3000";

if (process.env.NODE_ENV === "PRODUCTION"){
    domainPath = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.rpwwv.mongodb.net/country_data?retryWrites=true&w=majority`;
}

let getCountryList = (req,res)=>{
    const path = "/api/countries/";
    const requestOption = {
        url : `${domainPath}${path}`,
        method : "GET"
    };
    request(requestOption,(err,response)=>{
        if(err){
            return res.json({ error : err });
        }
        let countries = JSON.parse(response.body).countries;
        if (response.statusCode=== 200){
            return res.render('countries',{ title : "List Of Countries",countries : countries });
        }
        res.json({ message : "Something Went Wrong" });
    });
}
let getCountry = (req,res)=>{
    const path = `/api/countries/${req.params.id}`;
    const requestOption = {
        url : `${domainPath}${path}`,
        method : "GET"
    };

    request(requestOption,(err,response)=>{
        if(err){
            return res.json({ error : err });
        }
        let body = JSON.parse(response.body);
        if (body.error){
            res.render("404",{ title : "404" });
        }else {
            if (response.statusCode === 200) {
                return res.render('country', {title: "Country", country: body.country});
            } else {
                res.json({message: "Something Went Wrong"});
            }
        }
    });

}
let createCountry = (req,res)=>{
    const path = "/api/countries/"
    const requestOption = {
        url : `${domainPath}${path}`,
        method : 'POST',
        json : {
            name : req.body.name
        }
    };
    request(requestOption,(err,response)=>{
        if(err){
            return res.json({ error : err });
        }
        if (response.statusCode=== 201){
            return res.redirect("/countries");
        }else if (response.body.error){
            return res.json({ error : response.body.error });
        }else if (response.statusCode === 400){
            return res.json({ body : response.body });
        }else {
            return res.json({message: "Something Went Wrong"});
        }
    });
}
let editCountry = (req,res)=>{
    const path = `/api/countries/${req.params.id}`
    const requestOption = {
        url : `${domainPath}${path}`,
        method : 'PUT',
        json : {
            name : req.body.name
        }
    };
    request(requestOption,(err,response)=>{
        if(err){ return res.json({ error : err }); }
        if (response.statusCode === 201){
            return res.redirect("/countries");
        }else if (response.statusCode === 400){
            return res.json({ body : response.body });
        }else {
            return res.json({ message: "Something Went Wrong" });
        }
    });
}
let deleteCountry = (req,res)=>{
    const path = `/api/countries/${req.params.id}`
    const requestOption = {
        url : `${domainPath}${path}`,
        method : 'DELETE'
    };
    request(requestOption,(err,response)=>{
        if(err){ return res.json({ error : err }); }
        if (response.statusCode === 404){
            return res.json({ body : response.body });
        }
        res.redirect("/countries");
    });
}

module.exports = {
    getCountryList,
    getCountry,
    createCountry,
    editCountry,
    deleteCountry
}