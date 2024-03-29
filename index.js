const express = require('express');
const app = express();
require('./db/conn')
require('dotenv').config();
const dataRouter = require('./routes/foodData')
const userRouter = require('./routes/user')
const orderRouter = require('./routes/order')
const cors = require('cors')
const port = 5000;
app.use(cors())
app.use(express.json())

app.use('/', dataRouter);
app.use('/', userRouter);
app.use('/', orderRouter);
app.listen(port , ()=>{
    console.log(`Server run at http://localhost:${port}`);
})
