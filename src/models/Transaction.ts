// src/models/Transaction.ts
import { Schema, model, Document } from "mongoose";

export interface ITransaction extends Document {
  workshop: Schema.Types.ObjectId;
  type: "income" | "expense";
  amount: number;
  date: Date;
  description: string;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    workshop: { type: Schema.Types.ObjectId, ref: "Workshop", required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default model<ITransaction>("Transaction", TransactionSchema);
