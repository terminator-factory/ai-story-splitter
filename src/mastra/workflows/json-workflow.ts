import { createWorkflow } from "@mastra/core/workflows";
import { userPromptSchema, storyJsonSchema } from '../schemas/ai-splitter-schemas';
import { saveJsonToFile } from '../steps/ai-splitter-steps';

// ----- Принимаеи пользовательский промпт, генерим json и сохраняем в файл -----
export const jsonWorkflow = createWorkflow({
  steps: [ saveJsonToFile ],
  id: "json-workflow",
  inputSchema: userPromptSchema,
  outputSchema: storyJsonSchema
})
  .then(saveJsonToFile)
  .commit();