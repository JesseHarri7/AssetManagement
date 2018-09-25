package com.assetManagement.services;

import java.time.LocalDate;
import java.util.List;

import com.assetManagement.entities.Employee;
import com.assetManagement.excptions.ResourceNotFoundException;

public interface EmployeeService {
	 	
		List<Employee> findByName(String name) throws ResourceNotFoundException;
	    List<Employee> findBySurname(String surname) throws ResourceNotFoundException;
	    List<Employee> findByStartDate(LocalDate startDate) throws ResourceNotFoundException;
		String findByEmail(String email) throws ResourceNotFoundException;
	    
	    
}
