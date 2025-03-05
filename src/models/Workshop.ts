// src/models/Workshop.ts
import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface IWorkshop extends Document {
  name: string;
  address: string;
  contact: string;
  owner: Types.ObjectId;
}

const WorkshopSchema = new Schema<IWorkshop>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

export default model<IWorkshop>("Workshop", WorkshopSchema);