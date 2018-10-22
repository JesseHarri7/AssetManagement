package com.assetManagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.assetManagement.entities.User;
import com.assetManagement.services.impl.UserServiceImpl;

@RestController
@RequestMapping("/user/")
public class UserController {
	@Autowired
	private UserServiceImpl userService;
	
			// find by email
			@RequestMapping(value = "email/{email}", method = RequestMethod.GET)
			public ResponseEntity<User> findByEmail(@PathVariable String email) {
				User user = userService.findByEmail(email);
				if (user == null) {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
				
				return new ResponseEntity<User>(user, HttpStatus.OK);			
			}
			
			// add
			@RequestMapping(value = "create", method = RequestMethod.POST)
			@ResponseStatus(code=HttpStatus.CREATED)
			@ResponseBody
			public User create(@RequestBody User user) {
				return userService.saveUser(user);
			}
			
			// find by username
			@RequestMapping(value = "username/{username}", method = RequestMethod.POST)
			public ResponseEntity<User> findByUsername(@PathVariable String username) {
				User user = userService.findByUsername(username);
				
				if (user == null) {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
				
				return new ResponseEntity<User>(user, HttpStatus.OK);
			}
			
			// find by name
			@RequestMapping(value = "name/{name}", method = RequestMethod.POST)
			public ResponseEntity<List> findByName(@PathVariable String name) {
				List<User> user = userService.findByName(name);
				
				if (user == null) {
					return (ResponseEntity<List>) new ResponseEntity<List>(HttpStatus.NOT_FOUND);
				}
				
				return new ResponseEntity<List>(user, HttpStatus.OK);
			}
			// find by password
			@RequestMapping(value = "password/{password}", method = RequestMethod.POST)
			public ResponseEntity<User> findByPassword(@PathVariable String password) {
				User user = userService.findByPassword(password);
				
				if (user == null) {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
				
				return new ResponseEntity<User>(user, HttpStatus.OK);
			}
			
}
