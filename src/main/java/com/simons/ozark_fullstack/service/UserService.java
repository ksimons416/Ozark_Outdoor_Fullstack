package com.simons.ozark_fullstack.service;

import com.simons.ozark_fullstack.dto.UserDTO;
import com.simons.ozark_fullstack.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public UserDTO findUserByUsername(String email){
        return userRepository.findByUserName(email);
    }
    public List<UserDTO> findAllUsers(){
        return userRepository.findAll();
    }
    public UserDTO findUserByUserNameAndPassWord(String username, String password){
        return userRepository.findUserDTOByUserNameAndPassword(username, password);
    }

    public void userSignup(String userName, String firstName, String lastName, String password){
            userRepository.userSignUp(userName, firstName, lastName, password);

    }


    public String authenticate(Optional<String> username, String password) {
       String isAuthenticated = "";
        Optional<UserDTO> user = Optional.ofNullable(userRepository.authenticateByUserName(username));
        Optional<String> DBusername =
                Optional.ofNullable(user.stream().findFirst().isPresent()
                        ? user.stream().findFirst().get().getUserName() : null);
        String DBpassword = "";
        if (DBusername.isPresent()) {
            DBpassword = userRepository.authenticateByUserName(DBusername).getPassword();
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
