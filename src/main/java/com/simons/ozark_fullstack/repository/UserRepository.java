package com.simons.ozark_fullstack.repository;

import com.simons.ozark_fullstack.dto.UserDTO;
import org.hibernate.SessionFactory;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@ComponentScan
public interface UserRepository extends JpaRepository<UserDTO, Integer> {

    UserDTO findByUsername(String username);

    @Query(value = "SELECT * from users where username =?",nativeQuery = true)
    UserDTO authenticateByUsername(@Param("USERNAME")Optional<String> username);

    UserDTO findUserDTOByUsernameAndPassword(String username, String password);

}
