import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { StudentRouter } from './app/moules/students/student.route'
import { UserRouter } from './app/moules/users/user.route'

// parser
app.use(express.json())
app.use(cors())

// Application routers
app.use('/api/v1/students', StudentRouter)
app.use('/api/v1/users', UserRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('ph is building')
})

export default app
