# Приклади до курсу NestJS

Репозиторій містить код до 15-темного курсу з NestJS для студентів третього курсу бакалаврату. Приклади охоплюють TypeScript, будову NestJS-застосунку, роботу з PostgreSQL і MongoDB, автентифікацію та основи GraphQL.

Кожна папка `topic-NN` зберігає стан коду на кінець відповідної теми. Це набір незалежних навчальних проєктів, а не монорепозиторій: залежності потрібно встановлювати в папці конкретного прикладу.

## Стек

- NestJS 11, TypeScript, Express 5;
- PostgreSQL, TypeORM і міграції;
- MongoDB та Mongoose;
- Redis для кешування і серверних сесій;
- Swagger UI, Jest і Supertest;
- Apollo Server та GraphQL;
- Docker Compose для локального запуску баз даних.

## Карта репозиторію

| Тема | Код | Зміст |
| --- | --- | --- |
| 1. Основи TypeScript та вступ у NestJS | [`topic-01/my-app`](topic-01/my-app) | TypeScript, декоратори, структура NestJS-застосунку, ресурс `orders` |
| 2. Контролери, маршрутизація, валідація та сервіси | [`topic-02/tasks-api`](topic-02/tasks-api) | REST-контролери, DTO, pipes, Swagger, сховище в пам'яті |
| 3. Провайдери та Dependency Injection | [`topic-03/tasks-api`](topic-03/tasks-api) | DI-контейнер, токени провайдерів, фабрики та scopes |
| 4. Модулі та організація коду | [`topic-04/tasks-api`](topic-04/tasks-api) | Модулі, інкапсуляція, dynamic modules і `forwardRef` |
| 5. Конфігурація та обробка помилок | [`topic-05/tasks-api`](topic-05/tasks-api) | `ConfigModule`, перевірка змінних оточення, exception filters і логування |
| 6. PostgreSQL + TypeORM, частина 1 | [`topic-06/tasks-api`](topic-06/tasks-api) | PostgreSQL, entities, repositories, CRUD і міграції |
| 7. TypeORM, частина 2 | [`topic-07/tasks-api`](topic-07/tasks-api) | Зв'язки між сутностями, пагінація, фільтрація та Query Builder |
| 8. MongoDB + Mongoose | [`topic-08/mongoose-playground`](topic-08/mongoose-playground), [`topic-08/tasks-api-mongo`](topic-08/tasks-api-mongo) | Окремі скрипти Mongoose та повний NestJS API на MongoDB |
| 9. Практичні можливості NestJS | [`topic-09`](topic-09) | Завантаження файлів, SSE, планувальник і кешування в Redis |
| 10. Життєвий цикл запиту | [`topic-10`](topic-10) | Окремі приклади pipes, middleware, guards та interceptors |
| 11. Автентифікація та контроль доступу | [`topic-11/session-auth`](topic-11/session-auth), [`topic-11/task-api`](topic-11/task-api) | Сесії в Redis, JWT, refresh tokens, ролі та перевірка власника ресурсу |
| 12. OAuth 2.0 та Google автентифікація | — | Теорія в конспекті; реалізація виконується на практичному занятті |
| 13. Тестування | — | Теорія в конспекті; тести до `tasks-api` пишуться на практичному занятті |
| 14. Основи GraphQL | [`topic-14/graphql-intro`](topic-14/graphql-intro) | GraphQL-сервер на Express 5 та Apollo Server |
| 15. GraphQL у NestJS | — | Перенесення `tasks-api` на GraphQL виконується на практичному занятті |

У темі 9 механізми рознесено по папках `01-upload`, `02-sse-express`, `02-sse-nest`, `03-scheduling` і `04-caching`. У темі 10 кожен етап життєвого циклу також має власний мінімальний проєкт.

Наскрізний `tasks-api` розвивається в темах 2–7 та 11. Кожна його копія є завершеним знімком після відповідної теми, тому переходити між ними слід через папки тем, а не через гілки Git.

## Що потрібно для запуску

- Node.js 20 або новіший;
- npm;
- Docker Desktop із Docker Compose для прикладів із PostgreSQL, MongoDB або Redis;
- за бажанням: розширення REST Client для VS Code, DBeaver і MongoDB Compass.

## Швидкий старт

Виберіть потрібний проєкт, перейдіть до його папки та встановіть залежності. Наприклад, для теми 2:

```shell
cd topic-02/tasks-api
npm ci
npm run start:dev
```

За замовчуванням застосунок доступний на `http://localhost:3000`. У проєктах зі Swagger документація відкривається за адресою `http://localhost:3000/docs`.

### Приклади з базами даних

У папках із файлом `.env.example` перевірте значення змінних оточення. Якщо `.env` відсутній, створіть його як копію `.env.example`.

Після цього запустіть інфраструктуру та застосунок:

```shell
docker compose up -d
npm ci
npm run start:dev
```

Для PostgreSQL-проєктів із TypeORM перед запуском застосунку виконайте міграції:

```shell
npm run migration:run
```

Docker Compose піднімає тільки потрібні сховища даних. NestJS-застосунок запускається локально через npm.

### Mongoose playground

`topic-08/mongoose-playground` містить окремі ESM-скрипти. Після запуску MongoDB і встановлення залежностей виконуйте потрібний файл напряму, наприклад:

```shell
cd topic-08/mongoose-playground
npm ci
node create.js
```

### GraphQL

Приклад теми 14 написаний на JavaScript без NestJS. Запустіть сервер так:

```shell
cd topic-14/graphql-intro
npm ci
node src/server.js
```

GraphQL endpoint і Apollo Sandbox доступні на `http://localhost:3000/graphql`.

## Корисні npm-команди

Більшість NestJS-проєктів підтримує однакові команди:

| Команда | Призначення |
| --- | --- |
| `npm run start:dev` | запуск у режимі розробки з автоматичним перезапуском |
| `npm run build` | компіляція проєкту |
| `npm run lint` | перевірка коду ESLint |
| `npm test` | модульні тести |
| `npm run test:e2e` | end-to-end тести |
| `npm run test:cov` | тести зі звітом про покриття |

Точний набір скриптів дивіться у `package.json` вибраного проєкту. Більшість прикладів використовує порт `3000`, тому кілька застосунків одночасно потребуватимуть зміни порту.

## Ліцензія

Матеріали репозиторію поширюються за ліцензією [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](LICENSE.md).
