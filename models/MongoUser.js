
const mongoose = require("mongoose");

const mongoUserSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("MongoUser", mongoUserSchema, "users");

