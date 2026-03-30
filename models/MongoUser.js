<<<<<<< HEAD
const mongoose = require("mongoose");

const mongoUserSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("MongoUser", mongoUserSchema, "users");
=======
const mongoose = require("mongoose");

const mongoUserSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("MongoUser", mongoUserSchema, "users");
>>>>>>> 6cac44af4ed33a265fd68fc9fae0cac5d8d733bf
