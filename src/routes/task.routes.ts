import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, TaskController.getAll);
router.post("/create", authMiddleware, TaskController.create);

export default router;
