import { Schema, model } from 'mongoose'
import validator from 'validator';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
import {
  StudentModels,
  TGuardian,
  TLocalGuardian,
  TName,
  TStudent,
} from './student.interface'

const userNameSchema = new Schema<TName , StudentModels>({
  firstName: {
    type: String,
    required: true,
    validate:{
      validator:function(value:string){
        const firstStr = value.charAt(0).toUpperCase()+value.slice(1)
        return firstStr === value
      },
      message:"{VALUE} is uppercase"
    },
    trim:true
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
    validate:{
      validator:(value:string) =>validator.isAlpha(value)
    },
    massage:"{VALUE} is not a valid string"
    
  },
})
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  fatherOccupation: {
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
  matherOccupation: {
    type: String,
    required: true,
  },
})

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
})

const StudentSchema = new Schema<TStudent>({
  id: { type: String,unique:true,required:true },
  password: { type: String,required:true ,maxlength:[20," password cannot be longer then 20"]},
  name: {
    type:userNameSchema,
    required:[true,"name is required"],
    maxlength:[20," name cannot be longer then 20"],
   
  },
  gender: {
    type:String,
    enum:{
      values:['male', 'female'],
      message:"gender is required"
    },
    required:true
  },
  contactNumber: { type: String, required: [true,"contact number is required"] },
  emergencyContactNumber: { type: String, required: [true,"emergency contact number is required"] },
  email: { 
    type: String,
     required: [true,"email is required"],
     unique:true,
     validate:{
      validator:(value:string) =>validator.isEmail(value)
    },
    massage:"{VALUE} is not a valid email"
  },
  bloodgroupe: {
    type:String,
    enum:{
      values:["a+", "b+"],
      message:"blood groupe is required"
    },
    required:true
  },
  presentAddress: { type: String, required: [true,"present address is required"] },
  permanentAddress: { type: String, required: [true,"permanent address is required"] },
  guardian: {
    type:guardianSchema,
    required:[true,"gordian is required"]
  },
  localGuardian: {
    type:LocalGuardianSchema,
    required:[true,"Local gordian is required"]
  },
  isActive: { type: String, enum: ['active', 'inActive'], default: 'active' },
  // profileImge: { type: String, required: [true,"profile image is required"] },
})

StudentSchema.pre("save",async function(next){
  // hashing password and save into db
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this ;
 user.password = await bcrypt.hash(user.password,Number(process.env.bcrypt_salt_round));
 next()
})
StudentSchema.post("save",async function(doc,next){
  // remove password from client response
  doc.password = ''
 next()
})

StudentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await this.findOne({ id });
  return existingUser;
};
export const StudentModel = model<TStudent,StudentModels>('Student', StudentSchema)




