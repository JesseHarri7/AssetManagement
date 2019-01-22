package com.assetManagement.repositories;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.assetManagement.entities.Employee;

@RunWith(SpringRunner.class)
@DataJpaTest
public class EmployeeRepoTest {
	
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	
	@Before
	public void setUp(){
		 	Employee employee = new Employee();
	       
	        employee.setName("Lutho");
	        employee.setEmail("Lwethu@gmail.com");
	        employee.setSurname("Lutholwethu");
//	        employee.setStartDate(new Date());
	        employeeRepo.save(employee);
	}
	
	
	@Test
	public void testFindByName() {
		Employee employee = new Employee();
		String name = "Lutho";
		List<Employee> employees = employeeRepo.findByName("Lutho");
		assertNotNull(employees);
		assertFalse(employees.isEmpty());
	
		//assertThat(employee.getName()).isEqualTo("Lutho");
		System.out.println("Employees: "+ employees);
		assertTrue(!employees.isEmpty());

	}
	
	
	@Test
	public void testFindBySurname() {
	String surname = "Lutholwethu";		
	List<Employee> employees = employeeRepo.findBySurname("Lutholwethu");
	assertNotNull(employees);
	
	Employee employee = new Employee();
	//assertThat(employee.getSurname()).isEqualTo("Lutholwethu");
	System.out.println("Employees: "+ employees);
	assertTrue(!employees.isEmpty());

	}
	
	@Test
	public void testFindByEmail() {
	String email = "LLwethu@gmail.com";		
	Employee employees = employeeRepo.findByEmail("Lwethu@gmail.com")	;
	
	assertNotNull(employees);
	Employee employee = new Employee();
	//assertThat(employee.getEmail()).isEqualTo("Lwethu@gmail.com");
	System.out.println("Employees: "+ employees);
	

	}
	
	/*@Test
	public void testFindByStartDate() 
	{
		Date startDate = new Date();		
		List<Employee> employees = employeeRepo.findByStartDate(new Date())	;
		assertNotNull(employees);
		Employee employee = new Employee();
		System.out.println("Employees: "+ employees);
	}*/
}
