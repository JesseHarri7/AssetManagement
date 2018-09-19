package com.assetManagement.entities;

import static org.junit.Assert.*;
import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class EmployeeTest {

	Employee emp = new Employee();
	
	@Test
	public void testEmployee() {
	emp.setName("Lutho");
	emp.setSurname("Mvinjelwa");
	emp.setEmail("Alulutho2010@saratoga.com");
	emp.setEmployeeID(990720093L);
	
	assertNotNull(emp);
	assertEquals("Lutho", emp.getName());
	assertEquals("Mvinjelwa", emp.getSurname());
	assertEquals("Alulutho2010@saratoga.com", emp.getEmail());
	assertEquals(990720093L, emp.getEmployeeID());
	}

}
