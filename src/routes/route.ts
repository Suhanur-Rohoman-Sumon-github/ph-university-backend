import { Router } from 'express'
import { StudentRouter } from '../app/moules/students/student.route'
import { SemesterRoute } from '../app/moules/academicSemister/semester.route'
import { FacultyRoutes } from '../app/moules/academicFacultes/faculty.route'
import { DepartmentRoutes } from '../app/moules/academicDepartment/department.route'
import { UserRoutes } from '../app/moules/users/user.route'

const router = Router()

const moduleRoute = [
  {
    path: '/students',
    route: StudentRouter,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/semester',
    route: SemesterRoute,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/departments',
    route: DepartmentRoutes,
  },
]

moduleRoute.forEach(routes => router.use(routes.path, routes.route))

export default router
