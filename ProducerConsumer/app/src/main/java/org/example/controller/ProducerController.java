package org.example.controller;

import org.example.config.KafkaTopicProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/producer")
public class ProducerController {

    private static final Logger log = LoggerFactory.getLogger(ProducerController.class);
    private static final String EVENT_KEY = "userEvent";

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final KafkaTopicProperties kafkaTopicProperties;

    public ProducerController(
            KafkaTemplate<String, String> kafkaTemplate,
            KafkaTopicProperties kafkaTopicProperties
    ) {
        this.kafkaTemplate = kafkaTemplate;
        this.kafkaTopicProperties = kafkaTopicProperties;
    }

    @PostMapping("/event")
    public ResponseEntity<Void> sendEventToKafka(@RequestBody String eventData) {
        if (eventData == null || eventData.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        kafkaTemplate.send(kafkaTopicProperties.topic(), EVENT_KEY, eventData)
                .whenComplete((result, exception) -> {
                    if (exception != null) {
                        log.error("Error sending message to Kafka", exception);
                        return;
                    }
                    log.info("Message sent to Kafka, offset: {}", result.getRecordMetadata().offset());
                });

        return ResponseEntity.accepted().build();
    }
}
