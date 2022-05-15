package com.assetManagement.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import com.assetManagement.entities.Asset;
import com.assetManagement.entities.Employee;

@Component
//@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.INTERFACES)
public class AssignModel {
	
	Asset asset;
	List<Asset> assetList = new ArrayList<>(); 
	Employee employee;
	
	public Asset getAsset() {
		return asset;
	}
	public void setAsset(Asset asset) {
		this.asset = asset;
	}
	public List<Asset> getAssetList() {
		return assetList;
	}
	public void setAssetList(List<Asset> assetList) {
		this.assetList = assetList;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	
	public AssignModel getAssignModel() {
		AssignModel assignModel = new AssignModel();
		assignModel.setAsset(this.asset);
		assignModel.setEmployee(this.employee);
		assignModel.setAssetList(this.assetList);
		
		return assignModel;
	}
	
	public void clearAssignModelSession() {
		this.asset = null;
		this.assetList = new ArrayList<>();
		this.employee = null;
	}
}
