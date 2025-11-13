import { writeFile } from "node:fs/promises";

export function extractAndParseJson(text: string) {
  let cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```$/i, '')
    .replace(/[“”]/g, '"')
    .replace(/,\s*}/g, '}')
    .replace(/,\s*]/g, ']')
    .replace(/,\s*\{\s*\{/g, ', {')
    .replace(/\{\s*\{\s*"title"/g, '{"title"')
    .replace(/,\s*\{\s*"\s*\{\s*/g, ', {"')
    .replace(/"\s*\{\s*"title"/g, '"title"');

  const m = cleaned.match(/\{[\s\S]*\}/);
  if (m) cleaned = m[0];

  return JSON.parse(cleaned);
}

export function normalizeComplexity(obj: any) {
  if (Array.isArray(obj?.tasks)) {
    obj.tasks = obj.tasks.map((t: any) => ({
      title: String(t?.title ?? "").trim(),
      complexity: Math.max(1, Math.min(5, Math.trunc(Number(t?.complexity ?? 1)))),
    }));
  }
  return obj;
}

export async function saveJsonString(jsonObj: object, filePath = process.cwd() + "\\data.json") {
  const pretty = JSON.stringify(jsonObj, null, 2);
  console.log("pretty: ", pretty);
  console.log("filepath:", filePath);
  await writeFile(filePath, pretty, "utf-8");
}
