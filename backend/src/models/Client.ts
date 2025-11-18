import { Schema, model, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email: string;
  address: string;
}

const ClientSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
});

export default model<IClient>('Client', ClientSchema);
