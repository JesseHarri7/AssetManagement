package com.assetManagement.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.assetManagement.entities.Employee;
import com.assetManagement.entities.User;
import com.assetManagement.services.EmployeeService;
import com.assetManagement.services.impl.EmployeeServiceImpl;
@RestController
@RequestMapping("assetManagement/employee/")
public class EmployeeController {
	@Autowired
	private EmployeeServiceImpl service;
			
			
					
			// create
			@RequestMapping(value = "create", method = RequestMethod.POST)
			@ResponseStatus(HttpStatus.CREATED)
			public Employee create(@RequestBody Employee employee) {
				return service.addEmployee(employee);
			}
	
			// find by name
			@RequestMapping(value = "name/{name}", method = RequestMethod.GET)
			public ResponseEntity<List<Employee>> findByName(@PathVariable String name) {
			List<Employee> employee = service.findByName(name);
			
			if (employee == null) {
				return  new ResponseEntity<List<Employee>>(HttpStatus.NOT_FOUND);
			}
			
			return new ResponseEntity<List<Employee>>(employee, HttpStatus.OK);
			}	
			// find by surname
			@RequestMapping(value = "surname/{surname}", method = RequestMethod.GET)
			public ResponseEntity<List<Employee>> findBySurname(@PathVariable String surname) {
			List<Employee> employee = service.findBySurname(surname);
			
			if (employee == null) {
				return  new ResponseEntity<List<Employee>>(HttpStatus.NOT_FOUND);
			}
			
			return new ResponseEntity<List<Employee>>(employee, HttpStatus.OK);
			}	
			// find by start date
			@RequestMapping(value = "startDate/{startDate}", method = RequestMethod.GET)
			public ResponseEntity<List<Employee>> findByStartDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate) {
				List<Employee> employee = service.findByStartDate(startDate);
				
				if (employee == null) {
					return  new ResponseEntity<List<Employee>>(HttpStatus.NOT_FOUND);
				}
				
				return new ResponseEntity<List<Employee>>(employee, HttpStatus.OK);
			}	
			
			// find by email
			@RequestMapping(value = "email/{email}", method = RequestMethod.GET)
			public ResponseEntity<Employee> findByEmail(@PathVariable String email) {
				Employee employee = service.findByEmail(email);
				if (employee == null) {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
				
				return new ResponseEntity<Employee>(employee, HttpStatus.OK);			
			}
			
			// find All
						@RequestMapping(value = "findAll", method = RequestMethod.GET)
						@ResponseBody
						public List<Employee> findAll() {
							return service.findAll();
							}
}