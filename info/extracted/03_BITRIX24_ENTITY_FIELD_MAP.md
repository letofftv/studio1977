# Карта сущностей и полей для Bitrix24

## 1. Задача интеграции

Bitrix24 используется как CRM-слой и операционный центр лидов, контактов, компаний, сделок, задач и части документов.
Сайт не дублирует CRM один в один, а хранит только то, что нужно для кабинетов, web-app логики, истории действий и кастомного UX.

## 2. Основные сущности Bitrix24

### Базовые CRM-сущности
- Lead
- Contact
- Company
- Deal

### Дополнительные рабочие сущности
- Activity
- Task
- Timeline comment / activity
- Files / Disk items
- User fields
- Smart Process Entity, если потребуется отдельный тип сущности под проекты

## 3. Рекомендуемая рабочая модель

### Вариант A. Проект = Deal + сайтовая Project entity
Подходит для старта.

Логика:
- лиды с сайта попадают в Lead
- после квалификации создаются Contact + Company + Deal
- на сайте создается Project
- Project хранит ссылку на `bitrix_deal_id`, `bitrix_contact_id`, `bitrix_company_id`
- внутри сайта ведется кастомная логика кабинета

Плюсы:
- быстро стартовать
- проще обучение команды
- не надо сразу усложнять Bitrix24

Минусы:
- проектные данные частично живут вне CRM

### Вариант B. Проект = Smart Process в Bitrix24 + сайтовая оболочка
Подходит для второго этапа, когда потребуется более глубокая кастомизация CRM.

## 4. Обязательные связки

### Lead
Используется для:
- первичной заявки
- краткого контакта
- входящего брифа
- запроса консультации

### Contact
Используется для конкретного человека со стороны клиента.

### Company
Используется для организации клиента.

### Deal
Используется как коммерческая и частично проектная единица:
- статус продажи
- сумма
- направление сделки
- менеджер
- источник
- важные комментарии и активити

## 5. Карта полей сайта -> Bitrix24

## 5.1 Короткая заявка

| Поле сайта | Тип | Куда в Bitrix24 | Комментарий |
|---|---|---|---|
| name | string | Lead.TITLE / NAME | Имя контакта |
| phone | string | Lead.PHONE | Основной телефон |
| email | string | Lead.EMAIL | Email |
| company_name | string | Lead.COMPANY_TITLE | Компания |
| service_direction | enum | UF_CRM_SERVICE_DIRECTION | Кастомное поле |
| comment | text | Lead.COMMENTS | Комментарий заявки |
| source_page | string | UF_CRM_SOURCE_PAGE | Откуда отправлено |
| utm_source | string | UTM / custom field | Источник |
| utm_medium | string | UTM / custom field | Канал |
| utm_campaign | string | UTM / custom field | Кампания |
| utm_content | string | UTM / custom field | Контент |
| referrer | string | UF_CRM_REFERRER | Реферер |
| consent_personal | bool | UF_CRM_CONSENT_PERSONAL | Согласие |
| created_at | datetime | системное + custom | Время отправки |

## 5.2 Расширенный бриф

| Поле сайта | Куда в Bitrix24 | Примечание |
|---|---|---|
| brief_type | Lead / Deal user field | Тип брифа |
| project_goal | COMMENTS или UF | Лучше отдельное поле |
| target_audience | UF | Описание ЦА |
| geography | UF | Регион проекта |
| desired_deadline | UF | Желаемый срок |
| budget_range | UF | Вилка бюджета |
| references_json | UF / file link | Ссылки на референсы |
| attachment_count | UF | Число файлов |
| requested_services | multi UF | Набор услуг |
| communication_preference | UF | Предпочтительный канал |

## 5.3 Проект сайта -> Deal

| Сайт Project | Bitrix24 Deal | Комментарий |
|---|---|---|
| title | TITLE | Название проекта |
| direction | CATEGORY / UF | Направление |
| client_company_id | COMPANY_ID | Компания |
| client_contact_ids | CONTACT_IDS | Контакты |
| manager_id | ASSIGNED_BY_ID | Ответственный |
| estimated_budget | OPPORTUNITY | Бюджет |
| start_date | BEGINDATE / UF | Дата старта |
| planned_deadline | CLOSEDATE / UF | Дедлайн |
| stage_code | STAGE_ID | Стадия |
| source | SOURCE_ID / UF | Источник |
| site_project_id | UF_CRM_SITE_PROJECT_ID | Обратная связь с сайтом |
| client_portal_status | UF_CRM_PORTAL_STATUS | Статус для кабинета |

## 6. Рекомендуемые кастомные поля в Bitrix24

## Для Lead / Deal
- `UF_CRM_SITE_PROJECT_ID`
- `UF_CRM_SERVICE_DIRECTION`
- `UF_CRM_SOURCE_PAGE`
- `UF_CRM_REFERRER`
- `UF_CRM_CONSENT_PERSONAL`
- `UF_CRM_BRIEF_TYPE`
- `UF_CRM_BUDGET_RANGE`
- `UF_CRM_DESIRED_DEADLINE`
- `UF_CRM_CLIENT_PORTAL_STATUS`
- `UF_CRM_PORTAL_LINK`
- `UF_CRM_PROJECT_FORMAT`
- `UF_CRM_PRIORITY`
- `UF_CRM_NEXT_ACTION_DATE`

## Для Contact
- `UF_CRM_PORTAL_ROLE`
- `UF_CRM_PORTAL_USER_ID`
- `UF_CRM_PREFERRED_CONTACT`
- `UF_CRM_JOB_TITLE_ALT` при необходимости

## Для Company
- `UF_CRM_PORTAL_ACCOUNT_ID`
- `UF_CRM_CLIENT_SEGMENT`
- `UF_CRM_CONTRACT_STATUS`

## 7. Стадии сделки

Нужно разделить воронку продажи и проектную воронку.

### Продажная воронка
1. new_request
2. qualification
3. briefing
4. proposal
5. negotiation
6. won
7. lost

### Проектная воронка
1. onboarding
2. discovery
3. concept
4. production
5. approval
6. delivery
7. support
8. completed
9. archived

Лучший вариант:
- либо отдельные категории сделок
- либо Smart Process для проектной части

## 8. События обмена

## С сайта в Bitrix24
- создание лида
- обновление контактных данных
- конвертация в проект
- новые комментарии клиента
- согласование этапа
- загрузка клиентского файла
- смена видимого клиенту статуса

## Из Bitrix24 на сайт
- обновление ответственного менеджера
- смена стадии сделки
- изменение компании / контакта
- создание задачи или активности, если они должны влиять на кабинет
- изменение суммы / коммерческого статуса
- системные комментарии, если включен обмен комментариями

## 9. Рекомендуемая стратегия синхронизации

### 9.1 Не делать двустороннюю синхронизацию всего подряд
Хранить master-of-truth по зонам:
- лиды и продажи: Bitrix24
- кабинет, UI, файлы сайта, кастомные статусы кабинета: сайт
- связующие ключи и журнал обмена: сайт

### 9.2 Механика
- создание и обновление через REST API
- реакция на изменения через исходящие вебхуки и `event.bind`
- очередь задач на синхронизацию
- retry при временной ошибке
- idempotency key для повторных запросов

## 10. Что отдать интегратору Bitrix24

- список всех кастомных полей
- соответствие страниц сайта и CRM сущностей
- список стадий
- список обработчиков событий
- список ролей и кто что может менять
