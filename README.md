# ANIKA - система хранения, обработки и передачи действий клиентов компаний-партнёров

## Содержание

- [ANIKA - система хранения, обработки и передачи действий клиентов компаний-партнёров](#anika---система-хранения-обработки-и-передачи-действий-клиентов-компаний-партнёров)
  - [Содержание](#содержание)
  - [Презентация](#презентация)
  - [О проекте](#о-проекте)
    - [Описание и основные возможности](#описание-и-основные-возможности)
    - [Пример использования ANIKA](#пример-использования-anika)
    - [Преимущества ANIKA](#преимущества-anika)
  - [Архитектура](#архитектура)
    - [Общий обзор](#общий-обзор)
    - [Компоненты системы](#компоненты-системы)
      - [1. Nginx (API Gateway)](#1-nginx-api-gateway)
      - [2. Микросервис авторизации](#2-микросервис-авторизации)
      - [3. Микросервис топиков](#3-микросервис-топиков)
      - [4. Микросервис сообщений](#4-микросервис-сообщений)
    - [Взаимодействие между микросервисами](#взаимодействие-между-микросервисами)
    - [Схема взаимодействия](#схема-взаимодействия)
  
## [Презентация](/Анимулички%20(Презентация).pptx)

## О проекте

### Описание и основные возможности

**Топики для обмена данными**:
Каждая компания-партнер может создать несколько "топиков" - тематических каналов, в которые через API она будет отправлять данные, потенциально полезные для других партнеров. Топики позволяют структурировать данные и упрощают процесс их обмена.

**Контроль доступа**:
Компания, отправляющая данные, может устанавливать список партнеров, которым разрешено просматривать данные из определенного топика. Это обеспечит безопасность и конфиденциальность передаваемой информации.

**Автоматическое получение данных**:
Партнеры, которым разрешен доступ к данным из топика, могут подписаться на автоматическое получение этих данных. Данные будут отправляться на указанный API-endpoint, что позволяет моментально интегрировать их в собственные системы и оперативно реагировать на новые возможности.

### Пример использования ANIKA

**Выбор автомобиля**:
Клиент решил приобрести автомобиль в компании "АвтоЭкспресс". Он посетил автосалон и выбрал подходящую машину.

**Отправка данных**:
"АвтоЭкспресс" отправляет информацию о выборе клиента в топик "Выбор машины" на платформе ANIKA.

**Получение данных**:
Банк "ЭкспоБанк", подписанный на этот топик, мгновенно получает данные на свой API-endpoint. Теперь "ЭкспоБанк" знает, что этот клиент заинтересован в покупке автомобиля и может предложить ему кредит на выгодных условиях.

### Преимущества ANIKA

- **Удобство и эффективность**: Система топиков и автоматическая рассылка данных упрощают обмен информацией между партнерами.
- **Безопасность и конфиденциальность**: Гибкие настройки доступа обеспечивают надежную защиту данных.
- Быстрая интеграция: API-интерфейсы позволяют легко интегрировать полученные данные в существующие системы и приложения.
- **Существенное снижение расходов на лидогенерацию**: ANIKA помогает компаниям уменьшить затраты на привлечение новых клиентов. Благодаря автоматической передаче данных и интеграции с партнерскими системами, компании могут оперативно реагировать на действия клиентов и предлагать им релевантные продукты и услуги. Это снижает необходимость в дорогостоящих маркетинговых кампаниях и рекламных стратегиях, направленных на привлечение новых клиентов, поскольку данные о потенциальных клиентах поступают напрямую от партнеров.

Таким образом, ANIKA решает проблему коммуникации между компаниями-партнерами и дает им возможность быстро привлекать подходящих для них клиентов.

## Архитектура

### Общий обзор

Система состоит из нескольких ключевых компонентов, работающих в связке для обработки запросов пользователей и выполнения необходимых операций. Входящие запросы проходят через API Gateway (Nginx), который проксирует их на соответствующие микросервисы.

### Компоненты системы

#### 1. Nginx (API Gateway)

- **Функция**: Принимает все входящие HTTP-запросы от клиентов и проксирует их в соответствующие микросервисы.
- **Процесс**:
  1. Получает запрос от клиента.
  2. Прокси запрос на микросервис авторизации для проверки подлинности.
  3. Получает user_id и partner_id из микросервиса авторизации.
  4. Добавляет user_id и partner_id в заголовки запроса.
  5. Прокси запрос в нужный микросервис для выполнения операции.

#### 2. Микросервис авторизации

- **Функция**: Проверяет JWT токены и извлекает user_id и partner_id.
- **Технологии**: PostgreSQL для хранения данных о пользователях.
- **Процесс**:
  1. Nginx отправляет запрос с JWT токеном в микросервис авторизации.
  2. Микросервис декодирует и проверяет токен.
  3. Извлекает user_id и partner_id из токена.
  4. Возвращает user_id и partner_id в ответе.
  5. Nginx добавляет эти данные в заголовки запроса и перенаправляет его дальше.

#### 3. Микросервис топиков

- **Функция**: Управляет темами (CRUD операции) и взаимодействует с PostgreSQL.
- **Технологии**: PostgreSQL для хранения данных о темах.
- **Процесс**:
  1. Запросы, связанные с операциями по темам, перенаправляются через Nginx в микросервис топиков.
  2. Микросервис выполняет соответствующую CRUD операцию в базе данных PostgreSQL.
  3. Возвращает результат операции обратно через Nginx к клиенту.

#### 4. Микросервис сообщений

- **Функция**: Обрабатывает сообщения (отправка, поиск) и взаимодействует с MongoDB.
- **Технологии**: MongoDB для хранения сообщений.
- **Процесс**:
  1. Запросы на отправку или поиск сообщений перенаправляются через Nginx в микросервис сообщений.
  2. Микросервис выполняет необходимую операцию с использованием MongoDB.
  3. Для отправки сообщений микросервис сообщений использует вебхуки, полученные через микросервис топиков. Все сообщения отправляются по необходимым ссылкам вебхуков.
  4. Если требуется, микросервис сообщений взаимодействует с микросервисом топиков для получения информации о доступных темах и правах доступа.
  5. Результат операции возвращается клиенту через Nginx.

### Взаимодействие между микросервисами

- **Микросервис сообщений и микросервис топиков**:
  - Микросервис сообщений использует вебхуки, предоставленные микросервисом топиков, для отправки сообщений.
  - Микросервис сообщений может запросить информацию о темах, правах доступа и других данных, связанных с темами, у микросервиса топиков.
  
- **Отсутствие взаимодействия**:
  - Микросервис авторизации изолирован от других микросервисов и не взаимодействует напрямую с микросервисом топиков или микросервисом сообщений.

### Схема взаимодействия

1. **Запросы от клиента**:
   - Клиент → Nginx (API Gateway)
   - Nginx → Микросервис авторизации (проверка JWT токена)
   - Микросервис авторизации → Nginx (response с user_id и partner_id)
   - Nginx → Микросервис топиков или Микросервис сообщений (в зависимости от типа запроса)

2. **Микросервис топиков**:
   - Микросервис топиков → База данных PostgreSQL
   - База данных PostgreSQL → Микросервис топиков (response)
   - Микросервис топиков → Nginx (response)

3. **Микросервис сообщений**:
   - Микросервис сообщений → База данных MongoDB
   - Микросервис сообщений → Микросервис топиков (для получения вебхуков, пермишенов, топиков, если требуется)
   - Микросервис топиков → Микросервис сообщений (вебхуки)
   - Микросервис сообщений → Nginx (response)