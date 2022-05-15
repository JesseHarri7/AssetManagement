package com.assetManagement.business.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.assetManagement.Util.ServiceHelper;

public class BaseManager {

	@Autowired
	ServiceHelper serviceHelper;

	public ServiceHelper getServiceHelper() {
		return serviceHelper;
	}

	public void setServiceHelper(ServiceHelper serviceHelper) {
		this.serviceHelper = serviceHelper;
	}
	
}
