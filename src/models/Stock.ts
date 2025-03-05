// src/models/Stock.ts
import { Schema, model, Document } from "mongoose";

export interface IStock extends Document {
  workshop: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  quantity: number;
  supplier: Schema.Types.ObjectId;
  lastUpdated: Date;
  status: string;
}

const StockSchema = new Schema<IStock>(
  {
    workshop: { type: Schema.Types.ObjectId, ref: "Workshop", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
    lastUpdated: { type: Date, default: Date.now },
    status: { type: String, default: "available" },
  },
  { timestamps: true }
);

export default model<IStock>("Stock", StockSchema);
