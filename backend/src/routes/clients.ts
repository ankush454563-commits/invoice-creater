import { Router, Request, Response } from 'express';
import Client from '../models/Client';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, address } = req.body;
    const newClient = new Client({ name, email, address });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: 'Error creating client' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, email, address } = req.body;
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, { name, email, address }, { new: true });
    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: 'Error updating client' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client' });
  }
});

export default router;
