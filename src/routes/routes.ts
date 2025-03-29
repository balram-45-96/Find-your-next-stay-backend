import { Router } from "express";
import invoiceRoutes from "./invoiceRoutes";
import expenseRoutes from "./expenseRoutes";
import payrollRoutes from "./payrollRoutes";
import companyRoutes from "./company";
import employeeRoutes from "./employees";
import offerRouters from "./offerRouters";
import propertiesRoutes from "./properties.router";
import clientRoutes from "./client.routes";

const router = Router();

router.use("/invoices", invoiceRoutes);
router.use("/expenses", expenseRoutes);
router.use("/payrolls", payrollRoutes);
router.use("/company", companyRoutes);
router.use("/employees", employeeRoutes);
router.use("/offers", offerRouters);
router.use("/properties", propertiesRoutes);
router.use("/clients", clientRoutes);

export default router;
