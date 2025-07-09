const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const SECRET = "supersecretkey";
const users = []
const findUser = (email) => users.find(user => user.email === email);

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
    if (findUser(email)) return res.status(400).json({ msg: "User already exists" });
  
    const hashed = await bcrypt.hash(password, 10);
    users.push({ email, password: hashed })
    res.status(201).json({ msg: "User registered" });
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = findUser(email);
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
  res.json({ token });
})
module.exports = router;
