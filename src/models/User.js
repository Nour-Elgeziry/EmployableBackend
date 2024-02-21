// User schema
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    default: "User",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  education: {
    type: String,
    required: false,
  },
  experience: {
    type: String,
    required: false,
  },
  seniority: {
    type: String,
    required: false,
  },
  profession: {
    type: String,
    required: false,
  },
  cv: {
    type: Buffer,
    contentType: String,
    required: false,
  },
  isPersonalInformationComplete: {
    type: Boolean,
    default: false,
  },
  isCareerInformationComplete: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//HOOKS
User.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });
});

export default mongoose.model("User", User);
