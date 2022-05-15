package com.assetManagement.business.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.assetManagement.business.LoginPageBusiness;
import com.assetManagement.entities.User;
import com.assetManagement.model.ReturnModel;

@Service
public class LoginPageBusinessImpl extends BaseManager implements LoginPageBusiness {

	@Override
	public ReturnModel login(String username, String password) {
		List<String> errorList = new ArrayList();
		ReturnModel returnModel = new ReturnModel(null, errorList);
		returnModel.setErrorList(errorList);
		
		validate(username, password, errorList);
		
		return returnModel;
	}
	
	private boolean validate(String username, String password, List<String> errorList) {
		boolean valid = true;
		User user = serviceHelper.getUserService().findByEmail(username);
		
		if(user == null) {
			String result = "Account not found";
	    	System.out.println(result);
			errorList.add(result);
			valid = false;
		}
		
		return valid;
	}

}
