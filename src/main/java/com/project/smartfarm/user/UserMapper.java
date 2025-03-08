package com.project.smartfarm.user;

import org.apache.ibatis.annotations.Mapper;

import com.project.smartfarm.security.MyUserDetails;

@Mapper
public interface UserMapper {
	MyUserDetails getUser(String id);
}