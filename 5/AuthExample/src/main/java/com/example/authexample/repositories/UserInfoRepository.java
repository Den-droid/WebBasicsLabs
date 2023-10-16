package com.example.authexample.repositories;

import com.example.authexample.entities.UserInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

public interface UserInfoRepository extends CrudRepository<UserInfo, Long> {
}
