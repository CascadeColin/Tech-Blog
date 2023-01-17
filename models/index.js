const Comment = require('./Comment');
const Blog = require('./Blog');
const User = require('./User');

// user hasMany blogs, blogs have 1 user
User.hasMany(Blog, {
    foreignKey: 'user_id',
});

Blog.belongsTo(User, {
    foreignKey: 'user_id',
});

// blogs hasMany comments, comments have 1 blog
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
});

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
});

// user hasMany comments, comments have 1 user
User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Blog, Comment };