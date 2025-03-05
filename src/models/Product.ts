// src/models/Product.ts
import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  dimensions?: string;
  brand?: string;
  compatibility?: string;
  supplier: Schema.Types.ObjectId;
  photoUrl?: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    dimensions: { type: String },
    brand: { type: String },
    compatibility: { type: String },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
    photoUrl: { type: String },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", ProductSchema);
