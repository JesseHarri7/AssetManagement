package com.assetManagement.entities;

import static org.junit.Assert.*;
import org.junit.Test;
import junit.framework.Assert;


public class UserTest {

	 User user = new User();
	
	@Test
	public void testEmployee() 
	{
		user.setName("Lutho");
		user.setPassword("Mvinjelwa");
		user.setEmail("Alulutho2010@saratoga.com");
		user.setUserID(990720093L);
		
		assertNotNull(user);
		assertEquals(990720093L, user.getUserID());
		assertEquals("Lutho", user.getName());
		assertEquals("Mvinjelwa", user.getPassword());
		assertEquals("Alulutho2010@saratoga.com", user.getEmail());
	}
}
