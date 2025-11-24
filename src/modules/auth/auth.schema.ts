import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(2),
});

export type RegisterInput = z.infer<typeof registerSchema>;

/*
Cette ligne :
export type RegisterInput = z.infer<typeof registerSchema>;
dit a Zod fais moi automatiquement :
type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

Ca permet le jour où on changera le Schema de données il le fera automatiquement

typeof registerSchema : Ce n’est pas une valeur mais le type du schéma. “Prends le type du schéma de validation”
z.infer<...> : C’est une fonction TypeScript qui génère un type basé sur le schéma.
*/