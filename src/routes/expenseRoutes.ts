import express from 'express';
import { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense } from '../controllers/expenseController'; // Import your controller functions

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense management APIs
 *
 * components:
 *   schemas:
 *     Expense:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the expense. (Auto-generated)
 *           readOnly: true
 *         description:
 *           type: string
 *           description: A description of the expense.
 *           example: "Office Supplies"
 *         amount:
 *           type: number
 *           format: float
 *           description: The amount of the expense.
 *           example: 50.00
 *         date:
 *           type: string
 *           format: date
 *           description: The date the expense was incurred.
 *           example: "2024-07-28"
 *         status:
 *           type: string
 *           description: The status of the expense (e.g., "Pending", "Approved", "Rejected").
 *           example: "Pending"
 *         phoneNumber:
 *           type: string
 *           description: The phone number associated with the expense.
 *           example: "555-123-9876"
 *         employee: 
 *           type: integer 
 *           description: The ID of the employee who incurred the expense.
 *           example: 123 
 *       required:
 *         - description
 *         - amount
 *         - date
 *         - status
 *         - phoneNumber
 *         - employee
 *   responses:
 *     '201Created':
 *       description: Resource created successfully
 *     '400BadRequest':
 *       description: Bad request. Invalid input provided.
 *     '404NotFound':
 *       description: The specified resource was not found.
 *     '500InternalServerError':
 *       description: Internal server error
 *     '204NoContent':
 *       description: Resource deleted successfully (No Content)
 *
 * paths:
 *   /api/expenses:
 *     post:
 *       summary: Create a new expense
 *       tags: [Expenses]
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       responses:
 *         '201':
 *           $ref: '#/components/responses/201Created'
 *         '400':
 *           $ref: '#/components/responses/400BadRequest'
 *         '500':
 *           $ref: '#/components/responses/500InternalServerError'
 *     get:
 *       summary: Get all expenses
 *       tags: [Expenses]
 *       responses:
 *         '200':
 *           description: List of expenses
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Expense'
 *         '500':
 *           $ref: '#/components/responses/500InternalServerError'
 *   /api/expenses/{id}:
 *     get:
 *       summary: Get an expense by ID
 *       tags: [Expenses]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID of the expense to retrieve
 *       responses:
 *         '200':
 *           description: The requested expense
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Expense'
 *         '404':
 *           $ref: '#/components/responses/404NotFound'
 *         '500':
 *           $ref: '#/components/responses/500InternalServerError'
 *     put:
 *       summary: Update an expense
 *       tags: [Expenses]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID of the expense to update
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       responses:
 *         '200':
 *           description: Expense updated successfully
 *         '400':
 *           $ref: '#/components/responses/400BadRequest'
 *         '404':
 *           $ref: '#/components/responses/404NotFound'
 *         '500':
 *           $ref: '#/components/responses/500InternalServerError'
 *     delete:
 *       summary: Delete an expense
 *       tags: [Expenses]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID of the expense to delete
 *       responses:
 *         '204':
 *           $ref: '#/components/responses/204NoContent'
 *         '404':
 *           $ref: '#/components/responses/404NotFound'
 *         '500':
 *           $ref: '#/components/responses/500InternalServerError'
 */


router.post('', createExpense);
router.get('', getExpenses);
router.get('/:id', getExpenseById);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;