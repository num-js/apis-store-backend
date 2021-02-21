const express = require('express');


const app = express();


app.use('/users', require('./routes/usersRoute'));

app.get('/', (req, res) => {
    res.send('Hello Numan');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App sterted at: http://localhost:5000/`);
});