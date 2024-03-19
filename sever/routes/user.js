const router = require('express').Router();
const userController = require('../controllers/userController')
const auth = require('../middleware/authToken')

router.post('/comment',auth.verifyToken,userController.createCommentUser)
router.post('/changepassword',auth.verifyToken,userController.changePassword)
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/update',auth.verifyToken,userController.updateUser)
router.post('/updateAvatar',auth.verifyToken,userController.updateAvatar)
router.post('/forget-password',userController.forgetPassword)
router.post('/wishList',auth.verifyToken,userController.addWishList)
router.post('/getWishList',auth.verifyToken,userController.getWishList)
router.post('/removeWishList',auth.verifyToken,userController.removeWishList)
router.post('/contact',userController.addContact)
router.post('/forget-password/reset-password',userController.resetPassword)
router.post('/forget-password/verify-otp',userController.verifyOtp)
router.get("/getInfo/:id",auth.verifyToken,userController.getUserInfo)
router.get('/comment/:id',userController.getCommentUser)
router.delete('/logout/:id',userController.logout)
router.delete('/comment/delete/:id',auth.verifyToken,userController.deleteCommentUser)

// REFRESH TOKEN ROUTE
router.post('/refreshtoken',userController.RefreshToken)
module.exports = router