package ru.naumen.iamnotagenius.demo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class AgeDataParser {
    public static AgeService createServiceFromFile(InputStream file) {
        var service = new AgeService();
        try (var reader = new BufferedReader(new InputStreamReader(file))) {
            String line = reader.readLine();
            while (line != null) {
                var parts = line.split("_");
                service.setNewName(parts[0], Long.parseLong(parts[1]));
                line = reader.readLine();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return service;
    }
}
