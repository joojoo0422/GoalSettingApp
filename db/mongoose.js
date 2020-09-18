/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */

const mongoose = require('mongoose')
const uri = "mongodb+srv://jerrylai:tg12345678@team29.gh6gt.mongodb.net/UserInfo?retryWrites=true&w=majority";
/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI || uri

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

module.exports = { mongoose }  // Export the active connection.