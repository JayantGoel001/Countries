const request = require("request");

let domainPath = "http://localhost:3000";
const requestOpt = (path,method)=>{
    return {
        url : `${domainPath}${path}`,
        method : method
    }
}
let getCountryList = (req,res)=>{
    const path = "/api/countries/";
    const requestOption = requestOpt(path,'GET');
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
    const requestOption = requestOpt(path,'GET');

    request(requestOption,(err,response)=>{
        if(err){
            return res.json({ error : err });
        }
        let country = JSON.parse(response.body).country;
        if (response.statusCode=== 200){
            return res.render('country',{ title : "Country",country : country });
        }
        res.json({ message : "Something Went Wrong" });
    });

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