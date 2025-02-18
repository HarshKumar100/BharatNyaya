import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCourt, getCourtById, registerCourt, updateCourt } from "../controllers/court.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCourt);
router.route("/get").get(isAuthenticated,getCourt);
router.route("/get/:id").get(isAuthenticated,getCourtById);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateCourt);

export default router;

