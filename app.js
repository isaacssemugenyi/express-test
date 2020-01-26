let express = require('express')
let logger = require('morgan')
let mongoose = require('mongoose')
let cookieParser = require('cookie-parser')
let path = require('path')
let app = express()
let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')
let catalogRouter = require('./routes/catalog') 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//setting the view engine
app.set('views', path.join(__dirname, 'views'))
//set the view engine to use
app.set('view engine', 'ejs')

//require routes
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/catalog', catalogRouter)


let url = 'mongodb://localhost:27017/trial'
mongoose.connect(url, { useNewUrlParser: true,  useUnifiedTopology: true})
.then(('open',()=>console.log('connected')))
.catch(('err', ()=> console.error(err)))

let db = mongoose.connection

//create a schema
let trialSchema = new mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true},
	createdAt: Date
})

let User = mongoose.model('User', trialSchema)
//routes
app.use('/wiki', wiki)

app.get('/', (req, res)=>{
	res.render('index', {title: 'welcome to testing', message: 'About home things'});
})
//handling errors
app.use((err, req, res, next)=>{
	console.log(err.stack);
	res.status(500).send('something broke!');
})

let port = process.env.PORT || 3000
app.listen(port, ()=> console.log('connected to port', +port))