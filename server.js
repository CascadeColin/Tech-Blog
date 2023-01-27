require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");

const Store = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const cookie = {
  secret: process.env.SECRET,
  cookie: {
    // set session to expire if idle for 10 minutes
    maxAge: 1000*60*10,
  },
  resave: false,
  saveUninitialized: true,
  store: new Store({
    db: sequelize,
  }),
};

app.use(session(cookie));

// unsure what this does, investigate if there is weird bugs

// create custom hbs engine and set it as default
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// middleware for handling json data, urlencoding, setting default filepath to 'public' for static pages, and using custom API 'routes'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

//sync database, then tell server to run at Heroku port OR localhost and console.log port number
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at port ${PORT}!`));
});
