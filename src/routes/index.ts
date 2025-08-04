import express from "express";
import authRoutes from "./auth.routes";
import ApiOverview from "./apiOverview.routes";
import Transaction from "./transaction.routes";




const router = express.Router();

//********************** Routes Setup **********************//
router.use("/", authRoutes);
router.use("/", ApiOverview);
router.use("/", Transaction);


export default router;
