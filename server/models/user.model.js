const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  weight_Goal: String,
  activity_level: String,
  gender: String,
  dob: Date,
  country: String,
  height: Number,
  weight: Number,
  goal_weight: Number,
  weekly_goal: String,
  excercises: [
    {
      title: String,
      calories: Number,
      minute: Number,
      date: Date,
    },
  ],
});
const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };
