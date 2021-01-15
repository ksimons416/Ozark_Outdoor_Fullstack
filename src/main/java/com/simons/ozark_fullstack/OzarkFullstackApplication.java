package com.simons.ozark_fullstack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class OzarkFullstackApplication {

    public static void main(String[] args) {
        SpringApplication.run(OzarkFullstackApplication.class, args);
    }

}
