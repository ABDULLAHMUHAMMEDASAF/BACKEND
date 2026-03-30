<<<<<<< HEAD
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

=======
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

>>>>>>> 6cac44af4ed33a265fd68fc9fae0cac5d8d733bf
module.exports = mongoose.model("User", userSchema);