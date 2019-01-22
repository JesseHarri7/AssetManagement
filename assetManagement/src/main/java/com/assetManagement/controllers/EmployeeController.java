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

import com.assetManagement.entities.Employee;
import com.assetManagement.services.EmployeeService;
@RestController
@RequestMapping("/employee/")
public class EmployeeController 
{
	@Autowired
	EmployeeService service;
					
	//Find by id
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public Employee findById(@PathVariable Long id)
	{
		return service.readById(id);
	}
		
	// create
	@RequestMapping(value = "create", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Employee create(@RequestBody Employee employee) 
	{
		return service.create(employee);
	}
	
	//update
	@RequestMapping(value = "update", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void update(@RequestBody Employee employee)
	{
		service.update(employee);
	}
	
	// find All
	@RequestMapping(value = "findAll", method = RequestMethod.GET)
	public List<Employee> findAll() 
	{
		return service.readAll();
	}
	
	//Find All History
	@RequestMapping(value = "findAllHistory", method = RequestMethod.GET)
	public List<Employee> findAllHistory()
	{
		return service.findAllHistory();
	}
	
	//delete
	@RequestMapping(value = "delete/{id}", method = {RequestMethod.GET, RequestMethod.DELETE})
	@ResponseStatus(HttpStatus.OK)
	public void deleteEmp(@PathVariable("id") Long id)
	{
		Employee deleteEmp = service.readById(id);
		if (deleteEmp != null)
		{
			service.delete(deleteEmp);
		}
	}

	// find by name
	@RequestMapping(value = "name/{name}", method = RequestMethod.GET)
	public List<Employee> findByName(@PathVariable String name) 
	{
		return service.findByName(name);
	}
	
	// find by surname
	@RequestMapping(value = "surname/{surname}", method = RequestMethod.GET)
	public List<Employee> findBySurname(@PathVariable String surname) 
	{
		return service.findBySurname(surname);
	}
	
	// find by start date
	@RequestMapping(value = "startDate/{startDate}", method = RequestMethod.GET)
	public List<Employee> findByStartDate(@PathVariable String startDate)//@DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate) 
	{
		return service.findByStartDate(startDate);
	}	
	
	// find by email
	@RequestMapping(value = "email/{email}", method = RequestMethod.GET)
	public Employee findByEmail(@PathVariable String email) 
	{
		return service.findByEmail(email);			
	}
}