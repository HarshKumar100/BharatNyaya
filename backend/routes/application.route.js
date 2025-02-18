import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyLawyer, getApplicants, getAppliedLawyers, updateStatus } from "../controllers/application.controller.js";
 
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyLawyer);
router.route("/get").get(isAuthenticated, getAppliedLawyers);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

export default router;

