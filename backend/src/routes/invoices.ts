import { Router, Request, Response } from 'express';
import Invoice from '../models/Invoice.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const invoices = await Invoice.find().populate('client');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { client, amount, dueDate } = req.body;
    const newInvoice = new Invoice({ client, amount, dueDate });
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Error creating invoice' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { client, amount, dueDate, status } = req.body;
    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, { client, amount, dueDate, status }, { new: true });
    res.json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Error updating invoice' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Invoice deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting invoice' });
  }
});

export default router;
