import { IsEmail, IsString, MinLength, Matches } from "class-validator";

export class CreateUserDto {
  @IsString()
  fullName!: string;

  @IsEmail()
  email!: string;

  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/, {
    message:
      "Password must contain at least one letter, one number, and one special character",
  })
  password!: string;
}
