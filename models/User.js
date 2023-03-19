const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Enter username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Enter password"],
  },
});

UserSchema.plugin(uniqueValidator, {
  message: "The {PATH} already exists",
});

UserSchema.pre("save", function (next) {
  const user = this;

  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;