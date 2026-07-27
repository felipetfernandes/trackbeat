import { z } from "zod";

export const createResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    resultCount: z.number(),
    results: z.array(schema),
  });