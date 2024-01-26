/* eslint-disable no-unused-expressions */
import { Schema, model } from 'mongoose'
import validator from 'validator'
import {
  StudentModels,
  TGuardian,
  TLocalGuardian,
  TName,
  TStudent,
} from './student.interface'


const userNameSchema = new Schema<TName, StudentModels>({
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        const firstStr = value.charAt(0).toUpperCase() + value.slice(1)
        return firstStr === value
      },
      message: '{VALUE} is uppercase',
    },
    trim: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
    },
    massage: '{VALUE} is not a valid string',
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

const StudentSchema = new Schema<TStudent>(
  {
    id: { type: String, unique: true, required: true },
    user:{type:Schema.ObjectId,required:true,unique:true,ref:'User'},
    
    name: {
      type: userNameSchema,
      required: [true, 'name is required'],
      maxlength: [20, ' name cannot be longer then 20'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: 'gender is required',
      },
      required: true,
    },
    contactNumber: {
      type: String,
      required: [true, 'contact number is required'],
    },
    emergencyContactNumber: {
      type: String,
      required: [true, 'emergency contact number is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
      },
      massage: '{VALUE} is not a valid email',
    },
    bloodgroupe: {
      type: String,
      enum: {
        values: ['a+', 'b+'],
        message: 'blood groupe is required',
      },
      required: true,
    },
    presentAddress: {
      type: String,
      required: [true, 'present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'gordian is required'],
    },
    localGuardian: {
      type: LocalGuardianSchema,
      required: [true, 'Local gordian is required'],
    },
    // profileImge: { type: String, required: [true,"profile image is required"] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)
// make virtual
StudentSchema.virtual('full name', function () {
  return `${this.name.firstName}  ${this.name.middleName} ${this.name.lastName}`
})

// handle deleted data is not coming to the client side
StudentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
// handle single deleted data is not coming to the client side
StudentSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } })
  next()
})
// handle aggregation single deleted data is not coming to the client side
StudentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

StudentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await this.findOne({ id })
  return existingUser
}
export const StudentModel = model<TStudent, StudentModels>(
  'Student',
  StudentSchema,
)
