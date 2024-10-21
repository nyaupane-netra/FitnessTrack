import express from "express";
import { getUserDashboard, UserLogin, UserRegister } from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin)

router.get("/dashboard", verifyToken, getUserDashboard)

export default router;