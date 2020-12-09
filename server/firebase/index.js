var admin = require("firebase-admin");
var serviceAccount = require('./../config/firebaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerce-7f081.firebaseio.com"
});

module.exports = admin;