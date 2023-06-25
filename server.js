const express = require('express');
const exphbs = require('express-handlebars');

const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./db/config');
const routes = require('./controllers');

const PORT = process.env.PORT || 3001;

const app = express();
const hbs = exphbs.create();

// Register helper function to format date as "MM/DD/YYYY"
hbs.handlebars.registerHelper('formatDate', (date) => {
  return new Date(date).toLocaleDateString();
});

// Helper method to compare the ids
hbs.handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sessionConfig));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

const force = process.env.FORCE_SYNC === 'true';

sequelize.sync({ force }).then(() => {
  app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
  });
});
