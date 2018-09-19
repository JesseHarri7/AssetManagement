package com.assetManagement.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "assetAssigned", catalog = "management")
public class AssetAssigned implements Serializable
{
	
	private Asset assets;
	private Employee employees;
	private String moveDate;
	
	public AssetAssigned() {}

	public AssetAssigned(Asset assets, Employee employees, String moveDate) 
	{
		this.assets = assets;
		this.employees = employees;
		this.moveDate = moveDate;
	}

	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "assetId", nullable = false)
	public Asset getAssets() 
	{
		return assets;
	}

	public void setAssets(Asset assets) 
	{
		this.assets = assets;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "employeeId", nullable = false)
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
