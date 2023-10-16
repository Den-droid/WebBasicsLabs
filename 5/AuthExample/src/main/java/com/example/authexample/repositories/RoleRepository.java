package com.example.authexample.repositories;

import com.example.authexample.entities.Role;
import com.example.authexample.entities.enums.EnumRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(EnumRole name);
}
