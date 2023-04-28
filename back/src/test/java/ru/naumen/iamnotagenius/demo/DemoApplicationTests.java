package ru.naumen.iamnotagenius.demo;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import ru.naumen.iamnotagenius.demo.AgeService.AgeItem;
import ru.naumen.iamnotagenius.demo.models.AgeModel;

@SpringBootTest
class DemoApplicationTests {

    @Autowired
    private AgeService service;

    @Test
    void contextLoads() {
        var ages = service.getEverything();
        var expectedToExist = Arrays.asList(
            new AgeModel("Андрей", 20L, 0L),
                new AgeModel("Марат", 18L, 0L),
                new AgeModel("Лёха", 22L, 0L),
                new AgeModel("Паша", 54L, 0L),
                new AgeModel("Катя", 14L, 0L),
                new AgeModel("Настя", 15L, 0L)
        ); 

        Assertions.assertEquals(6, ages.size());
        Assertions.assertTrue(ages.containsAll(expectedToExist));

        Assertions.assertEquals(new AgeItem(20L, 1L), service.getAge("Андрей").get());
        Assertions.assertEquals(Optional.empty(), service.getAge("Василий"));
        Assertions.assertEquals(new AgeModel("Паша", 54L, 0L), service.getOldest());
    }

}
