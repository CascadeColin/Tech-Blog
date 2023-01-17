const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const loggedIn = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const userData = await Comment.findAll({
            attributes: { exclude: ['password'] },
            order: [['id', 'ASC']],
        });
        res.status(200).json(userData);
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