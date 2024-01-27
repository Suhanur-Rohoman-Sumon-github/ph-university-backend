import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'
import config from '../../config'
import bcrypt from 'bcrypt'
const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    needPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: {
      type: String,
      enum: ['inprogress', 'blocked'],
      default: 'inprogress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
)
// add hashing password
userSchema.pre('save', async function (next) {
  // hashing password and save into db
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

// remove password from db
userSchema.post('save', async function (doc, next) {
  // remove password from client response
  doc.password = ''
  next()
})

export const UserModel = model<TUser>('User', userSchema)
