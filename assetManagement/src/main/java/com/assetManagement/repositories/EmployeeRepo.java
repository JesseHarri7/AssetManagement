package com.assetManagement.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.assetManagement.entities.Employee;


public interface EmployeeRepo extends CrudRepository<Employee, Long>
{	
	List<Employee> findByName(String name);
	
    List<Employee> findBySurname(String surname);
    
    Employee findByEmail(String email);
    
    List<Employee> findByStartDate(String startDate);
    
    Employee findByEmployeeID(Long id);
    
    @Query(value = "SELECT * FROM employees", nativeQuery = true)
   	List<Employee> findAllHistory();
   	
   	@Query(value = "SELECT * FROM employees WHERE state = 'A'", nativeQuery = true)
   	List<Employee> findAll();
}

