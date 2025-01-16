const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors")
const { default: mongoose } = require("mongoose");
const userRouter = require("./routes/userRoutes");
const verifyToken = require("./middlewares/auth");
const fileRouter = require("./routes/fileRoutes");

dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/user" , userRouter);
app.use("/file" , fileRouter);


app.get("/" , (req , res) => {
    res.send("Hello World!");
});

app.get("/dashboard" , verifyToken, (req , res) => {
    res.send("Welcome to dashboard");
})

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(3000 , () => {
        console.log("Server is running on port 3000");
    })
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})