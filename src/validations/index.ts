import { loginSchema, registerSchema } from "./authSchema";
import { myTaskSchema } from "./myTaskSchema";
import {
  updateProfileSchema,
  updateProfilePasswordSchema,
} from "./profileSchema";

export const validations = {
  login: loginSchema,
  register: registerSchema,
  myTask: myTaskSchema,
  updateProfile: updateProfileSchema,
  updateProfilePassword: updateProfilePasswordSchema,
};
