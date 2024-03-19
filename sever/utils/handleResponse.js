class handleResponse {
  sendError = (res, status = 500, message = "Something went wrong") => {
    return res.status(status).json({
      status,
      message,
    });
  };
  sendSuccess = (res,message ="Success",data=null) => {
    return res.status(200).json({
      status: 200,
      message,
      data,
    });
  };
  createResponse = (status, message, data = null) => {
    return {
      status,
      message,
      data,
    };
  };
}
module.exports = new handleResponse();
