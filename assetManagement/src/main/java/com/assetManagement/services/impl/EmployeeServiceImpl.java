package com.assetManagement.services.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assetManagement.entities.Employee;
import com.assetManagement.entities.User;
import com.assetManagement.excptions.ResourceNotFoundException;
import com.assetManagement.repositories.EmployeeRepo;
import com.assetManagement.services.EmployeeService;

@Service
public abstract class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeRepo employeeRepo;
	
	@Override
	public List<Employee> findByName(String name) throws ResourceNotFoundException {
		List<Employee> list = employeeRepo.findByName(name);
		if (list != null && !list.isEmpty()) {
			return list;
		}else {
			throw new ResourceNotFoundException("User is not found");
		}
		
	}

	@Override
	public List<Employee> findBySurname(String surname) throws ResourceNotFoundException {
		List<Employee> list =  employeeRepo.findBySurname(surname);
		if (list != null && !list.isEmpty()) {
		return list;
		}else {
		throw new ResourceNotFoundException("Cannot find surname");
	}
	}
	@Override
	public String findByEmail(String email) throws ResourceNotFoundException {
		Employee Employee =  employeeRepo.findByEmail(email);
		if (email != null && !email.isEmpty()) {
		return email;
		}else {
		throw new ResourceNotFoundException("Cannot find email");
	}
	}

	@Override
	public List<Employee> findByStartDate(LocalDate startDate) throws ResourceNotFoundException{
		List <Employee> list =  employeeRepo.findByStartDate(startDate);
		if (list != null && !list.isEmpty()) {
		return list;
		}else {
		throw new ResourceNotFoundException("Cannot find start date");
	}
	}



}
