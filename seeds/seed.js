const sequelize = require('../config/connection');
const seedBlogs = require('./blogData.json');
const seedComments = require('./commentData.json');
const seedUsers = require('./userData.json');
const { User, Blog, Comment } = require('../models');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });

  for (const {id} of users) {
    const newBlog = await Blog.create({
        user_id: id,
    });
  }

  for (const comment of seedComments) {
    const newComment = await Comment.create({
        ...comment,
        // get a random user id and assign it to each comment
        user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  }
  process.exit(0);
};

seedAll();
