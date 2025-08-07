import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
import { hashPassword } from "../utils/hash";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

export class AuthService {
  static async signup(data: Partial<User>) {
    const { fullName, email, password } = data;

    // Check required fields
    if (!fullName || !email || !password) {
      throw new Error("All fields are required.");
    }

    // Check if email already exists
    const existingUser = await UserRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email is already in use.");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = UserRepository.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save to DB
    await UserRepository.save(newUser);

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  static async signin(email: string, password: string) {
    // Check for missing inputs
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    // Check for invalid credentials
    const user = await UserRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials.");
    }

    // If user found, generate JWT token
    const token = generateToken(user.id);

    // Return user and token
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
    };
  }
}
