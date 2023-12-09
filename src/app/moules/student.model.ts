import { Schema, model } from 'mongoose'
import {
  Gerdian,
  LocalGerdian,
  Name,
  Student,
} from './students/student.interface'

const userNameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: true,
  },
  midleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
})
const gerdianSchema = new Schema<Gerdian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  fatherOcopation: {
    type: String,
    required: true,
  },
  matherContactNo: {
    type: String,
    required: true,
  },
  matherName: {
    type: String,
    required: true,
  },
  matherOcopation: {
    type: String,
    required: true,
  },
})

const LocalGerdianSchema = new Schema<LocalGerdian>({
  name: {
    type: String,
    required: true,
  },
  ocopation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
})

const StudentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'],
  constactNumbar: { type: String, required: true },
  emargencyContactNumbar: { type: String, required: true },
  email: { type: String, required: true },
  bloodgroupe: ['a+', 'b+'],
  presentAdrees: { type: String, required: true },
  parmannetAdress: { type: String, required: true },
  gerdian: gerdianSchema,
  localGerdian: LocalGerdianSchema,
  isActive: { type: String, required: true },
  profileImge: { type: String, required: true },
})

export const StudentModel = model<Student>('Student', StudentSchema)
