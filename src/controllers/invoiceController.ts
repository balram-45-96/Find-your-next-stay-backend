import { Request, Response } from "express";
import { Invoice } from "../entities/Invoice";
import { dataSource } from "..";
import { invoiceRepository } from "../db";
import { User } from "../entities/User";



// ... in your invoiceController.ts


export const createInvoice = async (req: Request, res: Response) => {
    try {
      const invoiceRepository = dataSource.getRepository(Invoice);
      const userRepository = dataSource.getRepository(User);
  
      const { assignBy, completeBy, invoiceNumber, ...invoiceData } = req.body;
  
      // 1. Check if invoice with the given invoiceNumber already exists
      const existingInvoice = await invoiceRepository.findOneBy({ invoiceNumber });
  
      if (existingInvoice) {
         res.status(400).json({ message: 'Invoice with this invoice number already exists' });
      } else {

  
      // 2. Fetch the User objects based on the IDs
      const assignedByUser = await userRepository.findOneBy({ id: assignBy });
      const completedByUser = await userRepository.findOneBy({ id: completeBy });
  
      if (!assignedByUser || !completedByUser) {
         res.status(400).json({ message: 'Invalid assignBy or completeBy user IDs' });
      } {
  
      // 3. Create the Invoice, associating it with the User entities
      const newInvoice = invoiceRepository.create({
        ...invoiceData,
        assignBy: assignedByUser,
        completeBy: completedByUser,
        invoiceNumber, // Explicitly set the invoiceNumber
      });
  
      const savedInvoice = await invoiceRepository.save(newInvoice);
  
      res.status(201).json(savedInvoice);
    }
    }
  
    } catch (error) {
      console.error(error);
       res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const getInvoices = async (_req: Request, res: Response) => {
      const invoices = await invoiceRepository.find();
      res.json(invoices);
  };
  


