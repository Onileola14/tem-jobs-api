const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')


const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {

    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, please try again later'

  }
  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors).map((item) => item.message).join(',')
    customError.statusCode = 400
  } else if (err.name === 'CastError') {
    customError.message = `No item found with id : ${err.value}`
    customError.statusCode = 404
  } else if (err.name === 'JsonWebTokenError') {    
    customError.message = 'Authentication Invalid'
    customError.statusCode = 401
  } else if (err.name === 'TokenExpiredError') {
    customError.message = 'Authentication Expired'
    customError.statusCode = 401
  }

  

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  return res.status(customError.statusCode).json({ msg: customError.message })


  //  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware
