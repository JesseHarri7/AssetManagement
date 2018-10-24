package com.assetManagement.controllers;

import java.awt.PageAttributes.MediaType;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.assetManagement.entities.User;
import com.assetManagement.repositories.UserRepo;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)

public class UserControllerTest {

    private MockMvc mvc;
 
    @Mock
    private UserRepo userRepo;
 
    @InjectMocks
    private UserController userController;
 
    // This object will be magically initialized by the initFields method below.
    private JacksonTester<User> jsonUser;
 
   
 

}
