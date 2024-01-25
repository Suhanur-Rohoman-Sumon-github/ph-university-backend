import { Request, Response } from 'express'
import { StudentServices } from './student.servises'
import StudentValidationSchema from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.students
    
    const zodParsedData = StudentValidationSchema.parse(student)
    const results = await StudentServices.creatStudentIntoDB(zodParsedData)
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: results,
    });
  } catch (error) {
     
    res.status(500).json({
      success: false,
      message: 'user already exists',
      
    });
  }
}



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
    });
  }
}

const singleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const results = await StudentServices.getSingleDatafromDB(id)
    res.status(200).json({
      sucsees: true,
      massage: 'single user find successfully',
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
