import express from 'express';
import { getProperties, getPropertyById } from '../controllers/propertyController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property management APIs
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the property. (Auto-generated)
 *           readOnly: true
 *         client:
 *           type: integer  # Or object if you want to nest the entire Client object
 *           description: The ID of the client.
 *         propertyAddress:
 *           type: string
 *           description: The address of the property.
 *         propertyType:
 *           type: string
 *           description: The type of the property.
 *         propertyAmenities:
 *           type: string
 *           description: The amenities of the property.
 *         noOfPetAllowed:
 *           type: integer
 *           description: The number of pets allowed in the property.
 *         specialFeatureStartDate:
 *           type: string
 *           format: date
 *           description: The start date of a special feature.
 *         specialFeatureEndDate:
 *           type: string
 *           format: date
 *           description: The end date of a special feature.
 *       required:
 *         - client
 *         - propertyAddress
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
 * /api/properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 *       500:
 *         $ref: '#/components/responses/500'
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/201'
 *       400:
 *         $ref: '#/components/responses/400'
 * /api/properties/{id}:
 *   get:
 *     summary: Get property by ID
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the property to retrieve
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */

router.get('/', getProperties);
router.get('/:id', getPropertyById);


export default router;