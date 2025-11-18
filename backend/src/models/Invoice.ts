import { Schema, model, Document } from 'mongoose';

export interface IInvoice extends Document {
  client: Schema.Types.ObjectId;
  amount: number;
  dueDate: Date;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

const InvoiceSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['draft', 'sent', 'paid', 'overdue'], default: 'draft' },
});

export default model<IInvoice>('Invoice', InvoiceSchema);
