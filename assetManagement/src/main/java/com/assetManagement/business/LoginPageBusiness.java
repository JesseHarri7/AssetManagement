package com.assetManagement.business;

import com.assetManagement.model.ReturnModel;

public interface LoginPageBusiness {
	
	ReturnModel login(String username, String password);
	
}
