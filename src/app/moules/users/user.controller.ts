import { Request, Response } from "express"
import { UserService } from "./user.services"

const createStudent = async (req: Request, res: Response) => {
    try {
        const { students, password } = req.body

        const results = await UserService.createStudentIntoDB(password, students)
        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: results,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message, 
        })
    }
}

export const userController = {
    createStudent
}
