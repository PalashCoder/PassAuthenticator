import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
  site: String,
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  hardwareId: { type: String, required: false},
  passwords: [PasswordSchema],
});

const User = mongoose.model("User", UserSchema);
export default User;
