import { loginSchema, registerSchema } from "./authSchema";

export const validations = {
  login: loginSchema,
  register: registerSchema,
};
