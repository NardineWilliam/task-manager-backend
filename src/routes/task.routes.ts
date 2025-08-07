import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, TaskController.getAll);
router.post("/create", authMiddleware, TaskController.create);
router.put("/:id", authMiddleware, TaskController.update);
router.delete("/:id", authMiddleware, TaskController.delete);
router.patch("/:id/toggle", authMiddleware, TaskController.toggleComplete);

export default router;
