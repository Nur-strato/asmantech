# Smoke-тесты (Playwright)

Автоматическая проверка, что сайт не сломан: все страницы открываются, нет ошибок в консоли,
нет горизонтальной прокрутки, работают мобильное меню и переключатель языка.

## Первый запуск

```bash
npm install
npx playwright install chromium   # один раз, ~100 МБ
npm run test:e2e
```

`npm run test:e2e` сам делает `next build` и поднимает `next start` на порту **3100**
(не мешает `npm run dev` на 3000). Полный прогон — около минуты плюс время сборки.

## Полезные варианты

```bash
E2E_SKIP_BUILD=1 npm run test:e2e          # не пересобирать (если build уже есть)
npm run test:e2e -- --project=mobile       # только телефон (desktop — только десктоп)
npm run test:e2e -- -g "contacts"          # только тесты с «contacts» в названии
npm run test:e2e -- --ui                   # окно Playwright: видно, что происходит
npx playwright show-trace test-results/<папка>/trace.zip   # разобрать падение
```

## Автоматический запуск на GitHub (CI)

`.github/workflows/e2e.yml` запускает те же тесты на GitHub Actions при каждом пуше в `main`,
в каждом PR и вручную (вкладка **Actions** → **E2E smoke** → **Run workflow**).

- Деплой на Vercel **не блокируется**: если тесты упали, у коммита будет красный крестик
  и придёт письмо, но сайт всё равно выложится. Смотрите на крестик и чините.
- Отчёт о падении: откройте упавший запуск в Actions → внизу артефакт `playwright-report`
  (скачать, распаковать, открыть `playwright-report/index.html`, хранится 7 дней).
- Минуты: один прогон ≈ 4–6 минут из бесплатного лимита GitHub для приватных репозиториев.
  При нескольких пушах подряд старый прогон отменяется, проверяется только последний.

## Что проверяется

Тесты лежат в `e2e/`, настройки — `playwright.config.ts`. Два проекта:
`desktop` (1440×900) и `mobile` (375×812, touch, Chromium).

- `pages.spec.ts` — главная, `/contacts`, `/offers`, `/projects`, `/guarantee`, `/solutions`
  и все подстраницы solutions на локалях `ru` (без префикса), `en`, `kg`: статус 200,
  нет ошибок в консоли, `scrollWidth <= innerWidth`.
- `navigation.spec.ts` — мобильное меню (кнопка с `aria-controls` → `aria-expanded="true"`,
  меню видно); переключатель языка меняет префикс URL (`/contacts` → `/en/contacts` и т. д.).
- `fonts.spec.ts` — Onest / Source Serif 4 / JetBrains Mono реально загружены в `document.fonts`.
  **Пока пропускается**: ветка дизайн-системы ещё не в main. Включится сама, как только
  в `src/app/fonts.ts` (или layout/globals.css) появится Onest.

Форма заявки в тестах не отправляется: любые запросы на `/api/leads` перехватываются
(`page.route` в `e2e/fixtures.ts`) и получают фиктивный ответ.

## Добавили страницу или язык

Список страниц и локалей — в начале `e2e/fixtures.ts` (`PAGES`, `LOCALES`).
Локали должны совпадать с `src/i18n/routing.ts`.

## Известные баги (тесты их пока терпят)

Описаны в `e2e/fixtures.ts`. После исправления удалите соответствующую запись:

1. **`/projects` ссылается на несуществующие страницы** `/projects/punto-pago`, `/lumiere`,
   `/aurora`, `/zenith`, `/strato`, `/kura` — 404 при prefetch (`KNOWN_CONSOLE_ERRORS`).
2. **Горизонтальная прокрутка на `/kg/solutions/additional/admin-panel` (десктоп)** —
   «0 мүнөт» шрифтом `text-8xl` не влезает в колонку (`KNOWN_OVERFLOW`). Тест помечен как
   ожидаемо падающий: когда баг починят, Playwright сообщит «expected to fail, but passed» —
   значит, запись пора убрать.
