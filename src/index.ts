import express, { json, urlencoded } from "express";
import cors from "cors";
import { DataSource } from "typeorm";
import { initialize } from "./db";
import * as path from "path"; // To resolve paths for entities and migrations
import userAdminRoutes from "./routes/userAdminRoutes"; // Import the user admin routes
import companyRoutes from "./routes/company";
import employeeRoutes from "./routes/employees"; // Import the employee routes
// Load the ORM configuration from the JSON file
import { DataSourceOptions } from "typeorm";

// import addSuperAdmin  from "./seeds/addSuperAdmin"; // Path to your seed script
import { setupSwagger } from "./swagger";
import "reflect-metadata";
import router from "./routes/routes";

// Resolve the path to your ormconfig.json file
const ormConfig = require(path.resolve(__dirname, "ormconfig.json"));

// Initialize the DataSource using the loaded configuration
export const dataSource = new DataSource(ormConfig as DataSourceOptions);

const app = express();

// const router = Router();

const port = 3005;

async function startServer() {
  try {
    // Initialize the DataSource to connect to the database
    await dataSource.initialize();
    console.log("Connected to database!");

    // Initialize repositories
    initialize(dataSource);

    // Middleware
    app.use(json({ limit: "50mb" }));
    app.use(
      urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
    );
    app.use(cors());


    // Setup Swagger
   setupSwagger(app);


    // Use the imported user routes
    // app.use("/api/user", userRoutes); // Prefix all user routes with /api

    // Use authentication routes
    // app.use("/api", userAdminRoutes);

    app.use("/api", router);

    // Call the function to add super admin data
    // await addSuperAdmin();

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

startServer();
