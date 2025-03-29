import { Request, Response } from "express";
import { Expense } from "../entities/Expense";
import { Employee } from "../entities/Employees";
import { dataSource } from "..";

export const createExpense = async (req: Request, res: Response): Promise<any> => {
  try {
    const expenseRepository = dataSource.getRepository(Expense);
    const employeeRepository = dataSource.getRepository(Employee);

    const { employee, ...expenseData } = req.body;

    const employeeUser = await employeeRepository.findOneBy({ id: employee });

    if (!employeeUser) {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }

    const newExpense = expenseRepository.create({
      ...expenseData,
      employee: employeeUser,
    });

    const savedExpense = await expenseRepository.save(newExpense);

    return res.status(201).json(savedExpense);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getExpenses = async (_req: Request, res: Response): Promise<any> => {
  try {
    const expenseRepository = dataSource.getRepository(Expense);
    const expenses = await expenseRepository.find({ relations: ['employee'] }); // Include related employee data
    return res.json(expenses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export const getExpenseById = async (req: Request, res: Response): Promise<any> => {
    try {
      const expenseRepository = dataSource.getRepository(Expense);
  
      const expenseId = parseInt(req.params.id, 10); // Parse id as an integer
  
      if (isNaN(expenseId)) { // Check if parsing failed
        return res.status(400).json({ message: 'Invalid expense ID. Must be a number.' });
      }
  
      const expense = await expenseRepository.findOne({
        where: { id: expenseId }, // Use the parsed integer ID
        relations: ['employee'],
      });
  
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      return res.json(expense);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const updateExpense = async (req: Request, res: Response): Promise<any> => {
      try {
        const expenseRepository = dataSource.getRepository(Expense);
        const employeeRepository = dataSource.getRepository(Employee);
    
        const expenseId = parseInt(req.params.id, 10);  // Parse ID as integer
    
        if (isNaN(expenseId)) {
          return res.status(400).json({ message: 'Invalid expense ID. Must be a number.' });
        }
    
        const expenseToUpdate = await expenseRepository.findOneBy({ id: expenseId }); // Use parsed ID
    
        if (!expenseToUpdate) {
          return res.status(404).json({ message: 'Expense not found' });
        }
    
        let employeeUser = null;
        if (req.body.employee) { // Check if employee is provided in the update
          const employeeId = parseInt(req.body.employee, 10); // Parse employee ID if provided
          if (isNaN(employeeId)) {
            return res.status(400).json({ message: 'Invalid employee ID. Must be a number.' });
          }
          employeeUser = await employeeRepository.findOneBy({ id: employeeId });
          if (!employeeUser) {
            return res.status(400).json({ message: 'Invalid employee ID' });
          }
        }
    
        const { employee, ...expenseData } = req.body; // Destructure after parsing
    
        await expenseRepository.update(expenseId, { // Use parsed ID
          ...expenseData,
          employee: employeeUser || expenseToUpdate.employee, // Keep existing employee if not updated
        });
    
        const updatedExpense = await expenseRepository.findOneBy({ id: expenseId }); // Use parsed ID
    
        return  res.json(updatedExpense);
    
      } catch (error) {
        console.error(error);
        return  res.status(500).json({ message: 'Internal server error' });
      }
    };
  
  
  export const deleteExpense = async (req: Request, res: Response): Promise<any> => {
    try {
      const expenseRepository = dataSource.getRepository(Expense);
  
      const expenseId = parseInt(req.params.id, 10); // Parse ID as integer
  
      if (isNaN(expenseId)) {
        return res.status(400).json({ message: 'Invalid expense ID. Must be a number.' });
      }
  
      const result = await expenseRepository.delete(expenseId); // Use parsed ID
  
      if (result.affected === 0) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      return  res.status(204).send();
    } catch (error) {
      console.error(error);
      return  res.status(500).json({ message: 'Internal server error' });
    }
  };
  