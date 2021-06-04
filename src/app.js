const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const io = require('socket.io')(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
});

app.set('views',path.join(__dirname,'views'));
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
server.listen(port, '0.0.0.0', function(){
    console.log("Server ON: " + port);
});