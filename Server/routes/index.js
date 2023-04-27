const router = require('express').Router()
const Controller = require('../controllers');
const errorHandler = require('../middleware/errorHandler')
const authentication = require('../middleware/authentication')


router.post('/register', Controller.registerNewUser)
router.post('/login', Controller.loginUser)
router.post('/login-with-google', Controller.googleLoginUser)
router.get('/get-all-companies-in-indonesia', authentication, Controller.getAllCompaniesInIndonesia)
router.get('/get-us-stocks-news', authentication, Controller.getUSCompanyNews)
router.get('/get-id-business-news', authentication, Controller.getIDBusinessNews)

router.use(errorHandler)
module.exports = router;