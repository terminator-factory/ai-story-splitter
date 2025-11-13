import { createStep } from "@mastra/core/workflows";
import { userPromptSchema, storyJsonSchema } from '../schemas/ai-splitter-schemas';
import { extractAndParseJson, normalizeComplexity, saveJsonString } from '../utils/json-functions';
import { storySplitter } from '../agents/story-splitter-agent';

// ----- Шаг принимает промпт, генерит json с помощью ИИ и сохраняет его в файл -----
export const saveJsonToFile = createStep({
    id: "save-json-to-file",
    inputSchema: userPromptSchema,
    outputSchema: storyJsonSchema,

    execute: async ({ inputData }) => {
        const llm = await storySplitter.generate(inputData.userPrompt);
        const raw = String((llm as any)?.text ?? llm);
        const json = extractAndParseJson(raw);
        const normalized = normalizeComplexity(json);
        const result = storyJsonSchema.parse(normalized);
        saveJsonString(result);

        return result;
    },
});