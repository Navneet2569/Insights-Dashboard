# Insights Dashboard

Monorepo for the Insights Dashboard project: a React frontend and a Spring Boot + Kafka backend.

## Repository layout

| Path | Description |
|------|-------------|
| [`landing-page/`](landing-page/) | React (Create React App) frontend |
| [`ProducerConsumer/`](ProducerConsumer/) | Spring Boot producer/consumer API |

## Prerequisites

- **Frontend:** Node.js 18+ and npm
- **Backend:** JDK 21+, Gradle (wrapper included), Kafka reachable at the host configured in `ProducerConsumer/app/src/main/resources/application.properties`

## Run locally

### Frontend

```bash
cd landing-page
npm install
npm start
```

App: [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd ProducerConsumer
./gradlew bootRun
```

On Windows:

```bash
cd ProducerConsumer
gradlew.bat bootRun
```

Configure Kafka and CORS via environment variables or `application.properties` (see backend resources).

## Remote

GitHub: [Navneet2569/Insights-Dashboard](https://github.com/Navneet2569/Insights-Dashboard)
