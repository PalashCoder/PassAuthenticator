const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const PasswordSchema = new mongoose.Schema({
  site: String,
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwords: [PasswordSchema],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
