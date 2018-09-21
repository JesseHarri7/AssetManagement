package com.assetManagement.repositories;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.assetManagement.entities.User;


	public interface UserRepo extends CrudRepository<User, Long>  {
	    List<User> findByName(String name);
	    List<User> findByEmail(String email);
	    User findByPassword(String password);
	    User findByUsername(String username);
	
}
