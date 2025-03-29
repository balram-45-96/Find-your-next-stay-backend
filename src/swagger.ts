import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Employee Management API",
    version: "1.0.0",
    description: "API documentation for managing employees",
  },
  servers: [
    {
      url: "http://localhost:3005", // Replace with your server URL
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // Path to your API files
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
