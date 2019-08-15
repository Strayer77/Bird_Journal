var express  = require('express');
var app      = express();                               
var morgan = require('morgan');            
var bodyParser = require('body-parser');    
var cors = require('cors');
const mongoose = require('mongoose')
 
app.use(morgan('dev'));                                        
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(cors());

//database connection through mongoose - DATABASE URL is set within env file to protect url
//and allows us to pull database url from wherever it is deployed later
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
//variable for our db connection
const db = mongoose.connection

db.on('error', (error) => console.error(error))      //tells us if theres an error connecting to db
db.once('open', (error) => console.log('Connected to Database'))    // tells us that we've connected to db on startup

 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, DELETE, POST, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//where are routes will be located - inside routes folder in flies.js file
const fliesRouter = require('./routes/flies.js') 
app.use('/Flies', fliesRouter)  //tells app to use the fliesRouter whenever we query
//'localhost:8080/flies/blahblah'
 
app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});