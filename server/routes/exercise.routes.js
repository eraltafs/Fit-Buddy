const { Router } = require("express");
const { exerciseModel } = require("../models/exercise.model");

const exerciseRouter = Router();

exerciseRouter.get("/", async (req, res) => {
    const { title } = req.query;
    const regex = new RegExp(title, 'i');
    
    res.send(await exerciseModel.find({ title: regex }));
});
exerciseRouter.post("/", async (req, res) => {
  const { title } = req.body;
  try {
    const exercise = new exerciseModel({ title });
    await exercise.save();
    res.status(201).send({ msg: "exercise added" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "server error" });
  }
});

module.exports = { exerciseRouter };
