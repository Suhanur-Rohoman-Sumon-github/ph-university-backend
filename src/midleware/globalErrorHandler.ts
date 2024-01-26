import { NextFunction, Request, Response } from "express"
import status from 'http-status';
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const handleGlobalError =((err:any,req:Request,res:Response,next:NextFunction)=>{
    const massage = err.massage || "something is brocken"
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      success:false,
      massage,
      error:err
    })
  })

  export default handleGlobalError