package com.assetManagement.services;

import static org.junit.Assert.assertNotNull;

import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.assetManagement.entities.Employee;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EmployeeServiceImplTest{

@Autowired
 private EmployeeService employeeService; 
		
	 	@Before
	    public void CreateEmployee() {
	        Employee employee1 = new Employee("Lutho", "Lwethu", "Lutho@gmail.com", new Date(), 15646);
	        Employee employee2 = new Employee("Lindo", "Kuhle", "Lindo@gmail.com", new Date(), 45846);
	        Employee employee3 = new Employee("Jabu", "Lile", "Jabu@gmail.com", new Date(), 89470);
	        
//	        employeeService.saveEmployee(employee1);
//	        employeeService.saveEmployee(employee2);
//	        employeeService.saveEmployee(employee3);    
	  }
	 	@Test
	 	public void testFindByName(){
	 	List<Employee> employees = employeeService.findByName("Lutho");
	 	assertNotNull(employees);
	 	}
	 	@Test
	 	public void testFindBySurname(){
	 	List<Employee> employees = employeeService.findBySurname("Lwethu");
	 	assertNotNull(employees);
	 	}
	 	@Test
	 	public void testFindByEmail(){
	 	Employee employees = employeeService.findByEmail("Lutho@gmail.com");
	 	assertNotNull(employees);
	 	}
	 	@Test
	 	public void testFindByStartDate(){
	 	List <Employee> employees = employeeService.findByStartDate(new Date());
	 	assertNotNull(employees);
	 	}
}