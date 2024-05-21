import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, "secretkey", { expiresIn: "1h" });
};

router.post("/login", async (req, res) => {
  const { googleId, secret } = req.body;
  try {
    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({ googleId, secret, passwords: [] });
      await user.save();
    }
    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

router.post("/add-password", async (req, res) => {
  const { token, site, username, password } = req.body;
  try {
    const decoded = jwt.verify(token, "secretkey");
    const user = await User.findById(decoded.id);
    user.passwords.push({ site, username, password });
    await user.save();
    res.json({ message: "Password added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding password" });
  }
});

router.get("/get-passwords", async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, "secretkey");
    const user = await User.findById(decoded.id);
    res.json(user.passwords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching passwords" });
  }
});

router.post("/edit-password", async (req, res) => {
  const { token, id, site, username, password } = req.body;
  try {
    const decoded = jwt.verify(token, "secretkey");
    const user = await User.findById(decoded.id);
    const pass = user.passwords.id(id);
    pass.site = site;
    pass.username = username;
    pass.password = password;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password" });
  }
});

router.post("/delete-password", async (req, res) => {
  const { token, id } = req.body;
  try {
    const decoded = jwt.verify(token, "secretkey");
    const user = await User.findById(decoded.id);
    user.passwords.id(id).remove();
    await user.save();
    res.json({ message: "Password deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting password" });
  }
});

export default router;
