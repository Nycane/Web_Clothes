const constant = require("../constant");
const handleResponse = require("../utils/handleResponse");
const utils = require("../utils/myUtils");
const pool = require("../db");
require("dotenv").config();
class orderService {
  async addOrder(product, info) {
    try {
      // add order to db
      const order = await this.insertOrder(
        info.userId,
        product.total,
        product.isCoupoun,
        product.totalDiscount,
        constant.ORDER_STATUS_PENDING,
        info.payment,
        info.shipping
      );

      // get orderId just add
      const orderId = order.insertId;

      // add delivery address
      await this.insertDeliveryAddress(
        orderId,
        info.fullname,
        info.address,
        info.email,
        info.phone,
        info.notes
      );
      // add order detail
      await this.insertOderDetail(product, orderId);
      // update quantity of product
      await this.updateQuantity(product.listProducts);
      return handleResponse.createResponse(200, "Payment Success", { orderId });
    } catch (error) {
      throw error;
    }
  }
  //Get order detail
  async getOrderDetailById(orderId, userId) {
    try {
      const order = await this.selectOrderDetail(orderId, userId);
      const data = {
        orderDetail: order.orderDetail[0],
        productDetail: order.productDetail,
      };
      return handleResponse.createResponse(200, "Success", data);
    } catch (error) {
      throw error;
    }
  }
  async getOders(userId) {
    try {
      const orders = await this.selectOrders(userId);
      return handleResponse.createResponse(200, "Success", orders);
    } catch (error) {
      throw error;
    }
  }
  // -------------------------VNPAY--------------------
  // CREATE ORDER vnPAy
  async createOrder(req, res) {
    try {
      const product = req.body.product;
      const {
        userId,
        payment,
        shipping,
        fullname,
        address,
        email,
        phone,
        notes,
      } = req.body.info;

      //add db order
      const order = await this.insertOrder(
        userId,
        product.total,
        product.isCoupoun,
        product.totalDiscount,
        constant.ORDER_STATUS_PENDING,
        payment,
        shipping
      );

      //get orderId just add
      const orderId = order.insertId;

      // add  db delivery address
      await this.insertDeliveryAddress(
        orderId,
        fullname,
        address,
        email,
        phone,
        notes
      );
      // add  db order detail
      await this.insertOderDetail(product, orderId);
      //  add info and product
      process.env.TZ = "Asia/Ho_Chi_Minh";
      var ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
      // var dateFormat = require("dateformat");
      var tmnCode = process.env.VNP_TMNCODE;
      var secretKey = process.env.VNP_HASHSECRET;
      var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
      var returnUrl = process.env.VNP_RETURNURL;
      // create date
      var date = new Date();
      const moment = require("moment");
      var createDate = moment(date).format("YYYYMMDDHHmmss");
      // var orderId = moment(date).format("DDHHmmss");

      var amount =
        product.totalDiscount > 0 ? product.totalDiscount : product.total;
      var bankCode = req.body.bankCode;
      var locale = req.body.language;

      if (locale === null || locale === "") {
        locale = "vn";
      }
      var currCode = "VND";
      var vnp_Params = {};
      vnp_Params["vnp_Version"] = "2.1.0";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_TmnCode"] = tmnCode;
      vnp_Params["vnp_Locale"] = locale;
      vnp_Params["vnp_CurrCode"] = currCode;
      vnp_Params["vnp_TxnRef"] = orderId;
      vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
      vnp_Params["vnp_OrderType"] = "other";
      vnp_Params["vnp_Amount"] = amount * 100;
      vnp_Params["vnp_ReturnUrl"] = returnUrl;
      vnp_Params["vnp_IpAddr"] = ipAddr;
      vnp_Params["vnp_CreateDate"] = createDate;
      if (bankCode !== null && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode;
      }
      vnp_Params = this.sortObject(vnp_Params);
      var querystring = require("qs");
      var signData = querystring.stringify(vnp_Params, { encode: false });
      var crypto = require("crypto");

      var hmac = crypto.createHmac("sha512", secretKey);
      var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
      // console.log("VNp url",vnpUrl);
      // res.status(200).json({ message: "Success", data: vnpUrl });
      return handleResponse.createResponse(200, "Success", { vnpUrl });
    } catch (error) {
      throw error;
    }
  }

