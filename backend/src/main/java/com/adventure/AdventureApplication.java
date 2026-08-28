package com.adventure;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AdventureApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdventureApplication.class, args);
        System.out.println("=================================================");
        System.out.println("🌟 3D Educational Adventure Backend Started! 🌟");
        System.out.println("👉 REST API: http://localhost:8080/api");
        System.out.println("=================================================");
    }
}
