const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const seedBlogs = require('./blogData.json');
const seedComments = require('./commentData.json');
const seedUsers = require('./userData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  //declared here to maintain function-wide scope
  let newBlog;
  const users = await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });

  for (const {id} of users) {
    newBlog = await Blog.create({
        user_id: id,
    });
  }

  for (const comment of seedComments) {
    const newComment = await Comment.create({
        ...comment,
        // get a random user id and blog id and assign it to each comment
        user_id: users[Math.floor(Math.random() * users.length)].id,
        blog_id: newBlog[Math.floor(Math.random() * users.length)].id
    })
  }
  process.exit(0);
};

seedAll();