  async vnpIpn(req) {
    try {
      var vnp_Params = req.query;
      var secureHash = vnp_Params["vnp_SecureHash"];
      let orderId = vnp_Params["vnp_TxnRef"];
      let rspCode = vnp_Params["vnp_ResponseCode"];
      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];
      vnp_Params = this.sortObject(vnp_Params);
      var secretKey = process.env.VNP_HASHSECRET;
      var querystring = require("qs");
      var signData = querystring.stringify(vnp_Params, { encode: false });
      var crypto = require("crypto");
      var hmac = crypto.createHmac("sha512", secretKey);
      var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
      let paymentStatus = "0"; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
      //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
      //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó
      let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
      let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
      if (secureHash === signed) {
        //kiểm tra checksum
        if (checkOrderId) {
          if (checkAmount) {
            if (paymentStatus == "0") {
              //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
              if (rspCode == "00") {
                //thanh cong
                //paymentStatus = '1'
                // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                //  res.status(200).json({ rspCode, Message: "Success" });
                const order = await this.selectOrderDetailById(orderId);
                // if (order.orderDetail[0].status == 0) {
                //   await this.updateQuantity(order.productDetail);
                //   const data = {
                //     orderDetail: order.orderDetail[0],
                //     productDetail: order.productDetail,
                //   };
                //   // update order status has paid
                //   await this.updateOrderStatus(orderId,constant.ORDER_STATUS_PAID)
                // }
                return handleResponse.createResponse(200, "Success", {
                  rspCode,
                  ...data,
                });
              } else {
                //that bai
                //paymentStatus = '2'
                // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                await this.deleteOrder(orderId);
                //  res.status(200).json({ rspCode, Message: "Failed" });
                return handleResponse.createResponse(200, "Failed", {
                  rspCode,
                });
              }
            } else {
              return handleResponse.createResponse(
                200,
                "This order has been updated to the payment status",
                { RspCode: "02" }
              );
            }
          } else {
            return handleResponse.createResponse(200, "Amount invalid", {
              RspCode: "04",
            });
          }
        } else {
          await this.deleteOrder(orderId);
          return handleResponse.createResponse(200, "Order not found", {
            RspCode: "24",
          });
        }
      } else {
        return handleResponse.createResponse(200, "Checksum failed", {
          RspCode: "97",
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async vnpReturn(req) {
    try {
      var vnp_Params = req.query;
      var secureHash = vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];
      vnp_Params = this.sortObject(vnp_Params);
      var tmnCode = process.env.VNP_TMNCODE;
      var secretKey = process.env.VNP_HASHSECRET;
      var querystring = require("qs");
      var signData = querystring.stringify(vnp_Params, { encode: false });
      var crypto = require("crypto");
      var hmac = crypto.createHmac("sha512", secretKey);
      var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
      if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket
        return handleResponse.createResponse(200, "Success", {
          code: vnp_Params["vnp_ResponseCode"],
        });
      } else {
        return handleResponse.createResponse(500, "Failed", { code: 97 });
      }
    } catch (error) {
      throw error;
    }
  }

  //-------------------------------------------------------EXECUTE-------------------------------------------------------------------------
  //VNPAY
  sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }
  // DELETE ORDER
  async deleteOrder(orderId) {
    await pool.query(
      "DELETE orders, delivery_address, order_details FROM orders JOIN order_details ON orders.id = order_details.order_id JOIN delivery_address ON orders.id = delivery_address.order_id WHERE orders.id = ?",
      [orderId]
    );
  }
  // GET ORDERS
  async selectOrders(userId) {
    const [orders] = await pool.query(
      "SELECT count(order_details.order_id) as countOrder,orders.created_at,orders.id,orders.total_price,orders.discount_amount,orders.status from orders,users,order_details where users.id=orders.user_id and orders.id = order_details.order_id and orders.user_id = ? GROUP by orders.id order by orders.id asc",
      [userId]
    );
    return orders;
  }
  // SELECT ORDER DETAIL
  async selectOrderDetail(orderId, userId) {
    const [orderDetail] = await pool.query(
      " SELECT orders.id,orders.total_price,orders.discount_amount,orders.coupon_code,orders.created_at,orders.payment_method,orders.shipping,delivery_address.fullname,delivery_address.address,delivery_address.email,delivery_address.phone,delivery_address.notes FROM delivery_address,orders WHERE orders.id= delivery_address.order_id and orders.id = ? and orders.user_id = ?  order by orders.id",
      [orderId, userId]
    );
    let productDetail = [];
    if (!utils.arrayIsEmpty(orderDetail)) {
      [productDetail] = await pool.query(
        " SELECT products.name,order_details.quantity,order_details.total,order_details.color,order_details.size from products,order_details,orders WHERE order_details.order_id=orders.id and order_details.product_id=products.id and orders.id = ?",
        [orderId]
      );
    }
    return { orderDetail, productDetail };
  }
  
  // SELECT ORDER DETAIL BY ID, USE FOR VNPAY
  async selectOrderDetailById(orderId) {
    const [orderDetail] = await pool.query(
      "SELECT orders.id,orders.total_price,orders.discount_amount,orders.coupon_code,orders.created_at,orders.payment_method,orders.shipping,orders.status,delivery_address.fullname,delivery_address.address,delivery_address.email,delivery_address.phone,delivery_address.notes FROM delivery_address,orders WHERE orders.id= delivery_address.order_id and orders.id = ? order by orders.id",
      [orderId]
    );
    let productDetail = [];
    if (!utils.arrayIsEmpty(orderDetail)) {
      [productDetail] = await pool.query(
        " SELECT products.id,products.name,order_details.quantity,order_details.total,order_details.color,order_details.size from products,order_details,orders WHERE order_details.order_id=orders.id and order_details.product_id=products.id and orders.id = ?",
        [orderId]
      );
    }
    return { orderDetail, productDetail };
  }
  // INSERT ORDER DETAIL
  async insertOderDetail(product, orderId) {
    for (const e of product.listProducts) {
      await pool.query(
        "insert into order_details(order_id,product_id,color,size,quantity,price,total) values (?,?,?,?,?,?,?)",
        [
          orderId,
          e.id,
          e.color ? e.color : "default",
          e.size ? e.size : "default",
          e.quantity,
          e.price_discount > 0 ? e.price_discount : e.price,
          e.quantity * (e.price_discount > 0 ? e.price_discount : e.price),
        ]
      );
    }
  }
  // INSERT DELIVERY ADDRESS
  async insertDeliveryAddress(orderId, fullname, address, email, phone, notes) {
    await pool.query(
      "insert into delivery_address(order_id,fullname,address,email,phone,notes) value(?,?,?,?,?,?)",
      [orderId, fullname, address, email, phone, notes]
    );
  }
  // INSERT ORDER
  async insertOrder(
    userId,
    total,
    isCoupoun,
    totalDiscount,
    orderStatus,
    payment,
    shipping
  ) {
    const [order] = await pool.query(
      "insert into orders(user_id,total_price,coupon_code,discount_amount,status,payment_method,shipping) values (?,?,?,?,?,?,?)",
      [userId, total, isCoupoun, totalDiscount, orderStatus, payment, shipping]
    );
    return order;
  }
  // UPDATE STATUS ORDER
  async updateOrderStatus(id, status) {
    // update status has paid
    await pool.query("update orders set status = ? where id = ?", [status, id]);
  }
  // UPDATE PRODUCT QUANTITY
  async updateQuantity(product) {
    Promise.all(
      product.map(async (e) => {
        const [quantityCurrent] = await pool.query(
          "select cs.quantity from product_color_size as cs,color,size where color.id = cs.color_id and size.id = cs.size_id and product_id = ? and color.name = ? and size.name = ?",
          [e.id, e.color, e.size]
        );
        if (quantityCurrent[0].quantity > 0) {
          await pool.query(
            "update product_color_size as cs,color,size set cs.quantity = ? where cs.color_id = color.id and cs.size_id = size.id and cs.product_id = ? and color.name = ? and size.name = ?",
            [quantityCurrent[0].quantity - e.quantity, e.id, e.color, e.size]
          );
        }
      })
    );
  }
}

module.exports = new orderService();
