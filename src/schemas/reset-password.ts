import { z } from "zod";

export const requestPasswordResetSchema = z.object({
  email: z.email("E-mail inválido.").min(1, "O email é obrigatório."),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty("Senha não pode estar vazia.")
      .min(6, "Senha precisa ter o mínimo de 6 caracteres."),

    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
