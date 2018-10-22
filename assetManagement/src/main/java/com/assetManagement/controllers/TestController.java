package com.assetManagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.assetManagement.services.impl.UserServiceImpl;

@Controller
@RequestMapping("/")
public class TestController {
	@Autowired
	private UserServiceImpl service;
	
	@RequestMapping(value = "/test2", method= {RequestMethod.GET})
    public ModelAndView getTest() {
		ModelAndView page = new ModelAndView("test");
		return page;
	}
	
	@RequestMapping(value = "/loginPage", method= {RequestMethod.GET})
    public ModelAndView getLoginPage() {
		ModelAndView page = new ModelAndView("loginPage");
		
		return page;	
	}
}

