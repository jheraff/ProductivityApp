const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/add-user", async (req, res) => {
  const { name, email } = req.body;

  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).send("User added successfully");
  } catch (error) {
    res.status(500).send("Error adding user");
  }
});

module.exports = router;