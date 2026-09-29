package org.example.controller;

import org.example.config.KafkaTopicProperties;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;

import java.util.concurrent.CompletableFuture;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProducerControllerTest {

    @Mock
    private KafkaTemplate<String, String> kafkaTemplate;

    private ProducerController producerController;

    @BeforeEach
    void setUp() {
        producerController = new ProducerController(kafkaTemplate, new KafkaTopicProperties("testy"));
    }

    @Test
    void sendEventToKafkaRejectsBlankPayload() {
        var response = producerController.sendEventToKafka("  ");

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        verifyNoInteractions(kafkaTemplate);
    }

    @Test
    void sendEventToKafkaDelegatesToTemplate() {
        CompletableFuture<SendResult<String, String>> completed = CompletableFuture.completedFuture(null);
        when(kafkaTemplate.send(eq("testy"), eq("userEvent"), eq("payload"))).thenReturn(completed);

        var response = producerController.sendEventToKafka("payload");

        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
        verify(kafkaTemplate).send("testy", "userEvent", "payload");
    }
}
