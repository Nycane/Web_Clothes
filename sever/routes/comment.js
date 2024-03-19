const router = require('express').Router();
const commentController = require('../controllers/commentController')
const auth = require('../middleware/authToken')

router.post('/comment',auth.verifyToken,commentController.createCommentUser)
router.get('/comment/:id',commentController.getCommentUser)
router.delete('/comment/delete/:id',auth.verifyToken,commentController.deleteCommentUser)



module.exports = router