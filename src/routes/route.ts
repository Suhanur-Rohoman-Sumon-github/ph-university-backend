import { Router } from "express";
import { StudentRouter } from "../app/moules/students/student.route";
import { UserRouter } from "../app/moules/users/user.route";


const router = Router()

const moduleRoute = [
    {
        path:"/students",
        route:StudentRouter
    },
    {
        path:"/users",
        route:UserRouter
    },
    
    
]

moduleRoute.forEach(routes=>router.use(routes.path,routes.route))


export default router