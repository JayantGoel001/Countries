let express = require("express");
let router = express.Router();

let countryCtrl = require("../controllers/countries");

let apiGuard = (req,res,next)=>{
    if (req.get('host')!=="localhost"){
        res.json({ error : "Can't Create, Update or Delete Countries from API while in production mode." })
    }else {
        next();
    }
}

router.route("/countries/new")
    .get(apiGuard,countryCtrl.getCountryForm);

router.route("/countries/:id/edit")
    .get(apiGuard,countryCtrl.getEditCountryForm);

router.route("/countries/:id")
    .get(countryCtrl.getCountry)
    .put(apiGuard,countryCtrl.editCountry)
    .delete(apiGuard,countryCtrl.deleteCountry);

router.route("/countries")
    .get(countryCtrl.getCountries)
    .post(apiGuard,countryCtrl.createCountry);

router.route("/reset")
    .get(apiGuard,countryCtrl.reset);

module.exports = router;