package com.assetManagement.services;

import java.util.List;

import com.assetManagement.entities.Employee;
import com.assetManagement.entities.User;
import com.assetManagement.excptions.ResourceNotFoundException;

public interface UserService {
	
	List<User> findByName(String name) throws ResourceNotFoundException;
	User findByEmail(String email) throws ResourceNotFoundException;
    User findByUsername(String username) throws ResourceNotFoundException;
	User findByPassword(String password) throws ResourceNotFoundException;
	User saveUser(User user);
	User deleteUser(long userID,String active);
	User findByID(long userID) throws ResourceNotFoundException;
	List<User> findByActive(String active) throws ResourceNotFoundException;
}
