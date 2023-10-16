package com.example.authexample.entities;

import com.example.authexample.entities.enums.EnumRole;
import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private EnumRole name;

    public Role() {
    }

    public Role(EnumRole name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public EnumRole getName() {
        return name;
    }

    public void setName(EnumRole name) {
        this.name = name;
    }
}