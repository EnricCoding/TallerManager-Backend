// src/models/Supplier.ts
import { Schema, model, Document } from 'mongoose';

export interface ISupplier extends Document {
  name: string;
  contact: string;
  suppliedProducts: Schema.Types.ObjectId[];
  commercialTerms?: string;
}

const SupplierSchema = new Schema<ISupplier>(
  {
    name: { type: String, required: true },
    contact: { type: String, required: true },
    suppliedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    commercialTerms: { type: String },
  },
  { timestamps: true }
);

export default model<ISupplier>('Supplier', SupplierSchema);
