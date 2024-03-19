const products = require('./products')
const user = require('./user')
const order = require('./order')
// const comment = require('./')
const authSocial= require('./authSocial')
function routes(app){
    app.use('/api/v1/product',products)
    app.use('/api/v1/comment',products)
    app.use('/api/v1/user',user)
    app.use('/api/v1/order',order)
    app.use('/api/v1/social',authSocial)
}
module.exports = routes