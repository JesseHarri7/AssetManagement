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
@Table(name = "assetAssigned", catalog = "management")
@SQLDelete(sql = "UPDATE asset_assigned set state = 'D', unassign_date = CURDATE() WHERE asset_assigned_id = ?")
@Where(clause="state <> 'D'")
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
	@JoinColumn(name = "asset_code", nullable = false, referencedColumnName="assetCode")
	private Asset assets;
	
	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "employeeID", nullable = false)
	private Employee employees;
	
	private String moveDate;
	private String unassignDate;

	private String state = "A";
	
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

	public String getState() 
	{
		return state;
	}

	public void setState(String state) 
	{
		this.state = state;
	}
	
	public String getUnassignDate() {
		return unassignDate;
	}

	public void setUnassignDate(String unassignDate) {
		this.unassignDate = unassignDate;
	}
	
}
