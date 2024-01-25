import { Request, Response } from 'express'
import { StudentServices } from './student.servises'

const getAllstudents = async (req: Request, res: Response) => {
  try {
    const results = await StudentServices.getAllUserDB()
    res.status(200).json({
      susses: true,
      massage: 'student are retrieve successfully',
      data: results,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: error,
    })
  }
}

const singleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const results = await StudentServices.getSingleDatafromDB(id)
    res.status(200).json({
      success: true,
      massage: 'single user find successfully',
      data: results,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: error,
    })
  }
}
const deleteStudentFromDb = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const results = await StudentServices.deleteStudentDb(id)
    res.status(200).json({
      success: true,
      massage: 'student data deleted successfully',
      data: results,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: error,
    })
  }
}

export const StudentControllers = {
  getAllstudents,
  singleUser,
  deleteStudentFromDb,
}
