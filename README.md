# Installation

```bash
$ npm install
```

# Running the app

Config file path: `./src/config.ts`. 
There you can set up Mongo URI (field `mongoURI`; default: `mongodb://localhost:27018`) and application port (field `port`; default: `3000`).
Also, you can configure used database (field `mongoDatabase`) and collection (`quizzesCollection`).

## Local

Backend URL: `http://localhost:3000`

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# create build
$ npm run build

# production mode
$ npm run start:prod
```

## Docker

Backend URL: `http://localhost:80`<br />
Mongo URL: `http://localhost:27018`

```bash
$ docker compose up
```

# API methods

## Create quiz

Method: `POST /quizzes`

Request body:
```typescript
{
  name: string;
  description: string;
  questions: {
    text: string;
    options: {
      id: number;
      text: string;
    }[];
    answer: number;
  }[];
}
```

Response body:
```typescript
{
  id: string;
}
```

### Example:

`POST http://localhost:3000/quizzes`

Request body:
```json
{
  "name": "Test quiz name",
  "description": "Test quiz description",
  "questions": [
    {
      "text": "Question 1",
      "options": [
        {
          "id": 1,
          "text": "Option 1"
        },
        {
          "id": 2,
          "text": "Option 2"
        }
      ],
      "answer": 1
    },
    {
      "text": "Question 2",
      "options": [
        {
          "id": 1,
          "text": "Option 1"
        },
        {
          "id": 2,
          "text": "Option 2"
        }
      ],
      "answer": 2
    }
  ]
}
```

Response body:
```json
{
  "id": "64162f3e4ad1038b41c39cc7"
}
```

## Get one quiz

Method: `/quizzes/QUIZ_ID`

Response body:
```typescript
{
  id: string;
  name: string;
  description: string;
  questions: {
    text: string;
    options: {
      id: number;
      text: string;
    }[];
    answer: number;
  }[];
}
```

### Example:

`GET http://localhost:3000/quizzes/64162b0ad366dddcca73aeeb`

Response body:
```json
{
  "id": "64162b0ad366dddcca73aeeb",
  "name": "Test quiz name",
  "description": "Test quiz description",
  "questions": [
    {
      "text": "Question 1",
      "answer": 1,
      "options": [
        {
          "id": 1,
          "text": "Option 1"
        },
        {
          "id": 2,
          "text": "Option 2"
        }
      ]
    },
    {
      "text": "Question 2",
      "answer": 2,
      "options": [
        {
          "id": 1,
          "text": "Option 1"
        },
        {
          "id": 2,
          "text": "Option 2"
        }
      ]
    }
  ]
}
```

## Get all quizzes

Method: `/quizzes`

Response body:
```typescript
{
  id: string;
  name: string;
  description: string;
}[];
```

### Example:

`GET http://localhost:3000/quizzes`

Response body:
```json
[
  {
    "id": "64162b0ad366dddcca73aeeb",
    "name": "Test quiz name",
    "description": "Test quiz description"
  },
  {
    "id": "64162b7fd53cfaf5f8f0d5d9",
    "name": "Test quiz name",
    "description": "Test quiz description"
  },
  {
    "id": "64162ba1ca39e4c097c92926",
    "name": "Test quiz name",
    "description": "Test quiz description"
  },
  {
    "id": "64162bc6f87148884b551b7f",
    "name": "Test quiz name",
    "description": "Test quiz description"
  },
  {
    "id": "64162f3e4ad1038b41c39cc7",
    "name": "Test quiz name",
    "description": "Test quiz description"
  },
  {
    "id": "641630ddf45e91ce95772157",
    "name": "Test quiz name",
    "description": "Test quiz description"
  }
]
```

# Stay in touch

- Author - [Befezdow](https://github.com/Befezdow)
