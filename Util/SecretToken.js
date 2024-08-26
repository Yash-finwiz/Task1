require("dotenv").config();
const jwt = require("jsonwebtoken");


const TOKEN_KEY = process.env.TOKEN_KEY || 'default_secret_key'; 

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, TOKEN_KEY, {
    expiresIn: 1 * 24 * 60 * 60, 
  });
};
