package com.assetManagement;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
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
	   
    }
}