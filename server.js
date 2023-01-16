const path = require('path');
const express = require('express');
const session = require('express-session');
const template = require('express-handlebars');
require('dotenv').config();
const Store = require('connect-session-sequelize')(session.Store);

const routes = require('./controller');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const cookie = {
    secret: process.env.SESSION_COOKIE_SECRET,
    cookie: {
        // set session to expire if idle for 10 minutes (600000 millisecs)
        maxAge: 600000,
    },
    resave: false,
    saveUninitialized: true,
    store: new Store({
        db: sequelize,
    }),
};

app.use(session(cookie));

// unsure what this does, investigate if there is weird bugs
const hbs = exphbs.create({helpers});
// create custom hbs engine and set it as default
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware for handling json data, urlencoding, setting default filepath to 'public' for static pages, and using custom API 'routes'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

//sync database, then tell server to run at Heroku port OR localhost and console.log port number
sequelize.sync({force:false}).then(() => app.listen(PORT, () => console.log(`Now listening at port ${PORT}!`)));

