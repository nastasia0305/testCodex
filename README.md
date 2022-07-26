# Codex

## backend

В файле `testCodex/backend/db/config/config.json` находится параметры подключения к базе данных.

Для запуска сервера:

```
cd ./testCodex/backend
npm i
npm start
```

## frontend

Для запуска приложения:

```
cd ./testCodex/frontend
npm i
npm start
```

## API

GET /artist
GET /song
Получение всех артистов или песен.
Возможно сортировка и фильтрация через указание query параметров, также возможна выборка определённого лимита и смещения по нему.
```
where: {"field":"fullname","search":"Лиса"}
order: {"field":"fullname","direction":"DESC"}
offset: 10
limit: 10
```

GET /artist/:id
GET /song/:id
Получение конкретного артиста или песни по его ID.

POST /artist
POST /song
Создание артиста или песни.
Принимает в параметрах тела запроса объект с нужными полями для создания.
Пример:
```
{
  fullname: 'Виктор Цой',
  description: 'Рок'
}
```

PUT /artist/:id
PUT /song/:id
Обновление артиста или песни.

DELETE /artist/:id
DELETE /song/:id
Удаление артиста и всех песен принадлежащих ему.
