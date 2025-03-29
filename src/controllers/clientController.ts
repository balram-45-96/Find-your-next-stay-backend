import { Request, Response } from 'express';
import { dataSource } from '..'; // Import your data source
import { Client } from '../entities/Client';

export const getClients = async (req: Request, res: Response): Promise<any> => {
  try {
    const clientRepository = dataSource.getRepository(Client);
    const clients = await clientRepository.find();
    return res.json(clients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getClientById = async (req: Request, res: Response):Promise<any> => {
  try {
    const clientRepository = dataSource.getRepository(Client);
    const clientId = parseInt(req.params.id, 10);

    if (isNaN(clientId)) {
      return res.status(400).json({ message: 'Invalid client ID' });
    }

    const client = await clientRepository.findOneBy({ id: clientId });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    return res.json(client);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// ... other client controller functions (createClient, updateClient, deleteClient)