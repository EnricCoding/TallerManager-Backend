// src/models/Client.ts
import { Schema, model, Document } from "mongoose";

export interface IClient extends Document {
  name: string;
  email: string;
  phone: string;
  serviceHistory: Schema.Types.ObjectId[];
}

const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    serviceHistory: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
  },
  { timestamps: true }
);

export default model<IClient>("Client", ClientSchema);
