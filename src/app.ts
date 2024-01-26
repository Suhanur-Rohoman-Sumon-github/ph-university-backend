import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { StudentRouter } from './app/moules/students/student.route'
import { UserRouter } from './app/moules/users/user.route'
import notFoundRoute from './midleware/notFoundRoute'
import handleGlobalError from './midleware/globalErrorHandler'
import router from './routes/route'

// parser
app.use(express.json())
app.use(cors())

// Application routers
app.use('/api/v1', router)


// initial get request
app.get('/', (req: Request, res: Response) => {
  res.send('ph is building')
})

// handle error 
app.use(handleGlobalError)

// handle 404 route
app.use(notFoundRoute)

export default app
