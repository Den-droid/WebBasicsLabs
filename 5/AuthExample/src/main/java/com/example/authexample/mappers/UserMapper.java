package com.example.authexample.mappers;

import com.example.authexample.dto.UserInfoDto;
import com.example.authexample.dto.auth.SignupDto;
import com.example.authexample.entities.User;
import com.example.authexample.entities.UserInfo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    private final PasswordEncoder encoder;

    public UserMapper(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    public User mapToUser(SignupDto dto) {
        User user = new User();
        UserInfo userInfo = new UserInfo();

        user.setUsername(dto.username());
        user.setPassword(encoder.encode(dto.password()));

        userInfo.setBirthday(dto.birthday());
        userInfo.setFaculty(dto.faculty());
        userInfo.setFullname(dto.fullname());
        userInfo.setIdCard(dto.idCard());
        userInfo.setPhoneNumber(dto.phoneNumber());

        user.setUserInfo(userInfo);
        return user;
    }

    public UserInfoDto mapToUserInfoDto(User user) {
        return new UserInfoDto(user.getUsername(),
                user.getUserInfo().getFullname(),
                user.getUserInfo().getIdCard(),
                user.getUserInfo().getFaculty(),
                user.getUserInfo().getPhoneNumber(),
                user.getUserInfo().getBirthday());
    }

    public void setUserInfo(UserInfo userInfo, UserInfoDto userInfoDto) {
        userInfo.setIdCard(userInfoDto.idCard());
        userInfo.setFaculty(userInfoDto.faculty());
        userInfo.setBirthday(userInfoDto.birthday());
        userInfo.setPhoneNumber(userInfoDto.phoneNumber());
        userInfo.setFullname(userInfoDto.fullname());
    }
}
