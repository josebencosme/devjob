const mongoose = require('mongoose');
require('./config/db');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const router = require('./routes');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const { create } = require('domain');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash')
const passport = require('./config/passport')
const { extend } = require('slug');
require('dotenv').config({ path: 'variables.env' });
const app = express();
//hablilitar body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
//validacion de campos
app.use(expressValidator());

//habilitar hanlebars como view
app.engine('handlebars',
  exphbs.engine({
    defaultLayout: 'layout',
    helpers: require('./helpers/handlebars'),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    }
  })
);

app.set('view engine', 'handlebars');
//static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({

  secret: process.env.SECRETO,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
//inicializar passport
app.use(passport.initialize());
app.use(passport.session());
//alertas flash messages
app.use(flash());
// crear nuestro middleware
app.use((req, res, next) => {
  res.locals.messajes = req.flash();
  next();
});

app.use('/', router());
app.listen(process.env.puerto);