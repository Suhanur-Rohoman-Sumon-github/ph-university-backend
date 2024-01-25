import { Model, Types } from 'mongoose'

export type TGuardian = {
  fatherName: string ;
  fatherOccupation: string;
  fatherContactNo: string;
  matherName: string;
  matherOccupation: string;
  matherContactNo: string;
}

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
}

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export type TStudent = {
  id: string;
  user:Types.ObjectId;
  password: string;
  name: TName;
  gender: 'male' | 'female';
  contactNumber: string;
  emergencyContactNumber: string;
  email: string;
  bloodgroupe?: 'a+' | 'b+';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isDeleted: boolean;
}

// creating a custom static method
export interface StudentModels extends Model<TStudent> {
  isUserExist(id: string): Promise<TStudent | null>
}
