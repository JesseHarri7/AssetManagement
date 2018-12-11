package com.assetManagement.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.assetManagement.entities.User;


public interface UserRepo extends CrudRepository<User, Long>  {
	    List<User> findByFirstName(String name);
	    User findByEmail(String email);
	    User findByPassword(String password);
	    User findByUsername(String username);
	   // User findByID(long userID);
	    @Modifying(clearAutomatically = true)
	    @Query("update User user set user.active =:active where user.userID =:userID")
	    Integer deleteUser(@Param("userID") Long userID, @Param("active") String active);
		List<User> findByActive(String active);
		
		
		
		//List <User> findHistory();	
}
