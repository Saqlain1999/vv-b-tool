const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')


//.env file
require('dotenv').config()


//import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')


//app
const app = express()


// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("Database Connected"))


// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(expressValidator());


// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);


const port = process.env.PORT || 9999


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});