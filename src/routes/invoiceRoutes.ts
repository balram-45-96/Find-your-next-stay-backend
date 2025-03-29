import express from "express";
import { getInvoices, createInvoice } from "../controllers/invoiceController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Invoice management APIs
 *
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the invoice. (Auto-generated)
 *           readOnly: true
 *         propertyName:
 *           type: string
 *           description: The name of the property.
 *           example: "123 Main St Apartment"
 *         houseNo:
 *           type: string
 *           description: The house number or identifier.
 *           example: "Unit 4B"
 *         date:
 *           type: string
 *           format: date
 *           description: The date the invoice was issued.
 *           example: "2024-07-27"
 *         time:
 *           type: string
 *           format: time
 *           description: The time the invoice was issued.
 *           example: "14:30:00"
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the client.
 *           example: "555-123-4567"
 *         invoiceNumber:
 *           type: string
 *           description: The unique invoice number.
 *           example: "INV-20240727-001"
 *         todayWorkTime:
 *           type: string
 *           description: The duration of work performed.
 *           example: "2 hours"
 *         amount:
 *           type: number
 *           format: float
 *           description: The total amount due.
 *           example: 150.00
 *         assignBy:
 *           type: integer  # Or string with format: uuid if you use UUIDs (handle in backend)
 *           description: The ID of the user who assigned the work.
 *           example: 1  # Example integer ID
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The date the invoice is due.
 *           example: "2024-08-10"
 *         completeBy:
 *           type: integer  # Or string with format: uuid if you use UUIDs (handle in backend)
 *           description: The ID of the user who is to complete the work.
 *           example: 1 # Example integer ID
 *         note:
 *           type: string
 *           description: Any additional notes.
 *           example: "Please ensure prompt payment."
 *       required:
 *         - propertyName
 *         - houseNo
 *         - date
 *         - time
 *         - phoneNumber
 *         - invoiceNumber
 *         - amount
 *         - assignBy
 *         - dueDate
 *         - completeBy
 *   responses:
 *     '201Created':
 *       description: Resource created successfully
 *     '400BadRequest':
 *       description: Bad request. Invalid input provided.
 *     '404NotFound':
 *       description: The specified resource was not found.
 *     '500InternalServerError':
 *       description: Internal server error
 *
 * paths:
 *   /api/invoices:
 *     post:
 *       summary: Create a new invoice
 *       tags: [Invoices]
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       responses:
 *         '201':
 *           $ref: '#/components/responses/201Created'
 *         '400':
 *           $ref: '#/components/responses/400BadRequest'
 *         '500':
 *           $ref: '#/components/responses/500InternalServerError'
 *     get:
 *       summary: Get all invoices
 *       tags: [Invoices]
 *       responses:
 *         '200':
 *           description: List of invoices
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Invoice'
 *         '500':
 *           $ref: '#/components/responses/500InternalServerError'
 *   /api/invoices/{id}:
 *     get:
 *       summary: Get an invoice by ID
 *       tags: [Invoices]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID of the invoice to retrieve
 *       responses:
 *         '200':
 *           description: The requested invoice
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Invoice'
 *         '404':
 *           $ref: '#/components/responses/404NotFound'
 *         '500':
 *           $ref: '#/components/responses/500InternalServerError'
 *     put:
 *       summary: Update an invoice
 *       tags: [Invoices]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID of the invoice to update
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       responses:
 *         '200':
 *           description: Invoice updated successfully
 *         '400':
 *           $ref: '#/components/responses/400BadRequest'
 *         '404':
 *           $ref: '#/components/responses/404NotFound'
 *         '500':
 *           $ref: '#/components/responses/500InternalServerError'
 *     delete:
 *       summary: Delete an invoice
 *       tags: [Invoices]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID of the invoice to delete
 *       responses:
 *         '204':
 *           description: Invoice deleted successfully (No Content)
 *         '404':
 *           $ref: '#/components/responses/404NotFound'
 *         '500':
 *           $ref: '#/components/responses/500InternalServerError'
 */

router.get("/", getInvoices);
router.post("/", createInvoice);
// router.get("/api/invoices/:id", getInvoiceById);
// router.put("/api/invoices/:id", updateInvoice);
// router.delete("/api/invoices/:id", deleteInvoice);

export default router;