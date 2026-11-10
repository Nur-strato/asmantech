# Telegram-бот Asman Tech (AI-консультант)

Бот отвечает клиентам на вопросы об услугах Asman Tech по текстам сайта (`src/data/services.ts`), собирает заявку (имя, телефон, услуга, задача, способ связи) и отправляет её в `/api/leads` — заявка появляется в `/admin` рядом с заявками из формы на сайте.

## Как устроено

| Файл | Что делает |
|---|---|
| `src/app/api/telegram/webhook/route.ts` | Вебхук: проверяет секрет, сразу отвечает Telegram 200, генерирует ответ в фоне (`after()`) |
| `src/lib/chatbot/agent.ts` | Вызов Claude (`claude-opus-5-5`, effort `low`), инструмент `submit_lead`, история диалога |
| `src/lib/chatbot/knowledge.ts` | Системный промпт и база знаний из `SERVICES` + контакты компании |
| `src/lib/chatbot/leads.ts` | POST в `/api/leads`, текст уведомления для менеджеров |
| `src/lib/chatbot/telegram.ts` | `sendMessage` / `sendChatAction` через Bot API |

Команды в боте: `/start` и `/reset` — начать диалог заново.

## 1. Создать бота

1. В Telegram откройте @BotFather → `/newbot` → задайте имя и username.
2. Скопируйте токен. **Никому не пересылайте его и не коммитьте** — только в переменные окружения.
3. По желанию: `/setdescription`, `/setuserpic`, `/setcommands` → `start - Начать диалог`.

## 2. Переменные окружения в Vercel

Vercel → проект → **Settings → Environment Variables** (окружение *Production*; для превью — по желанию):

| Переменная | Обязательно | Значение |
|---|---|---|
| `ANTHROPIC_API_KEY` | да | ключ из console.anthropic.com → API Keys |
| `TELEGRAM_BOT_TOKEN` | да | токен от @BotFather |
| `TELEGRAM_WEBHOOK_SECRET` | да | случайная строка, например результат `openssl rand -hex 32` |
| `TELEGRAM_ADMIN_CHAT_ID` | нет | ID чата менеджеров — бот продублирует туда каждую заявку |
| `CHATBOT_MODEL` | нет | другая модель Claude, по умолчанию `claude-opus-5-5` |
| `LEADS_API_URL` | нет | URL роута заявок, если он не на том же домене |

После добавления переменных сделайте **Redeploy** (переменные подхватываются только новым деплоем).

> Проект на аккаунте соучредителя — переменные добавляет тот, у кого есть доступ к Settings проекта.

## 3. Поставить вебхук

Выполните у себя в терминале (подставьте значения из шага 2; `asmantech.kg` замените на production-домен, если он другой):

```bash
curl -s "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -d "url=https://asmantech.kg/api/telegram/webhook" \
  -d "secret_token=<TELEGRAM_WEBHOOK_SECRET>" \
  -d "allowed_updates=[\"message\"]" \
  -d "drop_pending_updates=true"
```

Ответ должен быть `{"ok":true,"result":true,"description":"Webhook was set"}`.

Проверить состояние:

```bash
curl -s "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getWebhookInfo"
```

Поле `last_error_message` покажет, если Vercel отвечает ошибкой (например, `401` — не совпал `TELEGRAM_WEBHOOK_SECRET`).

Вебхук должен смотреть на **production**-домен: превью-деплои Vercel обычно закрыты Deployment Protection, и Telegram получит 401.

## 4. ID чата менеджеров (необязательно)

1. Создайте группу, добавьте туда бота.
2. Временно снимите вебхук (`deleteWebhook`), напишите в группу любое сообщение и откройте `https://api.telegram.org/bot<TOKEN>/getUpdates` — `chat.id` группы (отрицательное число) и есть `TELEGRAM_ADMIN_CHAT_ID`.
3. Поставьте вебхук обратно (шаг 3).

Бот в группах на сообщения не отвечает — только присылает туда заявки.

## Локальная проверка

```bash
cp .env.example .env.local   # заполнить значения
npm run dev
```

Telegram не достучится до `localhost`; для полной проверки нужен туннель (например, `ngrok http 3000`) и `setWebhook` на его адрес. Не забудьте вернуть вебхук на production.

## Известные ограничения MVP

- **История диалога хранится в памяти функции.** При холодном старте или переключении на другой инстанс Vercel бот может «забыть» начало разговора. Следующий шаг — хранить историю в Postgres (Neon) вместе с заявками.
- **`/api/leads` в main хранит заявки в памяти** и теряет их при перезапуске. Пока ветка `fix/leads-storage` (Postgres) не влита, задайте `TELEGRAM_ADMIN_CHAT_ID` — тогда каждая заявка гарантированно придёт менеджерам в Telegram.
- Бот понимает только текст (без голосовых, фото, файлов).
- WhatsApp пока не подключён: понадобится Meta WhatsApp Business Cloud API, верифицированный бизнес-аккаунт и номер. Логику (`agent.ts`, `knowledge.ts`, `leads.ts`) можно переиспользовать, нужен только второй вебхук.
