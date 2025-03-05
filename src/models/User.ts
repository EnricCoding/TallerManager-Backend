// src/models/User.ts
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: "superadmin" | "admin" | "mechanic" | "client";
  password: string;
  workshop?: Schema.Types.ObjectId;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["superadmin", "admin", "mechanic", "client"],
      required: true,
    },
    password: { type: String, required: true },
    workshop: { type: Schema.Types.ObjectId, ref: "Workshop", required: false },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
