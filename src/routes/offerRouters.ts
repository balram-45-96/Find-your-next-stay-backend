import express from 'express';
import { createOffer, getOffers, updateOfferStatus, getOfferById } from '../controllers/offerController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Offers
 *   description: Offer management APIs
 * components:
 *   schemas:
 *     Offer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the offer. (Auto-generated)
 *           readOnly: true
 *         clientDetails:
 *           type: object
 *           properties:
 *             clientId:
 *               type: integer
 *               description: The ID of the client.
 *             clientName:
 *               type: string
 *               description: The name of the client.
 *             clientEmail:
 *               type: string
 *               description: The email of the client.
 *             clientAddress:
 *               type: string
 *               description: The address of the client.
 *             clientPhoneNumber:
 *               type: string
 *               description: The phone number of the client.
 *           required:
 *             - clientId
 *         offerDetails:
 *           type: object
 *           properties:
 *             totalAmount:
 *               type: number
 *               format: decimal
 *               description: The total amount.
 *             totalTime:
 *               type: integer
 *               description: The total time (in chosen unit).
 *             discount:
 *               type: number
 *               format: decimal
 *               description: The discount amount (optional).
 *             commentEndDate:
 *               type: string
 *               format: date
 *               description: The comment end date (optional).
 *             comment:
 *               type: string
 *               description: The comment (optional).
 *             offerEmail:
 *               type: string
 *               description: The offer email (optional).
 *             offerPhone:
 *               type: string
 *               description: The offer phone (optional).
 *           required:
 *             - totalAmount
 *             - totalTime
 *         propertyDetails:
 *           type: object
 *           properties:
 *             propertyId:
 *               type: integer
 *               description: The ID of the property.
 *             propertyAddress:
 *               type: string
 *               description: The address of the property.
 *             propertyType:
 *               type: string
 *               description: The type of the property.
 *             propertyAmenities:
 *               type: string
 *               description: The amenities of the property.
*             noOfPetAllowed:
*               type: integer
*               description: The number of pets allowed in the property.
*             specialFeatureStartDate:
*               type: string
*               format: date
*               description: The start date of a special feature.
*             specialFeatureEndDate:
*               type: string
*               format: date
*               description: The end date of a special feature.
 *           required:
 *             - propertyId
 *         addTasks:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               taskCategory:
 *                 type: string
 *                 description: The task category.
 *               taskName:
 *                 type: string
 *                 description: The task name.
 *               taskDescription:
 *                 type: string
 *                 description: The task description.
 *               taskPrice:
 *                 type: number
 *                 format: decimal
 *                 description: The task price.
 *               cleaningRequirements:
 *                 type: string
 *                 description: The cleaning requirements.
 *             required:
 *               - taskCategory
 *               - taskName
 *               - taskDescription
 *               - taskPrice
 *               - cleaningRequirements
 *       required:
 *         - clientDetails
 *         - offerDetails
 *         - propertyDetails
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
 * /api/offers:
 *   post:
 *     summary: Create a new offer
 *     tags: [Offers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Offer'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/201'
 *       400:
 *         $ref: '#/components/responses/400'
 *   get:
 *     summary: Get all offers
 *     tags: [Offers]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Offer'
 *       500:
 *         $ref: '#/components/responses/500'
 * /api/offers/{id}:
 *   get:
 *     summary: Get offer by ID
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the offer to retrieve
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   put:
 *     summary: Update an offer
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the offer to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Offer'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *   delete:
 *     summary: Delete an offer
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the offer to delete
 *     responses:
 *       204:
 *         $ref: '#/components/responses/204'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 * /api/offers/{id}/status:
 *   patch:
 *     summary: Update offer status
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the offer to update status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status for the offer
 *             required:
 *               - status
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
 *       400:
 *         $ref: '#/components/responses/400'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */

router.post('/', createOffer);
router.get('/', getOffers);
router.patch('/:id/status', updateOfferStatus);
router.get('/:id', getOfferById);

export default router;