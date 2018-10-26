package com.assetManagement.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "assetAssigned", catalog = "management")
public class AssetAssigned implements Serializable
{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator="increment")
	@GenericGenerator(name="increment", strategy = "increment")
	private Long assetAssignedId;
	 
	@ManyToOne//(fetch = FetchType.LAZY)
//	@JsonBackReference
	@JoinColumn(name = "assetId", nullable = false)
	private Asset assets;
	
	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "employeeID", nullable = false)
//	@JsonBackReference
	private Employee employees;
	
	private String moveDate;
	
	public AssetAssigned() {}

	public AssetAssigned(Asset assets, Employee employees, String moveDate) 
	{
		this.assets = assets;
		this.employees = employees;
		this.moveDate = moveDate;
	}
	
	public Long getId()
	{
		return assetAssignedId;
	}
	
	public void setId(Long id)
	{
		this.assetAssignedId = id;
	}

	public Asset getAssets() 
	{
		return assets;
	}

	public void setAssets(Asset assets) 
	{
		this.assets = assets;
	}

	public Employee getEmployees() 
	{
		return employees;
	}

	public void setEmployees(Employee employees) 
	{
		this.employees = employees;
	}

	public String getMoveDate() 
	{
		return moveDate;
	}

	public void setMoveDate(String moveDate) 
	{
		this.moveDate = moveDate;
	}
	
}
