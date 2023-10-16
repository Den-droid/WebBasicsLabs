package com.example.authexample.repositories;

import com.example.authexample.entities.Role;
import com.example.authexample.entities.User;
import com.example.authexample.entities.enums.EnumRole;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    @Query("SELECT e FROM User e WHERE :role MEMBER of e.roles")
    List<User> findByRole(Role role);

    void deleteByUsername(String username);
}
