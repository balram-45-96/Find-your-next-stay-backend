import { Router, Request, Response } from "express";
import crypto from "crypto";
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";  // You need to install nodemailer
import { getSuperAdminRepo } from "../db";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: SuperAdmin
 *   description: Super Admin management
 */

/**
 * @swagger
 * /api/super-admin-login:
 *   post:
 *     summary: Super Admin login and OTP generation
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful, OTP sent to email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful. OTP sent to email"
 *       401:
 *         description: Unauthorized, invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Super Admin not found"
 */
// POST /super-admin-login API
router.post("/super-admin-login",  [body("email").isEmail(), body("password").notEmpty()], async (req: Request, res: Response): Promise<any>  => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const superAdminRepo = getSuperAdminRepo();
  try {
    const superAdmin = await superAdminRepo.findOne({ where: { email } });
    if (!superAdmin) {
      return res.status(401).json({ error: "Super Admin not found" });
    }

    // Verify password (for simplicity, plaintext is used here)
    if (superAdmin.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate OTP and set expiration time
    const otp = crypto.randomInt(100000, 999999); // OTP between 100000 and 999999
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5); // OTP expires in 5 minutes

    // Save OTP and expiration time to the database
    superAdmin.otp = otp.toString();
    superAdmin.otpExpiration = expirationTime;
    await superAdminRepo.save(superAdmin);

    // Send OTP via email
    await sendOtpEmail(`${superAdmin.email}`, otp);

    res.status(200).json({ message: "Login successful. OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});


// Helper function to send OTP email
const sendOtpEmail = async (email: string, otp: number): Promise<any>  => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: 'smtp.gmail.com',
  port: 465,
  secure: true,
    auth: {
      user: 'balramparthpatidar@gmail.com',  // Replace with your email
      pass: 'ecrm ypsq avcu zmbs',  // Replace with your email password or app-specific password
    },
  });

  const mailOptions = {
    from: 'balramparthpatidar@gmail.com',
    to: email,
    subject: "Super Admin OTP Verification",
    text: `Your OTP for Super Admin login verification is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};




/**
 * @swagger
 * /api/verify-otp:
 *   post:
 *     summary: Verify OTP for Super Admin login
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               providedOtp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP verified successfully"
 *       401:
 *         description: Unauthorized, invalid or expired OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid OTP"
 */ 
// POST /verify-otp API
router.post("/verify-otp", async (req: Request, res: Response): Promise<any>  => {
  const { email, providedOtp } = req.body;

  const superAdminRepo = getSuperAdminRepo();
  try {
    const superAdmin = await superAdminRepo.findOne({ where: { email } });
    
    if (!superAdmin) {
      return res.status(401).json({ error: "Super Admin not found" });
    }

    // Check if OTP exists and if it has expired
    if (!superAdmin.otp) {
      return res.status(401).json({ error: "No OTP generated" });
    }

    if (!superAdmin.otpExpiration || new Date() > superAdmin.otpExpiration) {
      // OTP expired, remove it from database
      superAdmin.otp = null;
      superAdmin.otpExpiration = null;
      await superAdminRepo.save(superAdmin);
      return res.status(401).json({ error: "OTP has expired" });
    }

    // Check if the provided OTP matches the stored OTP
    if (superAdmin.otp !== providedOtp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    // OTP is valid, clear it from the database after verification
    superAdmin.otp = null;
    superAdmin.otpExpiration = null;
    await superAdminRepo.save(superAdmin);

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during OTP verification" });
  }
});


export default router;
