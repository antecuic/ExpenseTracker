const express = require('express')
const userController = require('../controllers/user-controller')
const { check } = require('express-validator')
const verifyToken = require('../token')
const router = express.Router()

router.get('/userData/:uid', verifyToken, userController.getUser)

router.post('/signup', [

    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min: 6})

],userController.signUp)

router.post('/login', userController.login)
router.get('/getBudget/:uid', verifyToken, userController.getBudget)

router.patch('/add', verifyToken, [

    check('description').isLength({ min: 6 }),
    check('value').isNumeric()

], userController.add)

router.post('/changeDescription', verifyToken, [

    check('description').isLength({ min: 6 }),

], userController.changeDescription)

router.delete('/delete/:id', verifyToken, userController.delete)

router.get('/getItems/:uid', verifyToken, userController.getItems)
router.get('/getSingleItem/:id', verifyToken, userController.getSingleItem)

module.exports = router;