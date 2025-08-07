import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
import { hashPassword } from "../utils/hash";

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
}
