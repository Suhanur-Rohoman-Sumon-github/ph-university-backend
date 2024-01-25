import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    id: { type: String, required: true,unique:true },
    password: { type: String, required: true,unique:true },
    needPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'student','faculty'] },
    status: { type: String, enum: ['inprogress', 'blocked'] ,default:'inprogress' },
    isDeleted: { type: Boolean,default:false },
  },
  {timestamps:true},
  );

export  const UserModel = model<TUser>('User',userSchema)