import { loginSchema, registerSchema } from "./authSchema";
import { myTaskSchema } from "./myTaskSchema";

export const validations = {
  login: loginSchema,
  register: registerSchema,
  myTask: myTaskSchema,
};
