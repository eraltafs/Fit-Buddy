const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.routes")
const { exerciseRouter } = require("./routes/exercise.routes")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    
    res.send({msg:"Base Api"})
})
app.use("/user",userRouter)
app.use("/exercise",exerciseRouter)


app.listen(8000,()=>{
    connection()
    console.log("listening on 8000")
})