import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export async function validateInput<T extends object>(dtoClass: new () => T, body: any): Promise<T> {
  const instance = plainToInstance(dtoClass, body);
  const errors = await validate(instance);

  if (errors.length > 0) {
    const messages = errors
      .map((err) => Object.values(err.constraints || {}))
      .flat();
    throw new Error(messages.join(", "));
  }

  return instance;
}
