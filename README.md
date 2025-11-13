# AI Story Splitter (Mastra)

Прототип утилиты, которая принимает **user story / длинное описание фичи** и делит его на набор **подзадач**.  
Результат — **строго стандартизированный JSON**:

```json
{
  "epic": "Authentication",
  "tasks": [
    { "title": "Добавить форму входа", "complexity": 2 },
    { "title": "Реализовать валидацию пароля", "complexity": 1 }
  ]
}
```

Проект протестирвоан на локальной модели openai/gpt-oss-20b.<br>
Промтпы которые использовались для тестов сохранены в файле user-prompts.txt в папке src\mastra\prompt\ проекта.

# Стек

- Mastra AI (агенты/воркфлоу)
- TypeScript
- POML (структурированный промпт)

# Требования

- Node.js 20+
- npm 9+
- Доступ к LLM (локально или в облаке)
- Mastra
- pomljs (npm install pomljs)

# Запуск дев-сервера

- Что бы протестить у себя, надо добавить .env файл с токеном для своей любимой llm (Например: OPENAI_API_KEY=ваш_токен).
- В файле story-splitter-agent, в создании агента, в поле model вбить название нужной модели (Например: "openai/gpt-4o-mini").

Потом:

```bash
npm run dev
```
- Откройте Playground: http://localhost:4111/
- Перейдите на вкладку Agents, выберите агента story-splitter и отправьте промпт в чате.
- Если нужен файл на диске (JSON), откройте вкладку Workflows, выберите json-workflow и передайте промпт в поле User Prompt. По завершении генерации в поле Status будет отображён сформированный JSON, а также вы можете найти файл по пути .mastra\output\data.json.
