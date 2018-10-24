package com.assetManagement.test.services;

import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.assetManagement.entities.User;
import com.assetManagement.services.impl.UserServiceImpl;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceImplTest {
	
	
	@Autowired
	private UserServiceImpl userService; 
	
 	@Before
    public void CreateUser() {
        User user1 = new User("Lutho", "LuthoL", "Lutho@gmail.com", 99072003, "Lutholwethu");
        User user2 = new User("Lindo", "LindoK", "Lindo@gmail.com", 99562483, "Lindokuhle");
        User user3 = new User("Jabu", "JabuL", "Jabu@gmail.com", 99658959, "Jabulile");
        
        userService.saveUser(user1);
        userService.saveUser(user2);
        userService.saveUser(user3);    
  }
 	@Test
 	public void testFindByName(){
 	List<User> user = userService.findByName("Lutho");
 	//assertNotNull(user);
 	}
 	@Test
 	public void testFindByUsername(){
 	User user = userService.findByUsername("Lwethu");
 	//assertNotNull(user);
 	}
 	@Test
 	public void testFindByEmail(){
 	User user = userService.findByEmail("Lutho@gmail.com");
 	//assertNotNull(user);
 	}
 	
		 
}
