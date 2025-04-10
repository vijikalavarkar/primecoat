require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router/auth-router');
const connectDB = require('./utilities/db')


app.use(express.json())
app.use('/api/auth', router);

const PORT = process.env.HOST_PORT;


connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on por ${PORT}`);
    })
})
