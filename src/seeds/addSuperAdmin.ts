import { SuperAdmin } from "../entities/SuperAdmin";
import { getSuperAdminRepo } from "../db";

async function addSuperAdmin() {
  try {
    const superAdminRepo = getSuperAdminRepo();

    const superAdmin = new SuperAdmin();
    superAdmin.email = "admin@example.com";
    superAdmin.password = 'admin1234' // Hashing password before saving it
    superAdmin.otp = null;  // OTP will be null initially
    superAdmin.otpExpiration = null; // Expiration date for OTP

    // Save the new super admin to the database
    await superAdminRepo.save(superAdmin);

    console.log("SuperAdmin data has been added!");
  } catch (error) {
    console.error("Error adding SuperAdmin data:", error);
  }
}

export default addSuperAdmin;
