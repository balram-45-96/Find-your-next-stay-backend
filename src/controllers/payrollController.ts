import { Request, Response } from 'express';
import { dataSource } from '..'; // Your data source
import { Payroll } from '../entities/Payroll';
import { Employee } from '../entities/Employees';

export const createPayroll = async (req: Request, res: Response): Promise<any> => {
  try {
    const payrollRepository = dataSource.getRepository(Payroll);
    const employeeRepository = dataSource.getRepository(Employee);

    const { employee, ...payrollData } = req.body;

    const employeeRecord = await employeeRepository.findOneBy({ id: employee });

    if (!employeeRecord) {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }

    const newPayroll = payrollRepository.create({
      ...payrollData,
      employee: employeeRecord,
    });

    const savedPayroll = await payrollRepository.save(newPayroll);

    return res.status(201).json(savedPayroll);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPayrolls = async (_req: Request, res: Response): Promise<any> => {
  try {
    const payrollRepository = dataSource.getRepository(Payroll);
    const payrolls = await payrollRepository.find({ relations: ['employee'] });
    return res.json(payrolls);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPayrollById = async (req: Request, res: Response): Promise<any> => {
  try {
    const payrollRepository = dataSource.getRepository(Payroll);
    const payroll = await payrollRepository.findOne({
      where: { id: Number(req.params.id) },
      relations: ['employee'],
    });

    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    return res.json(payroll);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updatePayroll = async (req: Request, res: Response): Promise<any> => {
  try {
    const payrollRepository = dataSource.getRepository(Payroll);
    const employeeRepository = dataSource.getRepository(Employee);

    const payrollId = parseInt(req.params.id, 10);

    if (isNaN(payrollId)) {
      return res.status(400).json({ message: 'Invalid payroll ID. Must be a number.' });
    }

    const payrollToUpdate = await payrollRepository.findOneBy({ id: payrollId });

    if (!payrollToUpdate) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    let employeeRecord = null;
    if (req.body.employee) {
      const employeeId = parseInt(req.body.employee, 10);
      if (isNaN(employeeId)) {
        return res.status(400).json({ message: 'Invalid employee ID. Must be a number.' });
      }
      employeeRecord = await employeeRepository.findOneBy({ id: employeeId });
      if (!employeeRecord) {
        return res.status(400).json({ message: 'Invalid employee ID' });
      }
    }

    const { employee, ...payrollData } = req.body;

    await payrollRepository.update(payrollId, {
      ...payrollData,
      employee: employeeRecord || payrollToUpdate.employee,
    });

    const updatedPayroll = await payrollRepository.findOneBy({ id: payrollId });

    return res.json(updatedPayroll);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deletePayroll = async (req: Request, res: Response): Promise<any> => {
  try {
    const payrollRepository = dataSource.getRepository(Payroll);
    const payrollId = parseInt(req.params.id, 10);

    if (isNaN(payrollId)) {
      return res.status(400).json({ message: 'Invalid payroll ID. Must be a number.' });
    }
    const result = await payrollRepository.delete(payrollId);

    if (result.affected === 0) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};