const router = require('express').Router();
const { body } = require('express-validator');

const controllers = require('./controllers/controllers.js');

router.get('/', controllers.hello);
router.post(
  '/createUser',
  [
    body('username').isLength({ min: 3, max: 15 }),
    body('password').isLength({ min: 8 }),
    body('email').isEmail(),
    body('firstName').isLength({ min: 1 }).notEmpty(),
    body('lastName').isLength({ min: 1 }).notEmpty(),
  ],
  controllers.createUser
);

module.exports = router;
