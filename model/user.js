const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
    first_name: { type:String, default:null },
    last_name: { type:String, default:null },
    street_address: { type:String },
    phone_number: { type:String },
    apt: { type:String},
    city: { type:String },
    state: { type:String },
    zip_code: { type:String }
})

shippingSchema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret.password;
    }
});

module.exports = mongoose.model("user", shippingSchema);