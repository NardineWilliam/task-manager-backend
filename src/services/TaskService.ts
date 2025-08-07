import { TaskRepository } from "../repositories/TaskRepository";
import { UserRepository } from "../repositories/UserRepository";
import { Task } from "../entities/Task";

export class TaskService {
  static async getUserTasks(userId: number) {
    const tasks = await TaskRepository.find({
      where: { user: { id: userId } },
      relations: ["user"],
      order: { createdAt: "DESC" },
    });

    // Remove password from each task's user in response
    return tasks.map((task) => {
      if (task.user && "password" in task.user) {
        delete (task.user as any).password;
      }
      return task;
    });
  }

  static async createTask(userId: number, data: Partial<Task>) {
    const { title, description } = data;

    // Task without title is not allowed
    if (!title) {
      throw new Error("Title is required.");
    }

    // Check for auth user to allow creating task
    const user = await UserRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found.");
    }

    // Create new task in database
    const newTask = TaskRepository.create({
      title,
      description,
      user,
    });

    await TaskRepository.save(newTask);

    // Remove password from user in response
    if (newTask.user && "password" in newTask.user) {
      delete (newTask.user as any).password;
    }

    return newTask;
  }

  static async updateTask(userId: number, taskId: number, data: Partial<Task>) {
    // Check that task exists and belongs to the auth user
    const task = await TaskRepository.findOne({
      where: {
        id: taskId,
        user: { id: userId },
      },
      relations: ["user"],
    });

    if (!task) {
      throw new Error("Task not found or access denied.");
    }

    // Check that new data is provided
    if (data.title !== undefined) task.title = data.title;
    if (data.description !== undefined) task.description = data.description;

    await TaskRepository.save(task);

    // Remove password from task's user in response
    if (task.user && "password" in task.user) {
      delete (task.user as any).password;
    }

    return task;
  }

  static async deleteTask(userId: number, taskId: number) {
    // Check that task exists and belongs to the auth user
    const task = await TaskRepository.findOne({
      where: {
        id: taskId,
        user: { id: userId },
      },
    });

    if (!task) {
      throw new Error("Task not found or access denied.");
    }

    await TaskRepository.remove(task);
  }

  static async toggleTaskCompletion(userId: number, taskId: number) {
    // Check that the task exists and belongs to the auth user
    const task = await TaskRepository.findOne({
      where: {
        id: taskId,
        user: { id: userId },
      },
      relations: ["user"],
    });

    if (!task) {
      throw new Error("Task not found or access denied.");
    }

    // Toggle isCompleted value
    task.isCompleted = !task.isCompleted;

    await TaskRepository.save(task);

    // Remove password from task's user in response
    if (task.user && "password" in task.user) {
      delete (task.user as any).password;
    }

    return task;
  }
}
