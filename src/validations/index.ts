import { loginSchema, registerSchema } from "./authSchema";
import { createTaskSchema } from "./taskSchema";

export const validations = {
  login: loginSchema,
  register: registerSchema,
  createTask: createTaskSchema,
};
