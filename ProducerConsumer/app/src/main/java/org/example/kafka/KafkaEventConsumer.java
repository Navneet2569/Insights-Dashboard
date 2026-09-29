package org.example.kafka;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaEventConsumer {

    private static final Logger log = LoggerFactory.getLogger(KafkaEventConsumer.class);

    private final Counter kafkaEventsCounter;

    public KafkaEventConsumer(MeterRegistry meterRegistry) {
        this.kafkaEventsCounter = Counter.builder("kafka.events.received")
                .description("Total number of Kafka events received")
                .register(meterRegistry);
    }

    @KafkaListener(topics = "${app.kafka.topic}")
    public void listen(String eventData) {
        log.info("Received event: {}", eventData);
        kafkaEventsCounter.increment();
    }
}
