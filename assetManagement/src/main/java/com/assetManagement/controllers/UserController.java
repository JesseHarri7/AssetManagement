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
@RequestMapping(value = "/user/")
public class UserController {
	@Autowired
	UserService service;

	@RequestMapping(value = "{userID}", method = RequestMethod.GET)
	public User findByID(@PathVariable Long userID) {
		return service.readById(userID);
	}

	@RequestMapping(value = "create", method = RequestMethod.POST)
	@ResponseStatus(code = HttpStatus.CREATED)
	public User create(@RequestBody User user) {
		return service.create(user);
	}

	@RequestMapping(value = "update", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void update(@RequestBody User user) {
		service.update(user);
	}

	@RequestMapping(value = "findAll", method = RequestMethod.GET)
	public List<User> findAll() {
		return service.readAll();
	}

	@RequestMapping(value = "findAllHistory", method = RequestMethod.GET)
	public List<User> findAllHistory() {
		return service.findAllHistory();
	}

	@RequestMapping(value = "delete/{id}", method = { RequestMethod.GET, RequestMethod.DELETE })
	@ResponseStatus(HttpStatus.OK)
	public void deleteUser(@PathVariable("id") Long id) {
		User user = service.readById(id);

		if (user != null) {
			service.delete(user);
		}
	}

	@RequestMapping(value = "email/{email}", method = RequestMethod.GET)
	public User findByEmail(@PathVariable String email) {
		return service.findByEmail(email);
	}

	@RequestMapping(value = "firstName/{name}", method = RequestMethod.GET)
	public List<User> findByFirstName(@PathVariable String name) {
		return service.findByFirstName(name);
	}

	@RequestMapping(value = "LastName/{name}", method = RequestMethod.GET)
	public List<User> findByLastName(@PathVariable String name) {
		return service.findByLastName(name);
	}

	@RequestMapping(value = "password/{password}", method = RequestMethod.GET)
	public User findByPassword(@PathVariable String password) {
		return service.findByPassword(password);
	}

}