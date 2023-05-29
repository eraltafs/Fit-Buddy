const mongoose = require("mongoose")
const exerciseSchema = mongoose.Schema({
    title:{ type: String, required: true }
})
const exerciseModel = mongoose.model("exercise",exerciseSchema)

module.exports = {exerciseModel}