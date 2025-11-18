import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import invoiceRouter from './routes/invoices';
import clientRouter from './routes/clients';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/invoices', invoiceRouter);
app.use('/api/clients', clientRouter);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/invoice-generator')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
