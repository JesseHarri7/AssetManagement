package com.assetManagement.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.assetManagement.entities.Employee;


	public interface EmployeeRepo extends CrudRepository<Employee, Long>  {
	    List<Employee> findByName(String name);
	    List<Employee> findBySurname(String surname);
	    Employee findByEmail(String email);
	    List<Employee> findByStartDate(Date startDate);
}

