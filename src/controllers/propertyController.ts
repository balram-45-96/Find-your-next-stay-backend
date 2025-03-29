import { Request, Response } from 'express';
import { dataSource } from '..';
import { Property } from '../entities/Property';

export const getProperties = async (req: Request, res: Response): Promise<any> => {
  try {
    const propertyRepository = dataSource.getRepository(Property);
    const properties = await propertyRepository.find({ relations: ['client'] }); // Include relations if needed
    return res.json(properties);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPropertyById = async (req: Request, res: Response):Promise<any> => {
  try {
    const propertyRepository = dataSource.getRepository(Property);
    const propertyId = parseInt(req.params.id, 10);

    if (isNaN(propertyId)) {
      return res.status(400).json({ message: 'Invalid property ID' });
    }

    const property = await propertyRepository.findOne({
      where: { id: propertyId },
      relations: ['client'], // Include relations if needed
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    return res.json(property);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// ... other property controller functions (createProperty, updateProperty, deleteProperty)