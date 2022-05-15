package com.assetManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App 
{
   public static void main(String args[])
   {
	   SpringApplication.run(App.class, args); 
	   System.out.println("SERVER ON");
	   System.out.println("http://localhost:8080/assetManagement/pages/index");
   }
}