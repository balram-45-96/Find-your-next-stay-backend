import { Router, Request, Response } from "express";

const router = Router();

import { getEmployeeRepository } from "../db";
import { body, validationResult } from "express-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - jobPosition
 *         - startDate
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique ID of the employee
 *         firstName:
 *           type: string
 *           description: Employee's first name
 *         lastName:
 *           type: string
 *           description: Employee's last name
 *         jobPosition:
 *           type: string
 *           description: Employee's job position
 *         startDate:
 *           type: string
 *           format: date
 *           description: Employment start date
 *         workHours:
 *           type: string
 *           description: Employee's work hours and availability
 *         qualifications:
 *           type: string
 *           description: Employee's professional qualifications and training
 *         experience:
 *           type: string
 *           description: Employee's work experience
 *         languageSkills:
 *           type: array
 *           items:
 *             type: string
 *           description: Employee's language skills
 *         specialSkills:
 *           type: string
 *           description: Employee's special skills
 *         medicalInfo:
 *           type: string
 *           description: Employee's medical information
 *         emergencyContacts:
 *           type: array
 *           items:
 *             type: string
 *           description: Emergency contact information
 *         socialSecurityNumber:
 *           type: string
 *           description: Employee's social security number
 *         taxInformation:
 *           type: string
 *           description: Employee's tax information
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: Employee's date of birth
 *         privateAddress:
 *           type: string
 *           description: Employee's private address
 *         privatePhoneNumber:
 *           type: string
 *           description: Employee's private phone number
 *         numberOfChildren:
 *           type: integer
 *           description: Number of children
 *         copyOfID:
 *           type: string
 *           description: Copy of ID document (URL or file path)
 *         ahvCard:
 *           type: string
 *           description: AHV card information
 *         ahvNumber:
 *           type: string
 *           description: AHV number
 *         salary:
 *           type: number
 *           description: Employee's salary
 *         bankAccountInfo:
 *           type: string
 *           description: Employee's bank account information
 *         bonusPayments:
 *           type: string
 *           description: Bonus payments and financial benefits
 *         employmentContract:
 *           type: string
 *           description: Employment contract details
 *         disciplinaryActions:
 *           type: string
 *           description: Disciplinary actions or notes
 *         futurePlans:
 *           type: string
 *           description: Future development plans or promotions
 *         access:
 *           type: string
 *           description: Security access details
 */


/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Add a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Bad request
 */


router.post(
  "/",
  [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("jobPosition").notEmpty().withMessage("Job position is required"),
    body("startDate").isDate().withMessage("Invalid start date format"),
  ],
  async (req: Request, res: Response): Promise<any>  => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Proceed with creating the employee
    const employeeRepository = getEmployeeRepository();
    try {
      const employee = employeeRepository.create(req.body);
      const result = await employeeRepository.save(employee);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add new employee" });
    }
  }
);


/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: Employee details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 */

router.get("/:id", async (req: Request, res: Response): Promise<any>  => {
    const { id } = req.params;
    const employeeRepository = getEmployeeRepository();
  
    try {
        const employee = await employeeRepository.findOne({
            where: { id: Number(id) }, // Pass the id as part of the `where` clause
          });
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.status(200).json(employee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve employee details" });
    }
  });

  
/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 */

router.put("/:id", async (req: Request, res: Response): Promise<any>  => {
    const { id } = req.params;
    const employeeRepository = getEmployeeRepository();
  
    try {
        const employee = await employeeRepository.findOne({
            where: { id: Number(id) }, // Pass the id as part of the `where` clause
          });
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
  
      // Update employee with new data
      const updatedEmployee = employeeRepository.merge(employee, req.body);
      const result = await employeeRepository.save(updatedEmployee);
  
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update employee" });
    }
  });
  

export default router;
