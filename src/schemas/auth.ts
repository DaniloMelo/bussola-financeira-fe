import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Nome não pode estar vazio.")
      .min(3, "Nome precisa ter o mínimo de 3 caracteres.")
      .max(100, "Nome pode ter no máximo 100 caracteres."),

    email: z.email("E-mail inválido.").min(1, "O email é obrigatório."),

    password: z
      .string()
      .nonempty("Senha não pode estar vazia.")
      .min(3, "Senha precisa ter o mínimo de 6 caracteres."),

    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("E-mail inválido.").min(1, "O email é obrigatório."),

  password: z.string().nonempty("Senha não pode estar vazia."),
});

export type registerFormData = z.infer<typeof registerSchema>;
export type loginFormData = z.infer<typeof loginSchema>;
