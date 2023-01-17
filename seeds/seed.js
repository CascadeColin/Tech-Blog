const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const seedBlogs = require('./blogData.json');
const seedComments = require('./commentData.json');
const seedUsers = require('./userData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const newUsers = await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of seedBlogs) {
    const newBlogs = await Blog.create({
      ...blog,
      // assigns a random user_id for dynamic seed testing
      user_id: newUsers[Math.floor(Math.random()*newUsers.length)].id,
    });
  }

  for (const comment of seedComments) {
    // set blogNum to the number of blogs you are seeding
    // hard-coded because newBlogs is not available in this scope
    const blogNum = 4;
    const newComments = await Comment.create({
      ...comment,
      // assigns a random user_id for dynamic seed testing
      user_id: newUsers[Math.floor(Math.random()*newUsers.length)].id,
      blog_id: Math.ceil(Math.random()*blogNum),
    })
  }
  process.exit(0);
};

seedAll();
