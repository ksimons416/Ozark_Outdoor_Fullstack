package com.simons.ozark_fullstack.controller;

import com.simons.ozark_fullstack.dto.UserDTO;
import com.simons.ozark_fullstack.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.web.bind.annotation.*;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import java.util.List;
import java.util.Optional;
import org.springframework.http.MediaType;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/findUserByUsername/{username}")
    public ResponseEntity<UserDTO> findUserByUsername(@PathVariable("username") String username){
        UserDTO userDetails = userService.findUserByUsername(username);
        return ResponseEntity.ok(userDetails);
    }
    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO handleLogin(@RequestBody UserDTO userDTO) {
        System.out.println("login method triggered");
        return this.userService.findUserByUserNameAndPassWord(userDTO.getUsername(), userDTO.getPassword());
    }
    @GetMapping("/findAllUsers")
    public ResponseEntity<List<UserDTO>> findAllUsers(){
        List<UserDTO> userDTOs = userService.findAllUsers();
        return ResponseEntity.ok(userDTOs);
    }

    @GetMapping("/authenticate/{username}/{password}")
    public ResponseEntity authenticate(@PathVariable("username") Optional<String> username, @PathVariable("password") String password){
        System.out.println("authentication method triggered");
        JsonObjectBuilder builder = Json.createObjectBuilder();
        JsonObject json;
        String authenticated = userService.authenticate(username, password);
        System.out.println(authenticated);
        if(authenticated.equalsIgnoreCase("User is authenticated")){
            builder.add("text", authenticated);
            json = builder.build();
            return new ResponseEntity<>(json.toString(), HttpStatus.OK);
        }else if(authenticated.equalsIgnoreCase("User not found in the system")) {
            builder.add("text", authenticated);
            json = builder.build();
            return new ResponseEntity<>(json.toString(), HttpStatus.NOT_FOUND);
        }else{
            builder.add("text",authenticated);
            json = builder.build();
            return new ResponseEntity<>(json.toString(), HttpStatus.UNAUTHORIZED);
        }
    }

}
