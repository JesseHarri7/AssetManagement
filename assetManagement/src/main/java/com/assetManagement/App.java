package com.assetManagement;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import util.HibernateUtil;
import com.assetManagement.entities.*;

@SpringBootApplication
public class App 
{
   public static void main(String args[])
    {
	   SpringApplication.run(App.class, args); 
	   System.out.print("test");
	  
	   /*
	   Configuration config = new Configuration().configure().addAnnotatedClass(Asset.class);
	   SessionFactory sf = config.buildSessionFactory();
	   Session ses = sf.openSession();
	   */
	   
	   Session session = HibernateUtil.getSessionFactory().openSession();
	   
       Employee employee = new Employee();
       
    }
}