package com.simons.ozark_fullstack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.*;

@Data
@Entity(name ="USERS")
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "USERS")
public class UserDTO {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "PERSONID")
    Integer personId;

    @Column(name = "USERNAME")
    String userName;

    @Column(name = "FIRSTNAME")
    String firstName;

    @Column(name= "LASTNAME")
    String lastName;

    @Column(name ="PASSWORD")
    String password;


}
