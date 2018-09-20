package com.assetManagement.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name = "asset", catalog = "management")
public class Asset implements Serializable
{

	@Id
	private long assetId;
	private String name;
	private String description;
	private String brand;
	private String datePurchased;
	private String status;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "assets")
	private Set<AssetAssigned> assigned = new HashSet<AssetAssigned>(0);
	
	public Asset() {}

	public Asset(String name, String desc, String brand, String datePur, String status)
	{
		this.name = name;
		this.description = desc;
		this.brand = brand;
		this.datePurchased = datePur;
		this.status = status;
	}

	public long getAssetId() 
	{
		return assetId;
	}

	public void setAssetId(long assetId) 
	{
		this.assetId = assetId;
	}

	public String getName() 
	{
		return name;
	}

	public void setName(String name) 
	{
		this.name = name;
	}

	public String getDescription() 
	{
		return description;
	}

	public void setDescription(String description) 
	{
		this.description = description;
	}

	public String getBrand() 
	{
		return brand;
	}

	public void setBrand(String brand) 
	{
		this.brand = brand;
	}

	public String getDatePurchased() 
	{
		return datePurchased;
	}

	public void setDatePurchased(String datePurchased) 
	{
		this.datePurchased = datePurchased;
	}

	public String getStatus() 
	{
		return status;
	}

	public void setStatus(String status) 
	{
		this.status = status;
	}
	
	public Set<AssetAssigned> getAssigned()
	{
		return assigned;
	}
	
	public void setAssigned(Set<AssetAssigned> assigned)
	{
		this.assigned = assigned;
	}

}