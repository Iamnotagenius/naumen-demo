package ru.naumen.iamnotagenius.demo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Data;
import ru.naumen.iamnotagenius.demo.exceptions.EmptyAgeListException;
import ru.naumen.iamnotagenius.demo.models.AgeModel;

public class AgeService {
    @Data
    @AllArgsConstructor
    public static class AgeItem {
        private Long age;
        private Long requestCount;
    }
    private Map<String, AgeItem> ageMap = new HashMap<>();

    public List<AgeModel> getEverything() {
        return ageMap.entrySet().stream().map(entry -> new AgeModel(entry)).toList();
    }

    public Optional<AgeItem> getAge(String name) {
        if (!ageMap.containsKey(name)) {
            return Optional.empty();
        }
        var requested = ageMap.get(name);
        requested.setRequestCount(requested.getRequestCount() + 1);
        return Optional.of(requested);
    }

    public boolean setNewName(String name, Long age) {
        if (ageMap.containsKey(name)) {
            return false;
        }
        ageMap.put(name, new AgeItem(age, 0L));
        return true;
    }

    public AgeModel getOldest() {
        var maxEntry = ageMap.entrySet().stream().max((lhs, rhs) -> lhs.getValue().getAge().compareTo(rhs.getValue().getAge()));
        if (!maxEntry.isPresent()) {
            throw new EmptyAgeListException("Age list is empty.");
        }

        return new AgeModel(maxEntry.get());
    }
}
