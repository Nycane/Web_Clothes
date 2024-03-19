const orderService = require("../service/orderService");
const handleResponse = require("../utils/handleResponse");
class orderController {
  constructor() {
    // this.vnp_create = this.vnp_create.bind(this);
    // this.vnp_ipn = this.vnp_ipn.bind(this);
    // this.vnp_return = this.vnp_return.bind(this);
  }

  // Add Order
  async addOrder(req, res) {
    try {
      const { product, info } = req.body;
      const result = await orderService.addOrder(product, info);
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  // Get Order Detail By Id
  async getOrderDetailById(req, res) {
    try {
      const id = req.params.id;
      const userId = req.query.userId
      const result = await orderService.getOrderDetailById(id,userId);
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  // Get Orders
  async getOrders(req, res) {
    try {
      const userId = req.params.id;
      const result = await orderService.getOders(userId);
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      return handleResponse.sendError(res);
    }
  }

  // VNPAY----------------------------------------//
  async vnp_create(req, res) {
    try {
      const result = await orderService.createOrder(req);
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  async vnp_ipn(req, res) {
    try {
      const result = await orderService.vnpIpn(req);
      return handleResponse.sendSuccess(res,result.message,result.data)
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  async vnp_return(req, res) {
    try {
      const result = await orderService.vnpReturn(req);
      if (result.status !== 200) return handleResponse.sendError(res, result.status.result.message);
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  // VNPAY----------------------------------------//
}

module.exports = new orderController();
