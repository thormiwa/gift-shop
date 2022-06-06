const mongoose = require("mongoose");

const creditSchema = new mongoose.Schema({
    card_name: { type:String, default:null },
    card_number: { type:String },
    expiry_date: { type:String },
    security_code: { type:String },
    first_name: { type:String, default:null },
    last_name: { type:String, default:null },
    street_address: { type:String },
    phone_number: { type:String },
    apt: { type:String},
    city: { type:String },
    state: { type:String },
    zip_code: { type:String }
})

creditSchema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret.password;
    }
});

module.exports = mongoose.model("credit", creditSchema);