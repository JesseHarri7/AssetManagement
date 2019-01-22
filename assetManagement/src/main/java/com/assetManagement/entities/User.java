/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.assetManagement.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.SQLDelete;

@Entity
@Table(name = "User")
@SQLDelete(sql = "UPDATE User set state = 'D' WHERE user_id = ?")
public class User implements Serializable 
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator="increment")
	@GenericGenerator(name="increment", strategy = "increment")
	@Column(name = "User_ID")
	private Long userID;

	@Column(name = "Password")
	private String password;

	@Column(unique=true)
	private String email;

	@Column
	private String firstName;

	@Column
	private String lastName;
	
	@Column
	private String state = "A";
	
	private int enabled = 1;

	public User() {}
	
	public User(String email, String password, String firstN, String lastN)
	{
		this.email = email;
		this.password = password;
		this.firstName = firstN;
		this.lastName = lastN;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getUserID() 
	{
		return this.userID;
	}

	public void setUserID(Long userID) 
	{
		this.userID = userID;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
	public int getEnabled() 
	{
		return enabled;
	}

	public void setEnabled(int enabled) 
	{
		this.enabled = enabled;
	}

}
