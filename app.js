require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');



const app = express();
app.use(cors());
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true}));

//Logic
// importing user context
const User = require("./model/user");
const Credit = require("./model/credit");
const { SocketAddress } = require("net");

app.get('/',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/index.html');
})

//Billing Address
app.post("/shipping-address", async (req, res) => {
    // billing logic
    try{
        const { first_name, last_name, phone_number, apt, street_address, city, zip_code, state } = req.body;
        if (!(first_name && last_name && phone_number && city && street_address)) {
            return res.status(400).send("All input is required");
    }

    //create User in our database
    const user = await User.create({
        first_name,
        last_name,
        street_address,
        apt,
        city,
        state, 
        zip_code,
        phone_number
    });

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/credit-card", async (req, res) => {
  // billing logic
  try{
      const { card_name, card_number, expiry_date, security_code, first_name, last_name, phone_number, apt, street_address, city, zip_code, state } = req.body;
      if (!(card_name && card_number && expiry_date && security_code)) {
          return res.status(400).send("All input is required");
  }

  //create User in our database
  const credit_card = await Credit.create({
      card_name,
      card_number,
      expiry_date,
      security_code,
      first_name,
      last_name,
      street_address,
      apt,
      city,
      state, 
      zip_code,
      phone_number
  });

  // return new user
  res.status(201).json(credit_card);
} catch (err) {
  console.log(err);
}
});

module.exports = app