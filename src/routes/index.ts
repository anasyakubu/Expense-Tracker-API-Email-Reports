import express from "express";
import authRoutes from "./auth.routes";
import ApiOverview from "./apiOverview.routes";
import Transaction from "./transaction.routes";
import Reports from "./reports.routes";



const router = express.Router();

//********************** Routes Setup **********************//
router.use("/", authRoutes);
router.use("/", ApiOverview);
router.use("/", Transaction);
router.use("/", Reports);


export default router;
