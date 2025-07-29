const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/users', require('./routes/usersRoute'));


app.get('/', (req, res) => {
    res.send('<div align="center"><h1>Hey Hero 😎 !  <br/> Welcome to APIs Store</h1> <br/><br/> <a href="https://apis-store.web.app/">Go to APIs Store</a></div>');
});


//Connection with DB
const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qzgcd.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then((res) => {
        console.log("Connected with MongoDB ");
    })
    .catch((err) => {
        console.log("Error in with MongoDB ", err);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App sterted at: http://localhost:5000/`);
});