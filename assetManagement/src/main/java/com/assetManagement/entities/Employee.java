package com.assetManagement.entities;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.SQLDelete;

@Entity
@Table(name = "Employees")
@SQLDelete(sql = "UPDATE employees set state = 'D', term_date = CURDATE() WHERE id = ?")
public class Employee implements Serializable 
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Long Id;
	
	@Column(unique=true)
	private Long employeeID;

	@Column(name = "Name")
	private String name;
	
	@Column(name = "Surname")
	private String surname;

	@Column(name = "Email", unique = true)
	private String email;
	
//	@Temporal(TemporalType.DATE)
	private String startDate;

	private String termDate;
	
	@Column(name = "State")
	private String state = "A";
	
	//@Column(name = "Start_Date")
	//private Date startDate;*/
//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "AssetAssigned")
//    private Employee employee;
//    

	public Employee() {
	}

	public Employee(String name, String surname, String email, String startDate, long employeeID) {
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

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public long getEmployeeID() {
		return employeeID;
	}
	
	public void setEmployeeID(long employeeID) {
		this.employeeID = employeeID;
	}
	
	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public String getTermDate() {
		return termDate;
	}

	public void setTermDate(String termDate) {
		this.termDate = termDate;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
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