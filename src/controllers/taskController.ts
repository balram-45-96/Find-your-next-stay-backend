import { Request, Response } from 'express';
import { dataSource } from '..';
import { Task } from '../entities/Task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const taskRepository = dataSource.getRepository(Task);
    const tasks = await taskRepository.find({ relations: ['offer', 'property'] }); // Include relations if needed
    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const taskRepository = dataSource.getRepository(Task);
    const taskId = parseInt(req.params.id, 10);

    if (isNaN(taskId)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await taskRepository.findOne({
      where: { id: taskId },
      relations: ['offer', 'property'], // Include relations if needed
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// ... other task controller functions (createTask, updateTask, deleteTask)