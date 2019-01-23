package com.assetManagement.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assetManagement.entities.UserRoles;
import com.assetManagement.excptions.ResourceNotFoundException;
import com.assetManagement.repositories.UserRoleRepo;
import com.assetManagement.services.UserRoleService;

@Service
public  class UserRoleServiceImpl implements UserRoleService 
{

	@Autowired
	private UserRoleRepo repo;

	@Override
	public UserRoles create(UserRoles entity)
	{
		UserRoles user = repo.findByUserRoleId(entity.getUserRoleId());
		
		if(user == null)
		{
			return repo.save(entity);
		}
		else
		{
			return null;
		}
		
	}
 
	@Override
	public void delete(UserRoles entity) 
	{
		if (entity != null)
		{
			repo.delete(entity);
		}
	}

	@Override
	public UserRoles readById(Long id) 
	{
		UserRoles user = repo.findByUserRoleId(id);
		
		if (user == null)
		{
			throw new ResourceNotFoundException("Cannot find user by UserId");
		}
		else
		{	
			return user;
		}
	}

	@Override
	public UserRoles update(UserRoles entity) 
	{
		UserRoles user = repo.findByUserRoleId(entity.getUserRoleId());
		
		if (user == null)
		{
			throw new ResourceNotFoundException("Cannot find user to update");
		}
		else
		{
			return repo.save(entity);
		}
	}

	@Override
	public List<UserRoles> readAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<UserRoles> findAllHistory() {
		// TODO Auto-generated method stub
		return null;
	}
}