import express from 'express';
import { getClients, getClientById } from '../controllers/clientController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management APIs
 * /api/clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       500:
 *         $ref: '#/components/responses/500'
 * /api/clients/{id}:
 *   get:
 *     summary: Get client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the client to retrieve
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */

router.get('/', getClients);
router.get('/:id', getClientById);

export default router;