const mongoose = require("mongoose");
const User = require("./models/User");
const MongoUser = require("./models/MongoUser");
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.log("MongoDB bağlantı hatası:", err));

const express = require("express");
const app = express();
const PORT = process.env.PORT || 1453;

//! JSON parse middleware
app.use(express.json());
app.use(cors());

//! GET endpoint
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//! POST endpoint
app.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

//! DELETE endpoint
app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.status(404).json({ message: "User bulunamadı" });
  }

  res.json({ message: "User silindi", user: deletedUser });
});

//! UPDATE endpoint
app.put("/users/:id", async (req, res) => {
  const id = req.params.id;

  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedUser) {
    return res.status(404).json({ message: "User bulunamadı" });
  }

  res.json(updatedUser);
});

//! ---------------------------------- MONGO USERS ------------------------------------------
app.get("/mongo-users", async (req, res) => {
  const users = await MongoUser.find();
  res.json(users);
});

app.get("/asaf", (req, res) => {
  res.send("Merhaba zalim backend dünyası");
});

app.listen(PORT, () => {
  console.log(`Server ayağa kalktı ve ${PORT} portunu dinliyor...`);
});
