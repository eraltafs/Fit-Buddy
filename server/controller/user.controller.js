const { userModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register a new user
const userRegister = async (req, res) => {
  const {
    email,
    password,
    weight_Goal,
    activity_level,
    gender,
    dob,
    country,
    height,
    weight,
    goal_weight,
    weekly_goal,
  } = req.body;

  // Check if the user already exists
  const user = await userModel.findOne({ email });
  if (user?.email) {
    return res.send({ msg: "User already exists. Please login." });
  } else {
    try {
      // Hash the password for security
      bcrypt.hash(password, 5, async (err, hash) => {
        if (hash) {
          const user = new userModel({
            email,
            password: hash,
            weight_Goal,
            activity_level,
            gender,
            dob,
            country,
            height,
            weight,
            goal_weight,
            weekly_goal,
          });
          await user.save();
          return res.send({ msg: "User created successfully." });
        } else {
          console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Server error" });
    }
  }
};

// User login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  try {
    if (user?.email) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          // Generate a JWT token for authentication
          const token = jwt.sign({ email: user.email }, process.env.jwtsec);
          return res.send({ msg: "Login success", token });
        } else {
          console.log(err);
          return res.status(404).send({ msg: "User not found" });
        }
      });
    } else {
      return res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Server error" });
  }
};

// Upload user profile image
const userImagePost = async (req, res) => {
  const { img, email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }
    user.img = img;
    await user.save();
    res.send({ msg: "Image updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "Image not updated" });
  }
};

// Get user profile data
const userProfile = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await userModel.aggregate([
      { $match: { email } },
      {
        $project: {
          email: 1,
          weight_Goal: 1,
          activity_level: 1,
          gender: 1,
          dob: 1,
          country: 1,
          height: 1,
          weight: 1,
          goal_weight: 1,
          weekly_goal: 1,
          img: 1,
          cardio: 1,
          strength: 1,
        },
      },
    ]);
    res.send(user[0]);
  } catch (error) {
    console.log(error);
    res.send({ msg: "Error fetching user profile" });
  }
};

// Add a new cardio exercise entry
const userCardioPost = async (req, res) => {
  const { email } = req.body;
  const date = new Date();
  const isoDate = date.toISOString();
  req.body.date = isoDate;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    const item = req.body;
    user.cardio.push(item);

    await user.save();

    res.send({ msg: "Cardio exercise added to the menu" });
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "Cardio exercise not added" });
  }
};

// Add a new strength exercise entry
const userStrengthPost = async (req, res) => {
  const { email } = req.body;
  const date = new Date();
  const isoDate = date.toISOString();
  req.body.date = isoDate;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    const item = req.body;
    user.strength.push(item);

    await user.save();

    res.send({ msg: "Strength exercise added to the menu" });
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "Strength exercise not added" });
  }
};

// Get cardio exercises for the user based on date
const userCardioGet = async (req, res) => {
  const { email } = req.body;
  const desiredDate = new Date(req.query.date);
  try {
    const user = await userModel.aggregate([
      { $match: { email } },
      {
        $project: {
          email: 1,
          cardio: {
            $filter: {
              input: "$cardio",
              as: "cardio",
              cond: {
                $eq: [
                  {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$$cardio.date",
                    },
                  },
                  { $dateToString: { format: "%Y-%m-%d", date: desiredDate } },
                ],
              },
            },
          },
        },
      },
    ]);

    if (user.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user[0].cardio);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Cardio exercise not retrieved" });
  }
};

// Get strength exercises for the user based on date
const userStrengthGet = async (req, res) => {
  const { email } = req.body;
  const desiredDate = new Date(req.query.date);
  try {
    const user = await userModel.aggregate([
      { $match: { email } },
      {
        $project: {
          email: 1,
          strength: {
            $filter: {
              input: "$strength",
              as: "strength",
              cond: {
                $eq: [
                  {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$$strength.date",
                    },
                  },
                  { $dateToString: { format: "%Y-%m-%d", date: desiredDate } },
                ],
              },
            },
          },
        },
      },
    ]);

    if (user.length === 0) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user[0].strength);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Strength exercise not retrieved" });
  }
};

// Delete a cardio exercise entry by ID
const userCardioDelete = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }
    const item = user.cardio.id(id);
    if (!item) {
      return res.status(404).send("Exercise not found");
    }
    user.cardio = user.cardio.filter((item) => item.id !== id);

    await user.save();
    res.send({ msg: "Cardio exercise deleted" });
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "Cardio exercise not deleted" });
  }
};

// Delete a strength exercise entry by ID
const userStrengthDelete = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }
    const item = user.strength.id(id);
    if (!item) {
      return res.status(404).send("Exercise not found");
    }
    user.strength = user.strength.filter((item) => item.id !== id);

    await user.save();
    res.send({ msg: "Strength exercise deleted" });
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "Strength exercise not deleted" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  userImagePost,
  userProfile,
  userCardioPost,
  userCardioGet,
  userStrengthPost,
  userStrengthGet,
  userCardioDelete,
  userStrengthDelete,
};
