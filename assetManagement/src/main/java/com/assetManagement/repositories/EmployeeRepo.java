package com.assetManagement.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.assetManagement.entities.Employee;


	public interface EmployeeRepo extends CrudRepository<Employee, Long>  {
	    List<Employee> findByName(Employee employees);
	    List<Employee> findByName(String name);
	    List<Employee> findBySurname(String surname);
	    Employee findByEmail(String email);
	    List<Employee> findByStartDate(Date startDate);
	    List<Employee> findByActive(String active);
	   // List<Employee> findHistory(String history);
	    @Modifying(clearAutomatically = true)
	    @Query("update Employee employee set employee.active =:active where employee.employeeID =:employeeID")
	    Integer deleteEmployee(@Param("employeeID") Long employeeID, @Param("active") String active);
}

