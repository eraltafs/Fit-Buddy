const { Router } = require("express");
const { userModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authentication } = require("../middleware/authenticate");
const userRouter = Router();

userRouter.get("/", async (req, res) => {
  res.send(await userModel.find());
});

userRouter.post("/register", async (req, res) => {
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
  const user = await userModel.findOne({ email });
  if (user?.email) {
    return res.send({ msg: "user exists please login" });
  } else {
    try {
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
          return res.send({ msg: "user created" });
        } else {
          console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "server error" });
    }
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  try {
    if (user?.email) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          const token = jwt.sign(
            { email: user.email },
            process.env.jwtsec
          );
          return res.send({ msg: "login success", token });
        } else {
          console.log(err);
          return res.status(404).send({ msg: "user not found" });
        }
      });
    } else {
      return res.status(404).send({ msg: "user not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "server error" });
  }
});
userRouter.use(authentication);

userRouter.get("/pro", async (req, res) => {
  const { email } = req.body;
  try {
    let user = await userModel.aggregate([
      { $match: { email } },
      {
        $project: {
          email: 1,
          excercises: 1,
        },
      },
    ]);
    res.send(user[0]);
  } catch (error) {
    console.log(error);
    res.send({ msg: "error" });
  }
});
userRouter.post("/excercise", async (req, res) => {
  const {email} = req.body;
  const date = new Date();
  const isoDate = date.toISOString();
  req.body.date = isoDate;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ msg: "user not found" });
    }

    const item = req.body;
    user.excercises.push(item);

    await user.save();

    res.send({ msg: "item added to menu" });
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "item not added" });
  }
});
userRouter.get("/excercise", async (req, res) => {
  const { email } = req.body;
  const desiredDate = new Date(req.query.date);
  try {
    const user = await userModel.aggregate([
      { $match: { email } },
      {
        $project: {
          email: 1,
          excercises: {
            $filter: {
              input: "$excercises",
              as: "exercise",
              cond: {
                $eq: [
                  {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$$exercise.date",
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
    res.send(user[0].excercises);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "item not added" });
  }
});
userRouter.delete("/excercise/:id", async (req, res) => {
  const {email} = req.body;
  const {id} = req.params;
  console.log(email,id)
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({msg:"user not found"});
    }
    const item = user.excercises.id(id);
    if (!item) {
      return res.status(404).send("exercise not found");
    }
    user.excercises = user.excercises.filter((item) => item.id !== id);

    await user.save();
    res.send({msg:"item deleted from exercises"});
  } catch (error) {
    console.log(error);
    res.status(404).send({msg:"item not deleted"});
  }
});
module.exports = { userRouter };
