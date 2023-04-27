package ru.naumen.iamnotagenius.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebConfig {
    private AgeService ageService = null;
    @Bean
    public AgeService ageService() {
        if (ageService == null) {
            ageService = AgeDataParser.createServiceFromFile(getClass().getClassLoader().getResourceAsStream("ages.txt"));
        }
        return ageService;
    }
}
