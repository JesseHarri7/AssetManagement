/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.assetManagement.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
@Entity
@Table(name = "User")
public class User implements Serializable{
String name,email,password;
@Id
    Long userID;
    private Long id;
    
public User(){}

public User(String name,String email,String password,Long userID){
this.name = name;
this.email = email;
this.password = password;
this.userID  = userID;
}
public String getName(){
return name;
}
public String getEmail(){
return email;
}
public String getPassword(){
return password;
}
public Long userID(){
return userID;
}
}
