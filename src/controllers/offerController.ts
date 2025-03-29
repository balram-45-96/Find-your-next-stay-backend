import { Request, Response } from 'express';
import { dataSource } from '..';
import { Offer } from '../entities/Offer';
import { Client } from '../entities/Client';
import { Property } from '../entities/Property';
import { Task } from '../entities/Task';

export const createOffer = async (req: Request, res: Response): Promise<any> => {
    try {
        const offerRepository = dataSource.getRepository(Offer);
        const clientRepository = dataSource.getRepository(Client);
        const propertyRepository = dataSource.getRepository(Property);
        const taskRepository = dataSource.getRepository(Task);

        const { clientDetails, offerDetails, propertyDetails, addTasks, ...offerData } = req.body;

        // 1. Create or fetch Client
        let client;
        if (clientDetails.clientId) { // If clientId is provided, fetch existing
            client = await clientRepository.findOneBy({ id: clientDetails.clientId });
            if (!client) {
                return res.status(400).json({ message: 'Invalid client ID' });
            }
        } else { // Otherwise, create a new client
            client = clientRepository.create(clientDetails);
            await clientRepository.save(client);
        }

        // 2. Create or fetch Property
        let property;
        if (propertyDetails.propertyId) { // If propertyId is provided, fetch existing
            property = await propertyRepository.findOneBy({ id: propertyDetails.propertyId });
            if (!property) {
                return res.status(400).json({ message: 'Invalid property ID' });
            }
        } else { // Otherwise, create a new property
            property = propertyRepository.create({ ...propertyDetails, client: client }); // Associate with the client
            await propertyRepository.save(property);
        }

        // 3. Create Offer
        const newOffer = offerRepository.create({
            ...offerData,
            client: client,
            property: property,
            totalAmount: offerDetails.totalAmount,
            totalTime: offerDetails.totalTime,
            discount: offerDetails.discount,
            commentEndDate: offerDetails.commentEndDate,
            comment: offerDetails.comment,
            offerEmail: offerDetails.offerEmail,
            offerPhone: offerDetails.offerPhone,
        });

        const savedOffer = await offerRepository.save(newOffer);

        // 4. Handle Tasks
        if (addTasks && Array.isArray(addTasks)) {
            for (const taskData of addTasks) {
                const newTask = taskRepository.create({
                    ...taskData,
                    offer: savedOffer,
                    property: property, // Associate the task with the property
                });
                await taskRepository.save(newTask);
            }
        }

        return res.status(201).json(savedOffer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const updateOfferStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const offerRepository = dataSource.getRepository(Offer);
        const offerId = parseInt(req.params.id, 10);

        if (isNaN(offerId)) {
            return res.status(400).json({ message: 'Invalid offer ID' });
        }

        const offer = await offerRepository.findOneBy({ id: offerId });

        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        const { status } = req.body; // Get the new status from the request body

        if (!status) {
            return res.status(400).json({ message: 'Status is required in the request body' });
        }

        await offerRepository.update(offerId, { status }); // Update the status

        const updatedOffer = await offerRepository.findOneBy({ id: offerId }); // Fetch updated offer

        return res.json(updatedOffer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getOffers = async (req: Request, res: Response): Promise<any> => {
    try {
        const offerRepository = dataSource.getRepository(Offer);
        const offers = await offerRepository.find({ relations: ['client', 'property'] }); // Include relations if needed
        return res.json(offers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getOfferById = async (req: Request, res: Response): Promise<any> => {
    try {
        const offerRepository = dataSource.getRepository(Offer);
        const offerId = parseInt(req.params.id, 10);

        if (isNaN(offerId)) {
            return res.status(400).json({ message: 'Invalid offer ID' });
        }

        const offer = await offerRepository.findOne({
            where: { id: offerId },
            relations: ['client', 'property', 'tasks'], // Include relations if needed
        });

        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        return res.json(offer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
// Implement other controller functions (getOffers, getOfferById, updateOffer, deleteOffer) similarly, fetching related entities and handling tasks.  Make sure to handle cases where tasks might be updated or deleted.