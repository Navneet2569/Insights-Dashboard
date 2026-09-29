package org.example;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class AppTest {

    @Test
    void applicationTypeIsPresent() {
        assertNotNull(App.class);
    }
}
