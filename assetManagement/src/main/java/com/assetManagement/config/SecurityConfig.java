package com.assetManagement.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter 
{
	@Autowired
	DataSource dataSource;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}	

	@Override
	protected void configure(HttpSecurity http) throws Exception 
	{
		//Set what is restricted, all requests to be blocked unless it is from anyone with this role
		http.antMatcher("/pages/**").authorizeRequests().anyRequest().hasRole("USER")
//			.antMatchers("/assetManagement/res/**").permitAll()//.anyRequest().permitAll()
			//Set the login page
			.and().formLogin().loginPage("/pages/index")
			//Redirect if failed login.
			.failureUrl("/index?error=1")
			//Url that is POSTed from the login form to attempt login and default page to redirect to if successful
			.loginProcessingUrl("/pages/login*").defaultSuccessUrl("/pages/asset", true)
			//URL from webpages to logout
			.permitAll().and().logout().logoutUrl("/pages/logout")
			//Redirect back to login page
			.logoutSuccessUrl("/pages/index")
			.and()
			//Redirect if there are errors with the URLS
			.exceptionHandling().accessDeniedPage("/error");
		http.csrf().disable();
		
		//Allow access to the resources folder
		http.authorizeRequests()
			.antMatchers("/res/**").permitAll();
		
		http.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
			.maximumSessions(1)
			.expiredUrl("/pages/index?expired");

	}

	//Find username and password from the database and get the role of the user
	@Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception 
	{	
		auth.jdbcAuthentication().dataSource(dataSource).passwordEncoder(passwordEncoder())
			.usersByUsernameQuery("select username, password,enabled from management.user where username=?")
			.authoritiesByUsernameQuery("select username, role from management.user_roles where username=?");
	}

	
	//Set login details
	/*@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
		.inMemoryAuthentication()
			.withUser("jesse").password("{noop}pass").roles("USER");
	}*/
	 
}