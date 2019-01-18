package com.assetManagement.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;


@Entity
@Table(name = "assetAsset", catalog = "management")
//, prev_asset = (SELECT CONCAT(asset_code, '_', name) FROM asset WHERE asset_code = management.asset_asset.asset_code)
@SQLDelete(sql = "UPDATE asset_asset set state = 'D', unassign_date = CURDATE() WHERE asset_asset_id = ?")
@Where(clause="state <> 'D'")
public class AssetAsset implements Serializable
{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator="increment")
	@GenericGenerator(name="increment", strategy = "increment")
	private Long assetAssetId;
	 
	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "asset_code", nullable = false, referencedColumnName="assetCode")
	private Asset assetOne;
	
	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "asset_component", nullable = false)//, referencedColumnName="assetCode")
	private Asset assetComponent;
	
	private String assignDate;
	private String unassignDate;
	private String prevAsset;

	private String state = "A";
	
	public AssetAsset() {}

	public AssetAsset(Asset assetOne, Asset assetComponent, String assignDate) 
	{
		this.assetOne = assetOne;
		this.assetComponent = assetComponent;
		this.assignDate = assignDate;
	}

	public Long getId() 
	{
		return assetAssetId;
	}

	public void setId(Long assetAssetId) 
	{
		this.assetAssetId = assetAssetId;
	}

	public Asset getAssetOne() 
	{
		return assetOne;
	}

	public void setAssetOne(Asset assetOne) 
	{
		this.assetOne = assetOne;
	}

	public Asset getAssetComponent() 
	{
		return assetComponent;
	}

	public void setAssetComponent(Asset assetTwo) 
	{
		this.assetComponent = assetTwo;
	}

	public String getAssignDate() 
	{
		return assignDate;
	}

	public void setAssignDate(String moveDate) 
	{
		this.assignDate = moveDate;
	}

	public String getUnassignDate() 
	{
		return unassignDate;
	}

	public void setUnassignDate(String unassignDate) 
	{
		this.unassignDate = unassignDate;
	}

	public String getPrevAsset() 
	{
		return prevAsset;
	}

	public void setPrevAsset(String prevAsset) 
	{
		this.prevAsset = prevAsset;
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
