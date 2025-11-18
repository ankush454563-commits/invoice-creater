import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

interface Client {
  _id: string;
  name: string;
}

interface InvoiceFormProps {
  onInvoiceAdded?: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onInvoiceAdded }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('/api/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/invoices', {
        client,
        amount: Number(amount),
        dueDate,
      });
      setClient('');
      setAmount('');
      setDueDate('');
      onInvoiceAdded?.();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Create Invoice
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Client</InputLabel>
          <Select value={client} onChange={(e) => setClient(e.target.value)} required>
            {clients.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Amount"
          type="number"
          fullWidth
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create
        </Button>
      </form>
    </div>
  );
};

export default InvoiceForm;
