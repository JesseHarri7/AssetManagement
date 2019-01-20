package com.assetManagement.services;

import java.util.Date;
import java.util.List;

import com.assetManagement.entities.Employee;
import com.assetManagement.excptions.ResourceNotFoundException;

public interface EmployeeService extends Service<Employee, Long>
{	 	
	List<Employee> findByName(String name) throws ResourceNotFoundException;
	
    List<Employee> findBySurname(String surname) throws ResourceNotFoundException;
    
    List<Employee> findByStartDate(Date startDate) throws ResourceNotFoundException;
    
	Employee findByEmail(String email) throws ResourceNotFoundException;
}
