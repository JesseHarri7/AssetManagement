package com.assetManagement.repositories;
import org.springframework.data.repository.CrudRepository;

import com.assetManagement.entities.UserRoles;


public interface UserRoleRepo extends CrudRepository<UserRoles, Long>  
{
	UserRoles findByUserRoleId(Long id);
	
	UserRoles findByEmailEmail(String user);
}
