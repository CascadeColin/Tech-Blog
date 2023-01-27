const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

(async () => {
  await sequelize.sync({ force: true });
  process.exit(0);
})();

