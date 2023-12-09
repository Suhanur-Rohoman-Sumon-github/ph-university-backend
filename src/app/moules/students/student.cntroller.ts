import { Request, Response } from 'express'
import { StudentServices } from './student.servises'

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student

    const results = await StudentServices.creatStudentIntoDB(student)

    res.status(200).json({
      sucsees: true,
      massage: 'student is created sucssesfully',
      data: results,
    })
  } catch (error) {
    console.log(error)
  }
}

const getAllstudents = async (req: Request, res: Response) => {
  try {
    const results = await StudentServices.getAllUserDB()
    res.status(200).json({
      sucsees: true,
      massage: 'student are retreve sucssesfully',
      data: results,
    })
  } catch (error) {
    console.error(error)
  }
}

const singleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const results = await StudentServices.getSingleDatafromDB(id)
    res.status(200).json({
      sucsees: true,
      massage: 'single user find ssucssesfully',
      data: results,
    })
  } catch (error) {
    console.error(error)
  }
}

export const StudentControllers = {
  createStudent,
  getAllstudents,
  singleUser,
}
