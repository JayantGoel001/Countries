let mongoose = require("mongoose");
mongoose.set('useCreateIndex',true);

const countrySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    fakeID : {
        type : Number,
        unique : true,
        required : true
    }
});

mongoose.model("Country",countrySchema);