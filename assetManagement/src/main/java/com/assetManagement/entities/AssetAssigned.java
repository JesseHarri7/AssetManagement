package com.assetManagement.entities;

import java.io.Serializable;

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
	
	public AssetAssigned() {}

	public AssetAssigned(Asset assets, Employee employees) 
	{
		this.assets = assets;
		this.employees = employees;
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

	
	
}
