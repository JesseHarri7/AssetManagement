package com.assetManagement.services;

import java.util.List;

import com.assetManagement.entities.User;
import com.assetManagement.excptions.ResourceNotFoundException;

public interface UserService {
	
	List<User> findByName(String name) throws ResourceNotFoundException;
	String findByEmail(String email) throws ResourceNotFoundException;
    String findByUsername(String username) throws ResourceNotFoundException;
	String findByPassword(String password) throws ResourceNotFoundException;
}
