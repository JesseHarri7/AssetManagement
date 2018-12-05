package com.assetManagement.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user_roles", catalog = "management")
public class UserRoles
{
	@Id
	@GeneratedValue
	private Long userRoleId;
	
	@OneToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "username", nullable = false, referencedColumnName="username")
	private User username;
	private String role;
	
	public UserRoles() {}
	
	public UserRoles(Long id, User username, String role)
	{
		this.userRoleId = id;
		this.username = username;
		this.role = role;
	}

	public Long getUserRoleId() 
	{
		return userRoleId;
	}

	public void setUserRoleId(Long userRoleId) 
	{
		this.userRoleId = userRoleId;
	}

	public User getUsername() {
		return username;
	}

	public void setUsername(User username) 
	{
		this.username = username;
	}

	public String getRole() 
	{
		return role;
	}

	public void setRole(String role) 
	{
		this.role = role;
	}
	
	
}
