const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
app.use(cors());

app.get('/', function (req, res) {
    console.log('request incoming')
    res.json('hello world')
})

app.listen(1987, (err) => {
    if(err) {
        return err
    } else {
        console.log(`Server is listening on PORT 1987`);
    }
})