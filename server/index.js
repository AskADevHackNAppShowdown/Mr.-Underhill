const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
app.use(cors());

app.get('/', function (req, res) {
    console.log('request incoming')
    res.json('hello world')
})

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://admin:password1@ds157946.mlab.com:57946/movie-queue", { useNewUrlParser: true });


app.listen(1987, (err) => {
    if(err) {
        return err
    } else {
        console.log(`Server is listening on PORT 1987`);
    }
})