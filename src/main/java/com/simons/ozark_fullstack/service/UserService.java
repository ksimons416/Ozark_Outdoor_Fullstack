package com.simons.ozark_fullstack.service;

import com.simons.ozark_fullstack.dto.UserDTO;
import com.simons.ozark_fullstack.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public UserDTO findUserByUsername(String email){
        return userRepository.findByUsername(email);
    }
    public List<UserDTO> findAllUsers(){
        return userRepository.findAll();
    }


    public String authenticate(Optional<String> username, String password) {
       String isAuthenticated = "";
        Optional<UserDTO> user = Optional.ofNullable(userRepository.authenticateByUsername(username));
        Optional<String> DBusername =
                Optional.ofNullable(user.stream().findFirst().isPresent()
                        ? user.stream().findFirst().get().getUsername() : null);
        String DBpassword = "";
        if (DBusername.isPresent()) {
            DBpassword = userRepository.authenticateByUsername(DBusername).getPassword();
            log.info("user exists in system");
            isAuthenticated = "User not authenticated";
            if (DBusername.equals(username) && DBpassword.equals(password)) {
                log.info("user is authenticated");
                isAuthenticated = "User is authenticated";
            }
        } else {
            isAuthenticated = "User not found in the system";
            log.info("user does not exist in the system");
        }
        return isAuthenticated;
    }
}
