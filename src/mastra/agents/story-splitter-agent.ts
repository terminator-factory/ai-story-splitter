import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import fs from 'node:fs';
import path from 'node:path';
import { read, write } from 'pomljs';

// ----- Обработка poml в System Prompt -----
const projectRoot = path.resolve(process.cwd().replace('.mastra\\output', ''));
const pomlPath = path.resolve(projectRoot, 'src\\mastra\\prompt\\story-splitter-prompt.poml');
const pomlFile = fs.readFileSync(pomlPath, 'utf-8');
const renderedPoml = await read(pomlFile);
const instructions = await write(renderedPoml);

// ----- Создание агента -----
export const storySplitter = new Agent({
  name: 'story-splitter',
  instructions: instructions,
  model: 'lmstudio/openai/gpt-oss-20b',
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
});