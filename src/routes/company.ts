import { Router, Request, Response } from "express";
import * as crypto from "crypto";
import * as nodemailer from "nodemailer";
import { getCompanyRepository } from "../db";
import { Company } from "../entities/Company";

const router = Router();

// Helper function to generate a secure random password
const generateRandomPassword = () => {
  return crypto.randomBytes(8).toString("hex");  // Generates an 8-byte hexadecimal password
};



// Helper function to generate OTP
const generateOtp = () => {
    return crypto.randomInt(100000, 999999);  // OTP between 100000 and 999999
  };
  
  // Helper function to send OTP email
  const sendOtpEmail = async (email: string, otp: number) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",  // You can use other services too
      auth: {
        user: process.env.EMAIL,  // Use environment variables for security
        pass: process.env.EMAIL_PASSWORD,  // Use app-specific passwords if possible
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your Company Login OTP",
      text: `Your OTP for Company login verification is: ${otp}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`OTP sent to ${email}`);
    } catch (error) {
      console.error("Error sending OTP email:", error);
    }
  };
  

// Helper function to send password email
const sendPasswordEmail = async (email: string, password: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",  // You can use other services too
    auth: {
      user: process.env.EMAIL,  // Use environment variables for security
      pass: process.env.EMAIL_PASSWORD,  // Use app-specific passwords if possible
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your Company Login Credentials",
    text: `Your company has been successfully registered. Your login password is: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password sent to ${email}`);
  } catch (error) {
    console.error("Error sending password email:", error);
  }
};



/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - companyName
 *         - address
 *         - contactEmail
 *         - phoneNumber
 *         - subscriptionPlan
 *         - subscriptionStartDate
 *         - subscriptionEndDate
 *         - adminName
 *         - adminEmail
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique ID of the company
 *         companyName:
 *           type: string
 *           description: Name of the company
 *         address:
 *           type: string
 *           description: Company address
 *         contactEmail:
 *           type: string
 *           description: Contact email of the company
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the company
 *         subscriptionPlan:
 *           type: string
 *           description: Subscription plan of the company
 *         subscriptionStartDate:
 *           type: string
 *           format: date
 *           description: Subscription start date
 *         subscriptionEndDate:
 *           type: string
 *           format: date
 *           description: Subscription end date
 *         paymentFrequency:
 *           type: string
 *           description: Payment frequency of the subscription
 *         licenseNo:
 *           type: string
 *           description: License number of the company
 *         licenseExpiryDate:
 *           type: string
 *           format: date
 *           description: License expiry date
 *         adminName:
 *           type: string
 *           description: Admin's name
 *         adminEmail:
 *           type: string
 *           description: Admin's email
 *         password:
 *           type: string
 *           description: Password for the admin account
 *         otp:
 *           type: string
 *           nullable: true
 *           description: One-Time Password for login verification
 *         otpExpiration:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Expiration time of the OTP
 */

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: API for managing Company
 */

/**
 * @swagger
 * /api/company/company-login:
 *   post:
 *     summary: Company login and send OTP to email
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adminEmail:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to admin email
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */



// POST /company-login - Company login and send OTP to email
router.post("/company-login", async (req: Request, res: Response): Promise<any>  => {
    const { adminEmail, password } = req.body;
    console.log('adminEmail: ', adminEmail);
  
    try {
      const companyRepo = getCompanyRepository();
  
      // Find the company by admin email
      const company = await companyRepo.createQueryBuilder('company')
      .where('company.adminEmail = :email', { email: adminEmail })
      .getOne();
      if (!company) {
        return res.status(401).json({ error: "Company not found" });
      }
  
      // Compare the provided password with the stored hashed password
      if (password !== company.password) {
        return res.status(401).json({ error: "Incorrect password" });
      }
  
      // Generate OTP
      const otp = generateOtp();
  
      // Set OTP expiration time (e.g., OTP valid for 5 minutes)
      const otpExpiration = new Date();
      otpExpiration.setMinutes(otpExpiration.getMinutes() + 5);  // OTP expires in 5 minutes
  
      // Save the OTP and its expiration time
      company.otp = `${otp}`;
      company.otpExpiration = otpExpiration;
  
      // Save the company entity with OTP data
      await companyRepo.save(company);
  
      // Send OTP to admin email
      await sendOtpEmail(`${company.adminEmail}`, otp);
  
      res.status(200).json({
        message: "OTP sent to admin email for verification",
      });
    } catch (error) {
      console.error("Error logging in company:", error);
      res.status(500).json({ error: "An error occurred during company login" });
    }
  })



  /**
 * @swagger
 * /api/company/verify-otp:
 *   post:
 *     summary: Verify OTP for company login
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adminEmail:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       401:
 *         description: Unauthorized or OTP expired
 *       500:
 *         description: Internal server error
 */
// POST /verify-otp - Verify OTP for company login
router.post("/verify-otp", async (req: Request, res: Response): Promise<any>  => {
    const { adminEmail, otp } = req.body;
  
    try {
      const companyRepo = getCompanyRepository();
  
      // Find the company by admin email
      const company = await companyRepo.findOne({ where: { adminEmail } });
      if (!company) {
        return res.status(401).json({ error: "Company not found" });
      }
  
      // Check if OTP is valid and hasn't expired
      if (company.otp !== otp) {
        return res.status(401).json({ error: "Invalid OTP" });
      }
  
      if (!company.otpExpiration || new Date() > new Date(company.otpExpiration)) {
        return res.status(401).json({ error: "OTP has expired" });
      }
  
      // OTP is valid and not expired, login successful
      res.status(200).json({
        message: "OTP verified successfully, you are logged in",
      });
  
      // Optionally, you can clear the OTP after successful verification
      company.otp = null;
      company.otpExpiration = null;
      await companyRepo.save(company);
  
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "An error occurred during OTP verification" });
    }
  });


  /**
 * @swagger
 * /api/company/create-company:
 *   post:
 *     summary: Create a new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: Company already exists
 *       500:
 *         description: Internal server error
 */

// POST /create-company - Create a new company
router.post("/create-company", async (req: Request, res: Response): Promise<any>  => {
  const {
    companyName,
    address,
    contactEmail,
    phoneNumber,
    subscriptionPlan,
    subscriptionStartDate,
    subscriptionEndDate,
    paymentFrequency,
    licenseNo,
    licenseExpiryDate,
    adminName,
    adminEmail,
  } = req.body;

  try {
    const companyRepo = getCompanyRepository();

    // Check if company already exists
    const existingCompany = await companyRepo.findOne({ where: { adminEmail } });
    if (existingCompany) {
      return res.status(400).json({ error: "Company already exists" });
    }

    // Generate a random password for the company
    const generatedPassword = generateRandomPassword();

    // Create new company object
    const newCompany = new Company();
    newCompany.companyName = companyName;
    newCompany.address = address;
    newCompany.contactEmail = contactEmail;
    newCompany.phoneNumber = phoneNumber;
    newCompany.subscriptionPlan = subscriptionPlan;
    newCompany.subscriptionStartDate = new Date(subscriptionStartDate);
    newCompany.subscriptionEndDate = new Date(subscriptionEndDate);
    newCompany.paymentFrequency = paymentFrequency;
    newCompany.licenseNo = licenseNo;
    newCompany.licenseExpiryDate = new Date(licenseExpiryDate);
    newCompany.adminName = adminName;
    newCompany.adminEmail = adminEmail;
    newCompany.password = generatedPassword;  // Store the hashed password

    // Save the new company to the database
    const savedCompany = await companyRepo.save(newCompany);

    // Send the generated password to the company's admin email
    await sendPasswordEmail(adminEmail, generatedPassword);

    res.status(201).json({
      message: "Company created successfully and password sent to admin email.",
      company: savedCompany,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ error: "An error occurred while creating the company" });
  }
});


/**
 * @swagger
 * /api/company/edit-company/{id}:
 *   put:
 *     summary: Edit company details
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the company to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Company details updated successfully
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal server error
 */
// PUT /edit-company/:id - Edit company details
router.put("/edit-company/:id", async (req: Request, res: Response): Promise<any>  => {
    const companyId = parseInt(req.params.id);
    const {
      companyName,
      address,
      contactEmail,
      phoneNumber,
      subscriptionPlan,
      subscriptionStartDate,
      subscriptionEndDate,
      paymentFrequency,
      licenseNo,
      licenseExpiryDate,
      adminName,
      adminEmail,
      password
    } = req.body;
  
    try {
      const companyRepo = getCompanyRepository();
  
      // Find the company by id
      const company = await companyRepo.findOne({ where: { id: companyId } });
  
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
  
      // Update fields if provided in the request body
      if (companyName) company.companyName = companyName;
      if (address) company.address = address;
      if (contactEmail) company.contactEmail = contactEmail;
      if (phoneNumber) company.phoneNumber = phoneNumber;
      if (subscriptionPlan) company.subscriptionPlan = subscriptionPlan;
      if (subscriptionStartDate) company.subscriptionStartDate = new Date(subscriptionStartDate);
      if (subscriptionEndDate) company.subscriptionEndDate = new Date(subscriptionEndDate);
      if (paymentFrequency) company.paymentFrequency = paymentFrequency;
      if (licenseNo) company.licenseNo = licenseNo;
      if (licenseExpiryDate) company.licenseExpiryDate = new Date(licenseExpiryDate);
      if (adminName) company.adminName = adminName;
      if (adminEmail) company.adminEmail = adminEmail;
      if (password) company.password = password;  // Make sure to hash password before storing (optional)
  
      // Save the updated company record
      await companyRepo.save(company);
  
      res.status(200).json({ message: "Company details updated successfully", company });
    } catch (error) {
      console.error("Error updating company:", error);
      res.status(500).json({ error: "An error occurred while updating the company" });
    }
});
  

export default router;
