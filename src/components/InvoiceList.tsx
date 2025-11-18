import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

interface Invoice {
  _id: string;
  client: {
    name: string;
  };
  amount: number;
  dueDate: string;
  status: string;
}

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('/api/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Invoices
      </Typography>
      {invoices.length === 0 ? (
        <Typography>No invoices found.</Typography>
      ) : (
        <List>
          {invoices.map((invoice) => (
            <ListItem key={invoice._id}>
              <ListItemText
                primary={`Invoice #${invoice._id}`}
                secondary={`Client: ${invoice.client.name} | Amount: $${invoice.amount} | Due: ${new Date(invoice.dueDate).toLocaleDateString()} | Status: ${invoice.status}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default InvoiceList;
