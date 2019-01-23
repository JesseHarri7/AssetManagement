package com.assetManagement.services;

import com.assetManagement.entities.UserRoles;

public interface UserRoleService extends Service<UserRoles, Long>
{	
	UserRoles findByEmail(String user);
}
