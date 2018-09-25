package com.assetManagement.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.assetManagement.entities.Employee;
import com.assetManagement.entities.EmployeeTest;
import com.assetManagement.entities.User;


	public interface EmployeeRepo extends CrudRepository<Employee, Long>  {
	    List<Employee> findByName(String name);
	    List<Employee> findBySurname(String surname);
	    Employee findByEmail(String email);
	    List<Employee> findByStartDate(LocalDate startDate);
	    
	
}

