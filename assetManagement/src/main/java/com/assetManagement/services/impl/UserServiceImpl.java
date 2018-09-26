package com.assetManagement.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assetManagement.entities.User;
import com.assetManagement.excptions.ResourceNotFoundException;
import com.assetManagement.repositories.UserRepo;
import com.assetManagement.services.UserService;

@Service
public abstract class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;
	
	@Override
	public List<User> findByName(String name) throws ResourceNotFoundException {
		List<User> list = userRepo.findByName(name);
		if (list != null && !list.isEmpty()) {
			return list;
		}else {
			throw new ResourceNotFoundException("User is not found");
		}
		}
	
	@Override
	public String findByUsername(String username) throws ResourceNotFoundException {
		User user=  userRepo.findByUsername(username);
		if (username != null && !username.isEmpty()) {
		return username;
		}else {
			throw new ResourceNotFoundException("User is not found");	
	}
	}
	
	@Override
	public String findByEmail(String email) throws ResourceNotFoundException {
		User user=  userRepo.findByUsername(email);
		if (email != null && !email.isEmpty()) {
		return email;
		}else {
			throw new ResourceNotFoundException("User is not found");	
	}
	}
	@Override
	public String findByPassword(String password) throws ResourceNotFoundException {
		User user=  userRepo.findByPassword(password);
		if (password != null && !password.isEmpty()) {
		return password;
		}else {
			throw new ResourceNotFoundException("User is not found");	
	}
	}
	
}
