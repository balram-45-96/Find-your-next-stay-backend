import express from 'express';
import { createPayroll, getPayrolls, getPayrollById, updatePayroll, deletePayroll } from '../controllers/payrollController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payrolls
 *   description: Payroll management APIs
 * components:
 *   schemas:
 *     Payroll:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the payroll. (Auto-generated)
 *           readOnly: true
 *         employee:
 *           type: integer
 *           description: The ID of the employee.
 *         salary:
 *           type: number
 *           format: decimal
 *           description: The salary amount.
 *         date:
 *           type: string
 *           format: date
 *           description: The payroll date.
 *         status:
 *           type: string
 *           description: The payroll status.
 *         phoneNumber:
 *           type: string
 *           description: The phone number.
 *         bonuses:
 *           type: number
 *           format: decimal
 *           description: The bonus amount (optional).
 *       required:
 *         - employee
 *         - salary
 *         - date
 *         - status
 *         - phoneNumber
 *   responses:
 *     200:
 *       description: OK
 *     201:
 *       description: Created
 *     204:
 *       description: No Content
 *     400:
 *       description: Bad Request
 *     404:
 *       description: Not Found
 *     500:
 *       description: Internal Server Error
 * /api/payrolls:
 *   post:
 *     summary: Add a new payroll
 *     tags: [Payrolls]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payroll'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/201'
 *       400:
 *         $ref: '#/components/responses/400'
 *   get:
 *     summary: Get all payrolls
 *     tags: [Payrolls]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payroll'
 *       500:
 *         $ref: '#/components/responses/500'
 * /api/payrolls/{id}:
 *   get:
 *     summary: Get payroll by ID
 *     tags: [Payrolls]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the payroll to retrieve
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payroll'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   put:
 *     summary: Update a payroll
 *     tags: [Payrolls]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the payroll to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payroll'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payroll'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   delete:
 *     summary: Delete a payroll
 *     tags: [Payrolls]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the payroll to delete
 *     responses:
 *       204:
 *         $ref: '#/components/responses/204'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */

router.post('/', createPayroll);
router.get('/', getPayrolls);
router.get('/:id', getPayrollById);
router.put('/:id', updatePayroll);
router.delete('/:id', deletePayroll);

export default router;