/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import status from 'http-status'
import { ZodError, ZodIssue } from 'zod'
import { TErrorSources } from '../interface/error'
import config from '../config'
import handleZodError from '../errors/handleZodErrors'
import handleValidationError from '../errors/handleValidationsError'
import AppError from '../errors/appError'
import handleDuplicateError from '../errors/handleDuplicateError'
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const handleGlobalError: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'something wend wrong '
  let errorSources: TErrorSources = [
    {
      path: '',
      message: '',
    },
  ]

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof Error) {
    message = err.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  // ultimate return
  return res.status(statusCode).json({
    success: false,
    massage: message,
    errorSource: errorSources,
    // error: err,
    stack: config.node_Env == 'development' ? err.stack : '',
  })
}

export default handleGlobalError
