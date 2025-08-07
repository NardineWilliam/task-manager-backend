import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { validateInput } from "../utils/validate";
import { CreateTaskDto } from "../dtos/CreateTaskDto";
import { UpdateTaskDto } from "../dtos/UpdateTaskDto";

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
      const validatedData = await validateInput(CreateTaskDto, req.body);
      const userId = req.userId;
      const task = await TaskService.createTask(userId!, validatedData);
      return res.status(201).json(task);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const validatedData = await validateInput(UpdateTaskDto, req.body);
      const userId = req.userId!;
      const taskId = parseInt(req.params.id);

      const updatedTask = await TaskService.updateTask(userId, taskId, validatedData);
      return res.json(updatedTask);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const userId = req.userId!;
      const taskId = parseInt(req.params.id);

      await TaskService.deleteTask(userId, taskId);
      return res.json({ message: "Task deleted successfully." });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async toggleComplete(req: Request, res: Response) {
    try {
      const userId = req.userId!;
      const taskId = parseInt(req.params.id);

      const updatedTask = await TaskService.toggleTaskCompletion(
        userId,
        taskId
      );
      return res.json(updatedTask);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
