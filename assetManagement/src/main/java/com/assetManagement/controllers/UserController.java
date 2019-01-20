package com.assetManagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.assetManagement.entities.User;
import com.assetManagement.services.UserService;

@RestController
@RequestMapping("/user/")
public class UserController 
{
	@Autowired
	UserService service;

	// find by ID
	@RequestMapping(value = "{userID}", method = RequestMethod.GET)
	public User findByID(@PathVariable Long userID) 
	{
		return service.readById(userID);
	}
		
	// create
	@RequestMapping(value = "create", method = RequestMethod.POST)
	@ResponseStatus(code = HttpStatus.CREATED)
	public User create(@RequestBody User user) 
	{
		return service.create(user);
	}
	
	//update
	@RequestMapping(value = "update", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void update(@RequestBody User user)
	{
		service.update(user);
	}
	
	// find All
	@RequestMapping(value = "findAll", method = RequestMethod.GET)
	public List<User> findAll() 
	{
		return service.readAll();
	}
	
	//Find All History
	@RequestMapping(value = "findAllHistory", method = RequestMethod.GET)
	public List<User> findAllHistory()
	{
		return service.findAllHistory();
	}

	// delete
	@RequestMapping(value = "delete/{id}", method = {RequestMethod.GET, RequestMethod.DELETE})
	@ResponseStatus(HttpStatus.OK)
	public void deleteUser(@PathVariable("id") Long id) 
	{
		User user = service.readById(id);
		
		if(user != null)
		{
			service.delete(user);
		}
	}
		
	// find by email
	@RequestMapping(value = "email/{email}", method = RequestMethod.GET)
	public User findByEmail(@PathVariable String email) 
	{
		return service.findByEmail(email);
	}

	// find by Firstname
	@RequestMapping(value = "firstName/{name}", method = RequestMethod.GET)
	public List<User> findByFirstName(@PathVariable String name) 
	{
		return service.findByFirstName(name);
	}
	
	// find by Lastname
	@RequestMapping(value = "LastName/{name}", method = RequestMethod.GET)
	public List<User> findByLastName(@PathVariable String name) 
	{
		return service.findByLastName(name);
	}

	// find by password
	@RequestMapping(value = "password/{password}", method = RequestMethod.GET)
	public User findByPassword(@PathVariable String password) 
	{
		return service.findByPassword(password);
	}

}