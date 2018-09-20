package com.assetManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.assetManagement.entities.*;

@SpringBootApplication
public class App 
{
   public static void main(String args[])
    {
	   SpringApplication.run(App.class, args);
	   
	   System.out.print("test");
	   
       Employee employee = new Employee();

    }
}