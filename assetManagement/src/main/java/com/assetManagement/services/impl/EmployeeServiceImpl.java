package com.assetManagement.services.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assetManagement.entities.Employee;
import com.assetManagement.excptions.ResourceNotFoundException;
import com.assetManagement.repositories.EmployeeRepo;
import com.assetManagement.services.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeRepo employeeRepo;

	@Override
	public Employee addEmployee(Employee employee) {
		employee = employeeRepo.save(employee);
		return employee;
	}

	@Override
	public List<Employee> findByName(String name) throws ResourceNotFoundException {
		List<Employee> list = employeeRepo.findByName(name);
		if (list != null && !list.isEmpty()) {
			return list;
		} else {
			throw new ResourceNotFoundException("User is not found");
		}

	}

	@Override
	public List<Employee> findBySurname(String surname) throws ResourceNotFoundException {
		List<Employee> list = employeeRepo.findBySurname(surname);
		if (list != null && !list.isEmpty()) {
			return list;
		} else {
			throw new ResourceNotFoundException("Cannot find employee");
		}
	}

	@Override
	public Employee findByEmail(String email) throws ResourceNotFoundException {
		Employee employee = employeeRepo.findByEmail(email);
		if (employee != null ) {
			return employee;
		} else {
			throw new ResourceNotFoundException("Cannot find email");
		}
	}

	@Override
	public List<Employee> findByStartDate(Date startDate) throws ResourceNotFoundException {
		List<Employee> list = employeeRepo.findByStartDate(startDate);
		if (list != null && !list.isEmpty()) {
			return list;
		} else {
			throw new ResourceNotFoundException("Cannot find start date");
		}
	}

	@Override
	public Employee saveEmployee(Employee employee) {
		 employee = employeeRepo.save(employee);
		if (employee != null) {
			return employee;
		} else {
			throw new ResourceNotFoundException("Unexpected error while creating employee");
		}
	}

	
		
	
}
