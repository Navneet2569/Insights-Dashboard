# Insights Dashboard

A full-stack demo for tracking user interactions on a marketing landing page. The **React** frontend sends enrollment clicks to a **Spring Boot** API, which publishes events to **Apache Kafka**. The same service consumes those messages and exposes **Actuator** / **Prometheus** metrics for observability.

## Repository layout

| Path | Stack | Role |
|------|--------|------|
| [`landing-page/`](landing-page/) | React (Create React App) | Landing page UI; POSTs click events to the backend |
| [`ProducerConsumer/`](ProducerConsumer/) | Java 21, Spring Boot, Spring Kafka | REST producer, Kafka consumer, metrics |

## How it works

1. You open the frontend at **http://localhost:3000**.
2. Clicking **Request syllabus**, **Enroll**, or similar buttons calls `POST http://localhost:8080/producer/event` with a JSON body (for example `{"event":"userClick"}`).
3. The backend accepts the request, publishes the payload to the configured Kafka topic, and returns **202 Accepted**.
4. A `@KafkaListener` in the same app reads from that topic, logs the event, and increments the `kafka.events.received` metric.

For local development, the backend must reach a Kafka broker. By default it uses the bootstrap server in `ProducerConsumer/app/src/main/resources/application.properties` (overridable with `KAFKA_BOOTSTRAP_SERVERS`).

## Prerequisites

Install these before you run anything:

| Tool | Version | Used for |
|------|---------|----------|
| [Node.js](https://nodejs.org/) | 18 or newer | Frontend (`npm`) |
| [JDK](https://adoptium.net/) | **21** (required by the Gradle toolchain) | Backend |
| Kafka | Broker reachable from your machine | Event pipeline |

You do **not** need a global Gradle install; use the wrapper in `ProducerConsumer` (`gradlew` / `gradlew.bat`).

Optional: [Docker](https://www.docker.com/) if you prefer running Kafka locally instead of the default remote broker.

## Run the project (recommended order)

Run the **backend first**, then the **frontend**, so API and CORS are ready when you open the site.

### 1. Start the backend

From the repository root:

**Windows (PowerShell or Command Prompt):**

```powershell
cd ProducerConsumer
.\gradlew.bat bootRun
```

**macOS / Linux:**

```bash
cd ProducerConsumer
./gradlew bootRun
```

Wait until the log shows Spring Boot has started (default API port **8080**).

**Quick checks:**

- Health: [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health)
- Prometheus metrics: [http://localhost:8080/actuator/prometheus](http://localhost:8080/actuator/prometheus)

**Run backend tests:**

```powershell
cd ProducerConsumer
.\gradlew.bat test
```

```bash
cd ProducerConsumer
./gradlew test
```

### 2. Start the frontend

In a **second terminal**, from the repository root:

```bash
cd landing-page
npm install
npm start
```

The dev server opens **http://localhost:3000** (CRA default). Keep this terminal running while you develop.

### 3. Try the full flow

1. Open [http://localhost:3000](http://localhost:3000).
2. Click an enroll / syllabus button on the page.
3. Confirm the UI shows a success message (or an error if the API or Kafka is unavailable).
4. In the **backend terminal**, look for log lines from the producer and consumer (`Message sent to Kafka`, `Received event: ...`).

## Configuration

Defaults live in `ProducerConsumer/app/src/main/resources/application.properties`. You can override many settings with environment variables or a local edit (do not commit secrets).

| Setting | Property | Default | Notes |
|---------|----------|---------|--------|
| Kafka brokers | `KAFKA_BOOTSTRAP_SERVERS` | `13.127.99.104:9092` | Must be reachable from your PC |
| Kafka topic | `app.kafka.topic` | `testy` | Producer and consumer both use this topic |
| CORS (frontend origin) | `app.cors.allowed-origin` | `http://localhost:3000` | Must match where React runs |
| API port | `server.port` | `8080` | Frontend is hard-coded to `localhost:8080` in `landing-page/src/LandingPage.js` |

**Example (PowerShell)** — point at a local Kafka and keep CORS aligned with the frontend:

```powershell
$env:KAFKA_BOOTSTRAP_SERVERS = "localhost:9092"
cd ProducerConsumer
.\gradlew.bat bootRun
```

**Example (bash):**

```bash
export KAFKA_BOOTSTRAP_SERVERS=localhost:9092
cd ProducerConsumer
./gradlew bootRun
```

If you change the API port or host, update the `fetch('http://localhost:8080/producer/event', ...)` URL in `landing-page/src/LandingPage.js` (or introduce a `REACT_APP_API_URL` env variable in a future change).

## Troubleshooting

| Symptom | Likely cause | What to do |
|---------|----------------|------------|
| Frontend shows “Could not reach the studio desk” | Backend not running or wrong port | Start `bootRun`; confirm [health](http://localhost:8080/actuator/health) |
| CORS error in the browser console | Frontend not on port 3000 | Use `npm start` (port 3000) or set `app.cors.allowed-origin` to your URL |
| Backend starts but no Kafka logs / send failures | Broker unreachable or topic missing | Check `KAFKA_BOOTSTRAP_SERVERS`, firewall, and that topic `testy` exists on the cluster |
| `JAVA_HOME` / toolchain errors | Wrong JDK | Install JDK **21** and ensure Gradle can resolve it |

## GitHub

Remote repository: [Navneet2569/Insights-Dashboard](https://github.com/Navneet2569/Insights-Dashboard)
