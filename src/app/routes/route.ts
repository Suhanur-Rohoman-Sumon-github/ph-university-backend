import { Router } from 'express'
import { StudentRouter } from '../moules/students/student.route'
import { SemesterRoute } from '../moules/academicSemister/semester.route'
import { FacultyRoutes } from '../moules/academicFacultes/faculty.route'
import { DepartmentRoutes } from '../moules/academicDepartment/department.route'
import { UserRoutes } from '../moules/users/user.route'
import { CorseRoute } from '../moules/course/course.route'
import { semesterRegistrationRoutes } from '../moules/semesterRegistetion/semesterRegistetion.route'

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
  {
    path: '/course',
    route: CorseRoute,
  },
  {
    path: '/semester-registration',
    route: semesterRegistrationRoutes,
  },
]

moduleRoute.forEach(routes => router.use(routes.path, routes.route))

export default router
