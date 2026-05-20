const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const auth = require("./middleware/authMiddleware");
const authorize = require("./middleware/roleMiddleware");
const projectRoutes = require("./routes/projectRoutes");
const Project = require("./models/Project");
const Task = require("./models/Task");
require("./models/associations");
const taskRoutes = require("./routes/taskRoutes");
const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/",(req,res)=>{
    res.send("API Running");
});

app.get("/api/admin",auth,authorize(["Admin"]),(req,res)=>{
res.json({
message:"Welcome Admin"});
});

console.log("SERVER STARTING...");
console.log("PORT:", process.env.PORT);
console.log("DB_HOST:", process.env.DB_HOST);

const PORT = process.env.PORT || 5000;

sequelize.sync()
.then(()=>{
    console.log("Database Connected");

    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    });

})
.catch((error)=>{
    console.log(error);
});