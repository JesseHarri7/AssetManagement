/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

/**
 *
 * @author Lutholwethum
 */
public class Employee {
    
   
    String name,surname,email;
    LocalDate startDate;
    
    public Employee(String name,String surname, String email,LocalDate startDate){
    this.name = name;
    this.surname =  surname;
    this.email = email;
    this.startDate = startDate;
    }
    
     public void setName(String name){
    this.name = name;
    }
    
    public String getName(){
    return name;
    }
    
     public void setSurname(String surname){
    this.surname = surname;
    }
    
    public String getSurname(){
    return surname;
    }
     public void setEmail(String email){
    this.email = email;
    }
    
    public String getEmail(){
    return email;
    }
    
     public void setStartDate(LocalDate startdate){
    this.startDate = startdate;
    }
    
    public LocalDate getStartDate(){
        return startDate;
    }

   
    
}
