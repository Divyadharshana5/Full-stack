const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_Name: { type: String, required: true },
    last_Name: { type: String, required: true },
    date_of_birth: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
