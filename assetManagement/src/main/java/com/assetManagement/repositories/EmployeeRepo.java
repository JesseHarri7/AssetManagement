package com.assetManagement.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.assetManagement.entities.User;


	public interface EmployeeRepo extends CrudRepository<User, Long>  {
	    List<User> findByName(String name);
	    List<User> findBySurname(String surname);
	    User findByEmail(String email);
	    List<User> findByStartDate(LocalDate startDate);
	    User findByUsername(String username);
	
}

