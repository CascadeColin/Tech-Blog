const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const loggedIn = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const userData = await Blog.findAll({
            order: [['id', 'ASC']],
        });
        const blogs = userData.map((project) => project.get({ plain: true }));
        res.render('login', {
            blogs,
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
