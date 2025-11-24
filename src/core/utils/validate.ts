import { ZodSchema } from "zod";

export function validate<T>(schema: ZodSchema<T>, data: unknown) {
    const parsed = schema.safeParse(data);
    if (!parsed.success) throw parsed.error;
    return parsed.data;
}