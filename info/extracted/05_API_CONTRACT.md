# API-контракт сайта

## 1. Общие правила

- Все закрытые методы работают только по авторизации
- Ответы в JSON
- Версионирование через `/api/v1`
- Все write-операции логируются
- Для файлов использовать отдельный upload flow
- Для синхронизации с Bitrix24 использовать внутренние сервисные маршруты, недоступные обычному пользователю

## 2. Аутентификация

### POST `/api/v1/auth/login`
Вход по email и паролю или старт magic-link сценария.

Request:
```json
{
  "email": "client@example.com",
  "password": "secret"
}
```

Response:
```json
{
  "accessToken": "jwt",
  "refreshToken": "jwt",
  "user": {
    "id": "uuid",
    "role": "client_owner"
  }
}
```

### POST `/api/v1/auth/magic-link/request`
```json
{
  "email": "client@example.com"
}
```

### POST `/api/v1/auth/magic-link/confirm`
```json
{
  "token": "one_time_token"
}
```

### POST `/api/v1/auth/logout`

### GET `/api/v1/auth/me`

## 3. Публичные методы

### POST `/api/v1/public/leads`
Создание короткой заявки.

```json
{
  "name": "Иван",
  "phone": "+7...",
  "email": "mail@example.com",
  "companyName": "ООО Пример",
  "serviceDirection": "marketing",
  "comment": "Нужен запуск проекта",
  "sourcePage": "/services/marketing",
  "utm": {
    "source": "yandex",
    "medium": "cpc",
    "campaign": "studio_1977"
  },
  "consentPersonal": true
}
```

Response:
```json
{
  "status": "ok",
  "leadId": "uuid",
  "bitrixLeadId": 1234
}
```

### POST `/api/v1/public/briefs`
Создание расширенного брифа.

### GET `/api/v1/public/services`
### GET `/api/v1/public/services/{slug}`
### GET `/api/v1/public/cases`
### GET `/api/v1/public/cases/{slug}`
### GET `/api/v1/public/articles`
### GET `/api/v1/public/articles/{slug}`

## 4. Клиентский кабинет

### GET `/api/v1/app/dashboard`
Возвращает summary:
```json
{
  "projects": [],
  "pendingApprovals": 2,
  "unreadNotifications": 5,
  "recentFiles": []
}
```

### GET `/api/v1/app/projects`
Фильтр:
- status
- direction
- search

### GET `/api/v1/app/projects/{projectId}`
Response:
```json
{
  "id": "uuid",
  "title": "Запуск бренда",
  "status": "active",
  "stageCode": "concept",
  "manager": {
    "id": "uuid",
    "name": "Сергей"
  },
  "timeline": [],
  "tabs": {
    "filesCount": 12,
    "commentsCount": 4,
    "approvalsCount": 1,
    "documentsCount": 3
  }
}
```

### GET `/api/v1/app/projects/{projectId}/timeline`
### GET `/api/v1/app/projects/{projectId}/files`
### POST `/api/v1/app/projects/{projectId}/files/init`
Создает upload-session и presigned URL.

### POST `/api/v1/app/projects/{projectId}/files/complete`
```json
{
  "uploadId": "uuid",
  "originalName": "brief.pdf",
  "mimeType": "application/pdf",
  "sizeBytes": 102400,
  "category": "references",
  "isClientVisible": true
}
```

### GET `/api/v1/app/projects/{projectId}/comments`
### POST `/api/v1/app/projects/{projectId}/comments`
```json
{
  "body": "Посмотрите, пожалуйста, обновленный вариант",
  "parentId": null,
  "relatedStageId": "uuid"
}
```

### GET `/api/v1/app/projects/{projectId}/approvals`
### POST `/api/v1/app/projects/{projectId}/approvals/{approvalId}/decision`
```json
{
  "decision": "approved",
  "comment": "Подходит, двигаемся дальше"
}
```

### GET `/api/v1/app/projects/{projectId}/documents`
### GET `/api/v1/app/notifications`
### POST `/api/v1/app/notifications/read`
### GET `/api/v1/app/profile`
### PATCH `/api/v1/app/profile`

## 5. Внутренний кабинет команды

### GET `/api/v1/studio/dashboard`
### GET `/api/v1/studio/projects`
### POST `/api/v1/studio/projects`
```json
{
  "accountId": "uuid",
  "title": "Новый проект",
  "direction": "event",
  "managerUserId": "uuid",
  "bitrixDealId": 4567
}
```

### GET `/api/v1/studio/projects/{projectId}`
### PATCH `/api/v1/studio/projects/{projectId}`
### POST `/api/v1/studio/projects/{projectId}/members`
### PATCH `/api/v1/studio/projects/{projectId}/stage`
```json
{
  "stageCode": "production",
  "clientVisible": true,
  "comment": "Переходим к продакшену",
  "notifyClient": true
}
```

### POST `/api/v1/studio/projects/{projectId}/approvals`
```json
{
  "title": "Согласование концепции",
  "description": "Нужно подтвердить вариант A",
  "stageId": "uuid"
}
```

### GET `/api/v1/studio/leads`
### POST `/api/v1/studio/leads/{leadId}/convert`
### GET `/api/v1/studio/clients`
### GET `/api/v1/studio/audit`
### GET `/api/v1/studio/integrations/bitrix/status`
### POST `/api/v1/studio/integrations/bitrix/resync`
### GET `/api/v1/studio/integrations/bitrix/log`

## 6. Сервисные интеграционные методы

### POST `/api/v1/system/bitrix/webhook`
Принимает исходящие вебхуки от Bitrix24.
Доступ:
- только по IP allowlist или подписи запроса
- с проверкой application token / секретного ключа

### POST `/api/v1/system/bitrix/sync/outbound`
Внутренний запуск обмена из очереди.

### POST `/api/v1/system/bitrix/sync/inbound/rebuild`
Ручная пересборка связей по сущности.

## 7. Коды ошибок

```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Недостаточно прав"
  }
}
```

Базовые коды:
- UNAUTHORIZED
- FORBIDDEN
- VALIDATION_ERROR
- NOT_FOUND
- CONFLICT
- FILE_TOO_LARGE
- SYNC_FAILED
- RATE_LIMITED
- INTERNAL_ERROR

## 8. Правила безопасности

- JWT короткоживущий, refresh-token отдельный
- rate limit на публичные формы
- captcha или невидимая антибот-защита
- audit log для всех критичных действий
- download URL на файлы не публичный и с TTL
- проверка ролей на каждом маршруте

## 9. OpenAPI минимум, который нужно выписать отдельно

Для команды желательно после утверждения этого файла сделать еще и:
- swagger / openapi yaml
- список enum
- json schema на публичные формы
