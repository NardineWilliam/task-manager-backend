import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const user = await AuthService.signup(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.signin(email, password);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}
