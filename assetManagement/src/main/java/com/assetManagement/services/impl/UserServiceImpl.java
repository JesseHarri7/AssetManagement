package com.assetManagement.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assetManagement.entities.Asset;
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
		List<User> list = userRepo.findByFirstName(name);
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
		User user=  userRepo.findByEmail(email);
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
		return userRepo.save(user);
	}

	public List<User> findAll() {
		List<User> userList = new ArrayList<User>();
		Iterable<User> users = userRepo.findAll();
		for (User a : users)
		{
			userList.add(a);
		}
		return userList;
	}
 
	/*@Override
	public void deleteUser(long userID) {
		userRepo.delete((userID));
	}
*/
	@Transactional
	@Override
	public User deleteUser(long userID,String active) {
		
		User user = findByID(userID);
		
		if (user != null) {
			
		Integer result= userRepo.deleteUser(userID, active);
		if(result.intValue() == 1) {
			user.setActive(active);
			
		}else {
			user.setActive(active);
			
		}
		return	user;
		}
		
		return null;
	}
/*
	@Override
	public User findByID(long userID) throws ResourceNotFoundException {
		User user=  userRepo.findById(userID);
		if (userID != null ) {
		return user;
		}else {
			throw new ResourceNotFoundException("User is not found");	
	}
	}*/

	@Override
	public User findByID(long userID) throws ResourceNotFoundException {
		
		Optional<User> optional = userRepo.findById(userID);
		if (optional.isPresent()) {
			return optional.get();
		}else {
			return null;
		
	}
}
	public List<User> findByActive(String active) {
		return  userRepo.findByActive(active);
	}

	public List<User> findHistory() {
		/*List<User> userList = new ArrayList<User>();
		Iterable<User> user = userRepo.findHistory();
		for (User a : user)
		{
			userList.add(a);
		}
		return userList;	
	}*/
		return findAll();
	}
}

