const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username not provided. Please provide a username."],
    unique: [true, "Username already exists. Please provide another username."],
    maxlength: [16, "Username can be max 16 characters long."],
  },
  address: {
    type: String,
    required: [true, "Address not provided. Please provide an wallet address."],
    unique: [true, "Address not unique. Do you already have an account?"],
    maxlength: 128,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 512,
    trim: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  followers: {
    type: [String],
  },
  following: {
    type: [String],
  },
});

module.exports =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);
