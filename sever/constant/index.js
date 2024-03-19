module.exports = {
  TOKEN_EXPIRATION_TIME: "30s", //30s
  REFRESH_TOKEN_EXPIRATION_TIME: "30d", //30 day
  OTP_EXPIRATION_TIME: Date.now() + 5 * 60 * 1000, //5 minute
  TYPE_LOG_SOCIAL:"SOCIAL",
  TYPE_LOG_LOCAL: "LOCAL",
  ORDER_STATUS_PENDING: 0,
  ORDER_STATUS_PAID: 1,
  ORDER_STATUS_DELIVERED: 2,
  ROLE_DEFAULT : 2 
};
