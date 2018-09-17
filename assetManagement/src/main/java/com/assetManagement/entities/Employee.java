package com.assetManagement.entities;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.io.Serializable;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;

@Entity
@Table(name = "Employee")

public class Employee implements Serializable {
    String name,surname,email;
    LocalDate startDate;
    @Id
    Long EmployeeID;
    private Long id;

    public Employee() {
    }
    
    public Employee(String name,String surname, String email,LocalDate startDate,Long EmployeeID){
    this.name = name;
    this.surname =  surname;
    this.email = email;
    this.startDate = startDate;
    this.EmployeeID = EmployeeID;
    }
    
    public String getName(){
    return name;
    }
    
    public String getSurname(){
    return surname;
    }
    
    public String getEmail(){
    return email;
    }
    
    public LocalDate getStartDate(){
        return startDate;
    }
    
    public Long EmployeeID(){
    return EmployeeID;
    }
}
