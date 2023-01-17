const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const loggedIn = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            // attributes: { exclude: ['password'] },
            order: [['id', 'ASC']],
        });
        const users = userData.map((project) => project.get({ plain: true }));
        res.render('homepage', {
            users,
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

// router.get('/login', (req, res) => {
//     if (req.session.logged_in) {
//         res.redirect('/');
//         return;
//     }
//     res.render('login');
// })