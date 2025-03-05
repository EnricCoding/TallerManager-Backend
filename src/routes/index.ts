// src/routes/index.ts
import { Router } from "express";
import appointmentRoutes from "./appointment.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

router.get("/test", (req, res) => {
    res.json({ message: "¡Hola Mundo! El backend está funcionando correctamente 🚀" });
});

router.use("/appointments", appointmentRoutes);
router.use("/users", userRoutes);

export default router;
