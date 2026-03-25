const mongoose = require("mongoose");
const User = require("./models/User");

mongoose
  .connect(
    "mongodb+srv://emrecan:A.e.3449799@abdullahmuhammedasaf.ubtirhf.mongodb.net/?appName=ABDULLAHMUHAMMEDASAF",
  )
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.log("MongoDB bağlantı hatası:", err));

const express = require("express");
const app = express();
const PORT = 1453;

//! JSON parse middleware
app.use(express.json());

//! GET endpoint
// app.get("/users", (req, res) => {
//   res.json(users);
// });

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//! POST endpoint
// app.post("/users", (req, res) => {
//   const newUser = { id: users.length + 1, ...req.body };
//   users.push(newUser);
//   res.status(201).json(newUser);
// });

app.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();

  res.status(201).json(newUser);
});

//! DELETE endpoint
// app.delete("/users/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   users = users.filter((user) => user.id !== id);
//   res.json({ message: "Kullanıcı silindi!" });
// });

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.status(404).json({ message: "User bulunamadı" });
  }

  res.json({ message: "User silindi", user: deletedUser });
});

//! UPDATE endpoint
// app.put("/users/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const updatedData = req.body;

//   const userIndex = users.findIndex((user) => user.id === id);
//   if (userIndex === -1) {
//     return res.status(404).json({ message: "Kullanıcı bulunamadı" });
//   }

//   users[userIndex] = {
//     ...users[userIndex],
//     ...updatedData,
//   };

//   res.json(users[userIndex]);
// });

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User bulunamadı" });
  }

  res.json(updatedUser);
});

app.listen(PORT, () => {
  console.log(`Server ayağa kalktı ve ${PORT} portunu dinliyor...`);
});
