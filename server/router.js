const router = require('express').Router();
const { body } = require('express-validator');

const controllers = require('./controllers/controllers.js');
const authMiddleware = require('./middlewares/auth.js');

router.get('/', controllers.hello);

router.post(
  '/createUser',
  [
    body('username').isLength({ min: 3, max: 15 }),
    body('password').isLength({ min: 8 }),
    body('email').isEmail(),
    body('firstName').isLength({ min: 1 }),
    body('lastName').isLength({ min: 1 }),
  ],
  controllers.createUser
);

router.post('/login', controllers.login);
router.post('/logout', authMiddleware, controllers.logout);

router.get('/getUser', authMiddleware, controllers.getUser);
router.post('/addFavorite', authMiddleware, controllers.addFavorite);
router.post('/removeFavorite', authMiddleware, controllers.removeFavorite);

module.exports = router;
