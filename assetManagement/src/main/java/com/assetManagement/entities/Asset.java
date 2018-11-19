package com.assetManagement.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.SQLDelete;

@Entity
@Table(name = "asset", catalog = "management")
@SQLDelete(sql = "UPDATE Asset set state = 'D' WHERE asset_id = ?")
public class Asset implements Serializable
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Long assetId;
	
	@Column(unique=true)
	private Long assetCode;
	
	private String name;
	private String description;
	private String brand;
	private String datePurchased;
	private String status;
	
	private String state = "A";

	public Asset() {}

	public Asset(Long assetCode, String name, String desc, String brand, String datePur, String status)
	{
		this.assetCode = assetCode;
		this.name = name;
		this.description = desc;
		this.brand = brand;
		this.datePurchased = datePur;
		this.status = status;
	}
	
	public Asset(String name)
	{
		this.name = name;
	}

	public Long getAssetId() 
	{
		return assetId;
	}

	public void setAssetId(Long assetId) 
	{
		this.assetId = assetId;
	}
	
	public Long getAssetCode() 
	{
		return assetCode;
	}

	public void setAssetCode(Long assetCode) 
	{
		this.assetCode = assetCode;
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

	public String getState() 
	{
		return state;
	}

	public void setState(String state) 
	{
		this.state = state;
	}

}