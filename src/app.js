const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

app.set('views',path.join(__dirname,'Views'));
app.engine('ejs',engine);
app.set('view engine','ejs');
app.use('/Public',express.static(path.join(__dirname,'Public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false }));
app.use(session({
    secret: "Api_Asistencias",
    resave: true,
    saveUninitialized: false
}));

app.use('/', require('./Routes/Home'));

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', function(){
    console.log("Server ON: " + port);
});