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

    // Remove password from each task's user
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

    // Remove password from returned user
    if (newTask.user && "password" in newTask.user) {
      delete (newTask.user as any).password;
    }

    return newTask;
  }
}
