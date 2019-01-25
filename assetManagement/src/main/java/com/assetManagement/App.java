package com.assetManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App 
{
   public static void main(String args[])
   {
	   SpringApplication.run(App.class, args); 
	   System.out.print("SERVER ON");
   }
}