import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

interface ClientFormProps {
  onClientAdded?: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ onClientAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/clients', {
        name,
        email,
        address
      });
      setName('');
      setEmail('');
      setAddress('');
      onClientAdded?.();
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Add Client
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Address"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Client
        </Button>
      </form>
    </div>
  );
};

export default ClientForm;