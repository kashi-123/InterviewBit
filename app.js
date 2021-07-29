const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const scheduleRoute = require('./routes/schedule');
// const infoRoute = require('./routes/schedule');
// const shopRoute = require ('./routes/shop');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false }));
app.use(express.static(path.join(__dirname,'public')));

app.use('/', scheduleRoute );
// app.use( shopRoute);

app.listen(3000);