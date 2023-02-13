const errorHandler = (error,req,res,next)=> {
  res.status(500).json({
    message: error.message,
    stack: error.stack
  });
}
const boomErrorHandler = (error,req,res,next)=> {
  if(error.isBoom){
    const {output} = error;
    res.status(output.statusCode).json(output.payload)
  }
  next(error);
}

module.exports = {errorHandler,boomErrorHandler};
