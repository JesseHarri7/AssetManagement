package com.assetManagement.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.assetManagement.entities.User;


public interface UserRepo extends CrudRepository<User, Long>  
{
	List<User> findByFirstName(String name);
	
	List<User> findByLastName(String lastName);
	
    User findByEmail(String email);
    
    User findByPassword(String password);
    
    User findByUserID(Long Id);
    
    @Query(value = "SELECT * FROM user", nativeQuery = true)
	List<User> findAllHistory();
	
	@Query(value = "SELECT * FROM user WHERE state = 'A'", nativeQuery = true)
	List<User> findAll();
	
}
