import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Client from '../src/models/Client.js';
import Invoice from '../src/models/Invoice.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/invoice-generator');
    console.log('Connected to MongoDB');

    await Client.deleteMany({});
    await Invoice.deleteMany({});
    console.log('Cleared existing data');

    const clients = await Client.insertMany([
      { name: 'Client 1', email: 'client1@example.com', address: '123 Main St' },
      { name: 'Client 2', email: 'client2@example.com', address: '456 Oak Ave' },
    ]);
    console.log('Seeded clients');

    await Invoice.insertMany([
      { client: clients[0]._id, amount: 100, dueDate: new Date('2025-12-01'), status: 'draft' },
      { client: clients[1]._id, amount: 250, dueDate: new Date('2025-12-15'), status: 'sent' },
    ]);
    console.log('Seeded invoices');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seed();
