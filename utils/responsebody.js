/**
 * This object will be used as a template for building success response
 */
successResponseBody = {
  err : {},
  data : {},
  message :  "Successfully processed the request",
  success : true
}

/**
 * This object will be used as a template for building error response
 */
errorResponseBody = {
  err : {},
  data : {},
  message :  "Something went wrong",
  success : false
}

module.exports = {
  successResponseBody,
  errorResponseBody
}