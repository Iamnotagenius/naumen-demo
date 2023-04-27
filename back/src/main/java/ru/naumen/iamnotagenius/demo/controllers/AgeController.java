package ru.naumen.iamnotagenius.demo.controllers;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import lombok.Data;
import lombok.NoArgsConstructor;
import ru.naumen.iamnotagenius.demo.AgeService;
import ru.naumen.iamnotagenius.demo.models.AgeModel;

@RestController
@RequestMapping("/")
@CrossOrigin
public class AgeController {
    private RestTemplate restTemplate = new RestTemplate();
    @Autowired
    private AgeService service;

    @GetMapping
    public List<AgeModel> getEverything() {
        return service.getEverything();
    }

    @GetMapping("/age")
    public AgeModel getAge(@RequestParam("name") String name) {
        var requested = service.getAge(name);
        if (!requested.isPresent()) {
            service.setNewName(name, getAgeFromAgify(name));
            // Since this name has been requested, requestCount should be incremented
            requested = service.getAge(name);
        }
        return new AgeModel(name, requested.get());
    }

    @GetMapping("/oldest")
    public AgeModel getOldest() {
        return service.getOldest();
    }

    private Long getAgeFromAgify(String name) {
        var response = restTemplate.getForEntity("https://api.agify.io/?name={name}", AgifyResponse.class, name); 
        var body = response.getBody();
        System.out.println(body);
        if (body.getAge() == null) {
            return 0L;
        }
        return body.getAge();
    }
    

    @Data
    @NoArgsConstructor
    private static class AgifyResponse implements Serializable {
        private String name;
        private Long age;
    }
}
