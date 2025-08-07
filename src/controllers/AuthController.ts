import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { validateInput } from "../utils/validate";
import { CreateUserDto } from "../dtos/CreateUserDto";
import { LoginUserDto } from "../dtos/LoginUserDto";
export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const validatedData = await validateInput(CreateUserDto, req.body);
      const user = await AuthService.signup(validatedData);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async signin(req: Request, res: Response) {
    try {
      const validatedData = await validateInput(LoginUserDto, req.body);
      const result = await AuthService.signin(validatedData.email, validatedData.password);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}
