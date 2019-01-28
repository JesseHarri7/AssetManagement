package com.assetManagement.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.assetManagement.entities.User;
import com.assetManagement.excptions.ResourceNotFoundException;
import com.assetManagement.repositories.UserRepo;
import com.assetManagement.services.UserService;

@Service
public  class UserServiceImpl implements UserService 
{

	@Autowired
	private UserRepo repo;
	
	/*@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;*/
	
	@Bean
    public BCryptPasswordEncoder passwordEncoder() {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }
	
	@Override
	public List<User> findByFirstName(String name) throws ResourceNotFoundException 
	{
		List<User> user = repo.findByFirstName(name);
		
		if (user != null && !user.isEmpty()) 
		{
			return user;
		}
		else 
		{
			return null;
		}
	}
	
	@Override
	public List<User> findByLastName(String name) throws ResourceNotFoundException 
	{
		List<User> user = repo.findByLastName(name);
		
		if (user != null && !user.isEmpty()) 
		{
			return user;
		}
		else 
		{
			return null;
		}
	}
	
	@Override
	public User findByEmail(String email) throws ResourceNotFoundException 
	{
		User user=  repo.findByEmail(email);
		
		if (email != null) 
		{
			return user;
		}
		else 
		{
			throw new ResourceNotFoundException("Cannot find user by email");	
		}
	}
	
	@Override
	public User findByPassword(String password) throws ResourceNotFoundException 
	{
		User user=  repo.findByPassword(password);
		
		if (password != null) 
		{
			return user;
		}
		else 
		{
			throw new ResourceNotFoundException("Cannot find user by password");	
		}
	}

	@Override
	public User create(User entity)
	{
		User user = repo.findByUserId(entity.getUserId());
		
		if(user == null)// && allAssets.size() == 0)
		{
			entity.setPassword(passwordEncoder().encode(entity.getPassword()));
			return repo.save(entity);
		}
		else
		{
			return null;
		}
		
	}
	
	public List<User> readAll() 
	{
		List<User> userList = new ArrayList<User>();
		Iterable<User> users = repo.findAll();
		
		for (User u : users)
		{
			userList.add(u);
		}
		return userList;
	}
 
	@Override
	public void delete(User entity) 
	{
		if (entity != null)
		{
			repo.delete(entity);
		}
	}

	@Override
	public User readById(Long id) throws ResourceNotFoundException 
	{
		User user = repo.findByUserId(id);
		
		if (user == null)
		{
			throw new ResourceNotFoundException("Cannot find user by UserId");
		}
		else
		{	
			return user;
		}
	}

	@Override
	public User update(User entity) 
	{
		User user = repo.findByUserId(entity.getUserId());
		
		if (user == null)
		{
			throw new ResourceNotFoundException("Cannot find user to update");
		}
		else
		{
			return repo.save(entity);
		}
	}

	@Override
	public List<User> findAllHistory() 
	{
		List<User> userList = new ArrayList<User>();
		Iterable<User> users = repo.findAllHistory();
		
		for (User u : users)
		{
			userList.add(u);
		}
		return userList;
	}
}