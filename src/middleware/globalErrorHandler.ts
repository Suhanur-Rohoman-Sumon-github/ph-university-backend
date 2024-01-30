/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import status from 'http-status'
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const handleGlobalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
 const statusCode = err.statusCode || 500
  return res.status(statusCode).json({
    success: false,
    massage: err.message,
    error: err,
  })
}

export default handleGlobalError
