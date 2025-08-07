import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
  static async create(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const task = await TaskService.createTask(userId!, req.body);
      return res.status(201).json(task);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
