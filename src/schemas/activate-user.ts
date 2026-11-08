import { z } from "zod";

export const activateUserSchema = z.object({
  rawCode: z
    .string()
    .nonempty("Código é obrigatório.")
    .min(6, "Código de ativação inválido."),
});
