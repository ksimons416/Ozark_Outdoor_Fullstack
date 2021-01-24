package com.simons.ozark_fullstack.repository;

import com.simons.ozark_fullstack.dto.UserDTO;
import org.hibernate.SessionFactory;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@ComponentScan
public interface UserRepository extends JpaRepository<UserDTO, Integer> {

    UserDTO findByUserName(String username);

    @Query(value = "SELECT * from users where username =?",nativeQuery = true)
    UserDTO authenticateByUserName(@Param("USERNAME")Optional<String> username);

    UserDTO findUserDTOByUserNameAndPassword(String username, String password);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO users (USERNAME, FIRSTNAME, LASTNAME, PASSWORD) VALUES (?, ?, ?, ?)",nativeQuery = true)
    void userSignUp(@Param("USERNAME") String username, @Param("FIRSTNAME") String firstname, @Param("LASTNAME") String lastname, @Param("PASSWORD") String password);

}
