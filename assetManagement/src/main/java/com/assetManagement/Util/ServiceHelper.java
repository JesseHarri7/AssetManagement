package com.assetManagement.Util;

import javax.annotation.ManagedBean;

import org.springframework.beans.factory.annotation.Autowired;

import com.assetManagement.services.AssetAssetService;
import com.assetManagement.services.AssetAssignedService;
import com.assetManagement.services.AssetService;
import com.assetManagement.services.EmployeeService;
import com.assetManagement.services.UserService;

@ManagedBean
public class ServiceHelper {
	
	@Autowired
	AssetAssetService assetAssetService;
	@Autowired
	AssetAssignedService assetAssignedService;
	@Autowired
	AssetService assetService;
	@Autowired
	EmployeeService employeeService;
	@Autowired
	UserService userService;
	
	public AssetAssetService getAssetAssetService() {
		return assetAssetService;
	}
	public void setAssetAssetService(AssetAssetService assetAssetService) {
		this.assetAssetService = assetAssetService;
	}
	public AssetAssignedService getAssetAssignedService() {
		return assetAssignedService;
	}
	public void setAssetAssignedService(AssetAssignedService assetAssignedService) {
		this.assetAssignedService = assetAssignedService;
	}
	public AssetService getAssetService() {
		return assetService;
	}
	public void setAssetService(AssetService assetService) {
		this.assetService = assetService;
	}
	public EmployeeService getEmployeeService() {
		return employeeService;
	}
	public void setEmployeeService(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}
	public UserService getUserService() {
		return userService;
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}	

}
