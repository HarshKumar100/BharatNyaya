import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminLawyers, getAllLawyers, getLawyerById, postLawyer } from "../controllers/lawyer.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postLawyer);
router.route("/get").get(isAuthenticated, getAllLawyers);
router.route("/getadminlawyers").get(isAuthenticated, getAdminLawyers);
router.route("/get/:id").get(isAuthenticated, getLawyerById);

export default router;

