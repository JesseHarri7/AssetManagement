package com.assetManagement.services.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assetManagement.entities.Employee;
import com.assetManagement.excptions.ResourceNotFoundException;
import com.assetManagement.repositories.EmployeeRepo;
import com.assetManagement.services.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService 
{
	
	@Autowired
	private EmployeeRepo repo;

	@Override
	public Employee create(Employee entity) 
	{
		Employee employee = repo.findByEmployeeID(entity.getEmployeeID());
		
		if(employee == null)
		{
			return employee;
		}
		else
		{
			return null;
		}
	}

	@Override
	public List<Employee> findByName(String name) throws ResourceNotFoundException 
	{
		List<Employee> emp = repo.findByName(name);
		
		if (emp != null && !emp.isEmpty())
		{
			return emp;
		}
		else 
		{
			throw new ResourceNotFoundException("Cannot find employee by Name");
		}

	}

	@Override
	public List<Employee> findBySurname(String surname) throws ResourceNotFoundException 
	{
		List<Employee> emp = repo.findBySurname(surname);
		
		if (emp != null && !emp.isEmpty()) 
		{
			return emp;
		}
		else 
		{
			throw new ResourceNotFoundException("Cannot find employee by Surname");
		}
	}

	@Override
	public Employee findByEmail(String email) throws ResourceNotFoundException 
	{
		Employee emp = repo.findByEmail(email);
		
		if (emp != null ) 
		{
			return emp;
		}
		else 
		{
			throw new ResourceNotFoundException("Cannot find employee by email");
		}
	}

	@Override
	public List<Employee> findByStartDate(Date startDate) throws ResourceNotFoundException 
	{
		List<Employee> emp = repo.findByStartDate(startDate);
		
		if (emp != null && !emp.isEmpty()) 
		{
			return emp;
		}
		else 
		{
			throw new ResourceNotFoundException("Cannot find employee by start date");
		}
	}

	public List<Employee> readAll() 
	{
		List<Employee> eList = new ArrayList<Employee>();
		Iterable<Employee> employees = repo.findAll();
		
		for (Employee e : employees)
		{
			eList.add(e);
		}
		return eList;
	}
	
	@Override
	public Employee readById(Long id) 
	{
		Employee emp = repo.findByEmployeeID(id);
		if (emp == null)
		{
			return null;
		}
		else
		{	
			return emp;
		}
		
	}

	@Override
	public Employee update(Employee entity) 
	{
		Employee emp = repo.findByEmployeeID(entity.getEmployeeID());
		if (emp == null)
		{
			return null;
		}
		else
		{
			return repo.save(entity);
		}
	}

	@Override
	public void delete(Employee entity) 
	{
		if (entity != null)
		{
			repo.delete(entity);
		}		
	}

	@Override
	public List<Employee> findAllHistory() 
	{
		List<Employee> empList = new ArrayList<Employee>();
		Iterable<Employee> emps = repo.findAllHistory();
		
		for (Employee e : emps)
		{
			empList.add(e);
		}
		return empList;
	}

}
