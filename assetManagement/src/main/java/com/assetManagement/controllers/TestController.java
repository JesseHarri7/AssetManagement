package com.assetManagement.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class TestController {
	
	@RequestMapping(value = "/test2", method= {RequestMethod.GET})
    public ModelAndView getTest() {
		ModelAndView page = new ModelAndView("test");
		return page;
	}
}

