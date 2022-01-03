const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const router = require('./routers/employee');
const users = require('./models/employeeSchema');
const leaveRequests = require('./models/leaveSchema');
const taskSchema = require('./models/taskSchema');
app.use(express.json());
app.use(express.static(
    path.join(__dirname,"../coo-yee/build")));

require('./db/conn');
app.use(router);
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../coo-yee/build","index.html")
    );});
    
app.listen(PORT,()=>{
console.log(`server is running at ${PORT} `);
});