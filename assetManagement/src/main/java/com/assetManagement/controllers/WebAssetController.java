package com.assetManagement.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebAssetController 
{
	@RequestMapping(value = "/asset")
    public String asset() 
	{
		return "asset.html";
	}
	
	@RequestMapping(value = "/employee")
    public String employee() 
	{
		return "employee.html";
	}
	
	@RequestMapping(value = "/assetAssigned")
    public String assetAssigned() 
	{
		return "assetAssigned.html";
	}

}
