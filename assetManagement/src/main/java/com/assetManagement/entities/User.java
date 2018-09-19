/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.assetManagement.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.mapping.Set;

import java.io.Serializable;
@Entity
@Table(name = "User")
public class User implements Serializable{

@Id
    Long userID;
    
	@Column(name = "User_ID")
    private Long id;
    
	@Column(name = "Username")
    private String username;
    
	@Column(name = "Password")
    private String password;
    
	@Column(name = "Email")
    private String email;
    
	@Column(name = "Name")
    private String name;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employeeID")
    private Employee employee;
    
    private User user;
	
    
public User(){}

public User(String name,String email,String password,Long userID,String username){
this.name = name;
this.email = email;
this.password = password;
this.userID  = userID;
this.username = username;
}


public String getName(){
return name;

}

public void setName(String name) {
    this.name = name;		
}


public String getEmail(){
return email;
}

public void setEmail(String email) {
    this.email = email;		
}

public String getPassword(){
	return password;
}

public void setPassword(String password) {
    this.password = password;		
}

public Long userID(){
return userID;
}

public void setUserID(Long userID) {
    this.userID = userID;		
    }

public User getUser() {
	return user;
}

public void setEmployee(Employee employee) {
	this.user = user;
}


}
