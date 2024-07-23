require('dotenv').config();

const notFound = (req,res,next) =>{
  const error = new Error(`Not found: ${req.originalUrl}`);
  res.sendStatus(404);
  next(error);
}

const errorHandler = (err,req,res,next) =>{
  let statusCode = res.statusCode === 200 ? 500: res.statusCode;
  let message = err.message;

  if(err.message === 'CastError' && err.kind === 'ObjectId'){
    statusCode = 404;
    message = 'Resource not found'
  }
  res.status(statusCode).json({
    message,
    stack:process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

module.exports = { notFound, errorHandler }