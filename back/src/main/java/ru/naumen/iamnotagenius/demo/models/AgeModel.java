package ru.naumen.iamnotagenius.demo.models;

import java.util.Map.Entry;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.naumen.iamnotagenius.demo.AgeService.AgeItem;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgeModel {
    private String name;
    private Long age;
    private Long requestCount;

    public AgeModel(String name, AgeItem item) {
        this.name = name;
        this.age = item.getAge();
        this.requestCount = item.getRequestCount();
    }

    public AgeModel(Entry<String, AgeItem> entry) {
        this.name = entry.getKey();
        this.age = entry.getValue().getAge();
        this.requestCount = entry.getValue().getRequestCount();
    }
}
