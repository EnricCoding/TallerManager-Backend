// src/models/Appointment.ts
import { Schema, model, Document } from "mongoose";

export interface IAppointment extends Document {
  client: Schema.Types.ObjectId;
  workshop: Schema.Types.ObjectId;
  service: Schema.Types.ObjectId;
  mechanic: Schema.Types.ObjectId;
  date: Date;
  status: "pending" | "confirmed" | "completed" | "canceled";
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    workshop: { type: Schema.Types.ObjectId, ref: "Workshop", required: true },
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    mechanic: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IAppointment>("Appointment", AppointmentSchema);
