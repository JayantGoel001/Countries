let express = require("express");
let router = express.Router();

let countryCtrl = require("../controllers/countries");

router.route("/countries/new").get(countryCtrl.getCountryForm);
router.route("/countries/:id/edit").get(countryCtrl.getEditCountryForm);
router.route("/countries/:id")
    .get(countryCtrl.getCountry)
    .put(countryCtrl.editCountry)
    .delete(countryCtrl.deleteCountry);

router.route("/country")
    .get(countryCtrl.getCountries)
    .post(countryCtrl.createCountry);


module.exports = router;