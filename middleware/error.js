
const errorHandlingMiddleware = (err,req,res,next)=>{
  console.log(err)

    return res.status(500).json({msg:'Soemthing went wrong in the server'})
}

module.exports = errorHandlingMiddleware