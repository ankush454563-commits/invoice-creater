import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

interface Client {
  _id: string;
  name: string;
  email: string;
  address: string;
}

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

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

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Clients
      </Typography>
      {clients.length === 0 ? (
        <Typography>No clients found.</Typography>
      ) : (
        <List>
          {clients.map((client) => (
            <ListItem key={client._id}>
              <ListItemText
                primary={client.name}
                secondary={`${client.email} | ${client.address}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ClientList;