package com.assetManagement.test.repositories;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.repository.CrudRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.*;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.assetManagement.entities.Employee;
import com.assetManagement.entities.User;
import com.assetManagement.repositories.UserRepo;


@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepoTest {
	
	@Autowired
	private UserRepo userRepo;
	
	
	@Before
	public void testCreateUser() throws Exception{
		
		
			User user = new User();
			
			user.setFirstName("Lutho");
			user.setUsername("Lwethu");
			user.setEmail("Lutho@gmail.com");
			user.setPassword("Lutholwethu");
			
			User result = userRepo.save(user);
			Assert.assertNotNull(result);
		}
	@Test
	public void testUpdateUser() throws Exception{
		User user = userRepo.findByUsername("Lutho");
		
		
		if (user != null)
		{
			user.setUsername("Lwethu");
			User updatedUser = userRepo.save(user);
			Assert.assertEquals(updatedUser.getUsername(),"Lwethu");
			
		}
	}
			public void testReadAllUser() throws Exception{
				Iterable<User> user = userRepo.findAll();
				Assert.assertNotNull(user);	
		}
			
			public void testDeleteUser() throws Exception{
				List<User> users = userRepo.findByFirstName("Lwethu");
				assertNotNull(users);
				User user = users.get(0);
				userRepo.delete(user);
				
				users = userRepo.findByFirstName("Lwethu");
				assertNull(users);
			}
	
	
}
