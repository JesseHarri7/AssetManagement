package com.assetManagement.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

//@RequestMapping(value = "/pages")
@Controller
public class WebAssetController 
{
	@RequestMapping(value = "/pages/asset")
    public String asset() 
	{
		return "/pages/asset.html";
	}
	
	@RequestMapping(value = "/pages/employee")
    public String employee() 
	{
		return "/pages/employee.html";
	}
	
	@RequestMapping(value = "/pages/employee-history")
    public String empHistory() 
	{
		return "/pages/empHistory.html";
	}
	
	@RequestMapping(value = "/pages/assetAssigned")
    public String assetAssigned() 
	{
		return "/pages/assetAssigned.html";
	}
	
	@RequestMapping(value = "/pages/asset-history")
    public String assetHistory() 
	{
		return "/pages/asset-History.html";
	}
	
	@RequestMapping(value = "/pages/assetAssigned-history")
    public String assetAssignedHistory() 
	{
		return "/pages/assetAssigned-history.html";
	}
	
	@RequestMapping(value = "/pages/index")
    public String index() 
	{
		return "/pages/index.html";
	}
	
	@RequestMapping(value = "/pages/home")
    public String home() 
	{
		return "/pages/home.html";
	}
	
	@RequestMapping(value = "/pages/user")
    public String user() 
	{
		return "/pages/user.html";
	}
	
	@RequestMapping(value = "/pages/user-history")
    public String userHistory() 
	{
		return "/pages/userHistory.html";
	}
	
	/*@RequestMapping(value = "/assetManagement/error")
    public String Error403() 
	{
		return "/pages/403.html";
	}*/
	
}
