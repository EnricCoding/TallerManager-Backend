// src/models/Invoice.ts
import { Schema, model, Document } from "mongoose";

export interface IInvoice extends Document {
  client: Schema.Types.ObjectId;
  workshop: Schema.Types.ObjectId;
  total: number;
  date: Date;
  paymentStatus: "pending" | "paid" | "canceled";
}

const InvoiceSchema = new Schema<IInvoice>(
  {
    client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    workshop: { type: Schema.Types.ObjectId, ref: "Workshop", required: true },
    total: { type: Number, required: true },
    date: { type: Date, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "canceled"],
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IInvoice>("Invoice", InvoiceSchema);
