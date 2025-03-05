// src/routes/appointment.routes.ts
import { Router } from "express";
import {
  createAppointment,
  getAppointments,
} from "../controllers/appointment.controller.js";
import { authenticateJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticateJWT, createAppointment);
router.get("/", authenticateJWT, getAppointments);

export default router;
