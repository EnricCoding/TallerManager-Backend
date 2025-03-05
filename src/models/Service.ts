// src/models/Service.ts
import { Schema, model, Document } from "mongoose";

export interface IService extends Document {
  name: string;
  price: number;
  estimatedDuration: number;
  workshop?: Schema.Types.ObjectId;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    estimatedDuration: { type: Number, required: true },
    workshop: { type: Schema.Types.ObjectId, ref: "Workshop", required: false },
  },
  { timestamps: true }
);

export default model<IService>("Service", ServiceSchema);
