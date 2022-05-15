package com.assetManagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.assetManagement.business.LoginPageBusiness;
import com.assetManagement.model.AjaxResponseBody;
import com.assetManagement.model.ModelMappings;
import com.assetManagement.model.ReturnModel;

@RestController
public class LoginPageController {
	
	@Autowired
	LoginPageBusiness business;
	
	@RequestMapping(value = "login/{username}/{password}", method = RequestMethod.GET)
	public AjaxResponseBody login(@PathVariable String username, @PathVariable String password) {
		ReturnModel returnModel = business.login(username, password);
		AjaxResponseBody result = new AjaxResponseBody();
		
		if(returnModel.getErrorList().isEmpty()) {
			result.setStatus(ModelMappings.TRUE);
			result.setMsg("Success!");
		}else {
			result.setStatus(ModelMappings.FALSE);
			result.setMsg("Error! " + returnModel.getStringErrorList());
			result.setResult(returnModel.getErrorList());
		}

		//AjaxResponseBody will be converted into json format and send back to the request.
		return result;
	}

}
