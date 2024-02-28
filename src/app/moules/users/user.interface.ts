export type TUser = {
  id: string
  password: string
  needPasswordChange: boolean
  role: 'admin' | 'student' | 'faculty'
  status: 'inprogress' | 'blocked'
  isDeleted: boolean
  email: string
}
