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
import com.assetManagement.excptions.ResourceNotFoundException;
import com.assetManagement.services.impl.UserServiceImpl;

@RestController
@RequestMapping("assetManagement/user/")
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
	// find by ID
	@RequestMapping(value = "userID/{userID}", method = RequestMethod.GET)
	public ResponseEntity<User> findByID(@PathVariable long userID) {
		User user = userService.findByID(userID);
		if (user == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	// create
	@RequestMapping(value = "create", method = RequestMethod.POST)
	@ResponseStatus(code = HttpStatus.CREATED)
	public User create(@RequestBody User user) {
		// user.setActive("Y");
		return userService.saveUser(user);
	}

	// find by user name
	@RequestMapping(value = "username/{username}", method = RequestMethod.GET)
	public ResponseEntity<User> findByUsername(@PathVariable String username) {
		User user = userService.findByUsername(username);

		if (user == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	// find by name
	@RequestMapping(value = "name/{name}", method = RequestMethod.GET)
	public ResponseEntity<List<User>> findByName(@PathVariable String name) {
		List<User> user = userService.findByName(name);

		if (user == null) {
			return new ResponseEntity<List<User>>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<List<User>>(user, HttpStatus.OK);
	}

	// find by password
	@RequestMapping(value = "password/{password}", method = RequestMethod.GET)
	public ResponseEntity<User> findByPassword(@PathVariable String password) {
		User user = userService.findByPassword(password);

		if (user == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	// find All
	@RequestMapping(value = "findAll", method = RequestMethod.GET)
	@ResponseBody
	public List<User> findAll() {
		return userService.findAll();
	}

	// delete
	@RequestMapping(value = "delete/{userID}/{active}", method = RequestMethod.PUT)
	public User deleteUser(@PathVariable long userID, @PathVariable String active) {
		return userService.deleteUser(userID, active);
	}

	// find Activated
	@RequestMapping(value = "findActivated/{active}", method = RequestMethod.GET)
	public ResponseEntity<List<User>> findByActive(@PathVariable String active) {
		List<User> users = userService.findByActive(active);
		if (users == null) {
			throw new ResourceNotFoundException("Not users active");
		}
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);

	}

	// find history
	@RequestMapping(value = "findHistory", method = RequestMethod.GET)
	@ResponseBody
	public List<User> findHistory() {
		return userService.findHistory();
	}

}
