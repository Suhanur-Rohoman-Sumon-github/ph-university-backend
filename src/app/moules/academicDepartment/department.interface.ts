import { Types } from 'mongoose';

export type TDepartment = {
  name: string;
  Faculty: Types.ObjectId;
};