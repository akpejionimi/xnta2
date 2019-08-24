require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const path = require("path");

const db = require("./config/database");

const app = express();
app.use(cors());
app.use(express.json());

//import Routes
const operatorRoutes = require('./routes/api/operator');
const loginRoutes = require('./routes/api/auth');
const staffRoutes = require('./routes/api/staff');
const customerRoutes = require('./routes/api/customer');
const savingsProductRoutes = require('./routes/api/savingsProduct');
const prodSubRoutes = require('./routes/api/prodSub');

//Routes
app.use("/api/operator", operatorRoutes);
app.use("/api/login", loginRoutes)
app.use("/api/staff", staffRoutes)
app.use('/api/customer', customerRoutes)
app.use('/api/savings-product', savingsProductRoutes)
app.use('/api/subs', prodSubRoutes)

// PORT
const PORT = process.env.PORT || 5000;

db.sync({
    force: false,
}).then(results =>{
        app.listen(PORT, ()=> {
            console.log(`Listening on port ${PORT}`);
        })
    }).catch (err => console.log(err));
