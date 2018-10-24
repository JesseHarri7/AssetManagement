package com.assetManagement.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assetManagement.entities.User;
import com.assetManagement.excptions.ResourceNotFoundException;
import com.assetManagement.repositories.UserRepo;
import com.assetManagement.services.UserService;

@Service
public  class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;
	
	@Override
	public List<User> findByName(String name) throws ResourceNotFoundException {
		List<User> list = userRepo.findByName(name);
			if (list != null && !list.isEmpty()) {
				return list;
			}else {
				return null;
			}
		}
	
	@Override
	public User findByUsername(String username) throws ResourceNotFoundException {
		User user=  userRepo.findByUsername(username);
		if (username != null ) {
		return user;
		}else {
			throw new ResourceNotFoundException("User is not found");	
	}
	}
	
	@Override
	public User findByEmail(String email) throws ResourceNotFoundException {
		User user=  userRepo.findByUsername(email);
		if (email != null) {
		return user;
		}else {
			throw new ResourceNotFoundException("User is not found");	
	}
	}
	@Override
	public User findByPassword(String password) throws ResourceNotFoundException {
		User user=  userRepo.findByPassword(password);
		if (password != null) {
		return user;
		}else {
			throw new ResourceNotFoundException("User is not found");	
	}
	}

	@Override
	public User saveUser(User user) {
		// TODO Auto-generated method stub
		return userRepo.save(user);
	}
	
}
