const admin = require("firebase-admin");

const serviceAccount = require("./你的 firebase key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://example-0322-default-rtdb.firebaseio.com"
});

const db = admin.database();

module.exports = db;