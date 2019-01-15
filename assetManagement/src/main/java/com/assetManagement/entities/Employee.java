package com.assetManagement.entities;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity

@Table(name = "Employees")

public class Employee implements Serializable {

	@Id
	private long employeeID;
	
	
	@Column(name = "Name")
	private String name;
	
	@Column(name = "Active")
	private String active = "Active";

	@Column(name = "Surname")
	private String surname;

	@Column(name = "Email", unique = true)
	private String email;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "Date")
	private Date startDate;


	
	//@Column(name = "Start_Date")
	//private Date startDate;*/
//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "AssetAssigned")
//    private Employee employee;
//    

	public Employee() {
	}

	public Employee(String name, String surname, String email, Date startDate, long employeeID) {
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.startDate = startDate;
		this.employeeID = employeeID;

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public long getEmployeeID() {
		return employeeID;
	}


	@Override
	public String toString() {
		return "Employee [employeeID=" + employeeID + ", name=" + name + ", surname=" + surname + ", email=" + email
				+ ", startDate=" + startDate + "]";
	}


	
	/*
	 * public Employee getEmployee() { return employee; }
	 * 
	 * public void setEmployee(Employee employee) { this.employee = employee;
	 * 
	 * }
	 */
	
	

}