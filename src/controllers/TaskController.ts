import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
  static async getAll(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const tasks = await TaskService.getUserTasks(userId!);
      return res.json(tasks);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

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
