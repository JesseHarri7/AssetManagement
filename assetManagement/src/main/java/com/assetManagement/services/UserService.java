package com.assetManagement.services;

import java.util.List;

import com.assetManagement.entities.User;
import com.assetManagement.excptions.ResourceNotFoundException;

public interface UserService extends Service<User, Long>
{	
	List<User> findByFirstName(String name);
	
	List<User> findByLastName(String lastName);
	
	User findByEmail(String email) throws ResourceNotFoundException;
    
	User findByPassword(String password) throws ResourceNotFoundException;
}
