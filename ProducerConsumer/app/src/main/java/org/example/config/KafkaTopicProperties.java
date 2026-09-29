package org.example.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.kafka")
public record KafkaTopicProperties(String topic) {
    public KafkaTopicProperties {
        if (topic == null || topic.isBlank()) {
            throw new IllegalArgumentException("app.kafka.topic must be set");
        }
    }
}
