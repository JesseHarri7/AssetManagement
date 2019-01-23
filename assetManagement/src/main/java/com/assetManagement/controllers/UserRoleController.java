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

import com.assetManagement.entities.UserRoles;
import com.assetManagement.services.UserRoleService;

@RestController
@RequestMapping("/userRole/")
public class UserRoleController 
{
	@Autowired
	UserRoleService service;

	// find by ID
	@RequestMapping(value = "{userID}", method = RequestMethod.GET)
	public UserRoles findByID(@PathVariable Long userID) 
	{
		return service.readById(userID);
	}
		
	// create
	@RequestMapping(value = "create", method = RequestMethod.POST)
	@ResponseStatus(code = HttpStatus.CREATED)
	public UserRoles create(@RequestBody UserRoles user) 
	{
		return service.create(user);
	}
	
	//update
	@RequestMapping(value = "update", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void update(@RequestBody UserRoles user)
	{
		service.update(user);
	}
	
	// find All
	@RequestMapping(value = "findAll", method = RequestMethod.GET)
	public List<UserRoles> findAll() 
	{
		return service.readAll();
	}
	
	//Find All History
	@RequestMapping(value = "findAllHistory", method = RequestMethod.GET)
	public List<UserRoles> findAllHistory()
	{
		return service.findAllHistory();
	}

	// delete
	@RequestMapping(value = "delete/{id}", method = {RequestMethod.GET, RequestMethod.DELETE})
	@ResponseStatus(HttpStatus.OK)
	public void deleteUser(@PathVariable("id") Long id) 
	{
		UserRoles user = service.readById(id);
		
		if(user != null)
		{
			service.delete(user);
		}
	}

}