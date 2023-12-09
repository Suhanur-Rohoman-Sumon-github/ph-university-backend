import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { StudentRouter } from './app/moules/students/student.route'

// parser
app.use(express.json())
app.use(cors())

// Aplication routers
app.use('/api/v1/students', StudentRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('vao ki obostha tumar')
})

export default app
