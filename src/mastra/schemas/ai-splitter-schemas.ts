import { z } from "zod";

// ----- Принимаеи пользовательский промпт -----
export const userPromptSchema = z.object({
    userPrompt: z.string().min(10, "Введите user story или описание фичи"),
});

// ----- Возвращаем json -----
export const storyJsonSchema = z.object({
    epic: z.string().min(1),
    tasks: z.array(z.object({
        title: z.string().min(1),
        complexity: z.number().int().min(1).max(5),
    })).min(1),
});