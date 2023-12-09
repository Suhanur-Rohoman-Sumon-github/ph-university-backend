export type Gerdian = {
  fatherName: string
  fatherOcopation: string
  fatherContactNo: string
  matherName: string
  matherOcopation: string
  matherContactNo: string
}

export type LocalGerdian = {
  name: string
  ocopation: string
  contactNo: string
}

export type Name = {
  firstName: string
  midleName: string
  lastName: string
}

export type Student = {
  id: string
  name: Name
  gender: 'male' | 'femle'
  constactNumbar: string
  emargencyContactNumbar: string
  email: string
  bloodgroupe?: 'a+' | 'b+'
  presentAdrees: string
  parmannetAdress: string
  gerdian: Gerdian
  localGerdian: LocalGerdian
  profileImge?: string
  isActive: 'active' | 'inActive'
}
