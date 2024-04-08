const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./src/routes/userRoutes');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();

//settings
app.use(express.json());
app.use(cookieParser());


//midelewares
app.use(morgan('dev'));


//routes

app.use('/api/user', userRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
});
