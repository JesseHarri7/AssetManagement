package com.assetManagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.assetManagement.entities.AssetAssigned;
import com.assetManagement.services.AssetAssignedService;

@RestController
@RequestMapping(value = "/assetManagement")
public class AssetAssignedController 
{
	@Autowired
	AssetAssignedService service;
	
		//Find by id
		@RequestMapping(value = "/assetAssigned/{id}", method = RequestMethod.GET)
		public AssetAssigned findById(@PathVariable Long id)
		{
			return service.readById(id);
		}
		
		//insert
		@RequestMapping(value = "/assetAssigned/create", method = RequestMethod.POST)
		@ResponseStatus(HttpStatus.CREATED)
		public AssetAssigned create(@RequestBody AssetAssigned assetAssign)
		{
			return service.create(assetAssign);
		}
		
		//update
		@RequestMapping(value = "/assetAssigned/update", method = RequestMethod.PUT)
		@ResponseStatus(HttpStatus.OK)
		public void update(@RequestBody AssetAssigned assetAssign)
		{
			service.update(assetAssign);
		}
		
		//Find All
		@RequestMapping(value = "/assetAssigned/findAll", method = RequestMethod.GET)
		public List<AssetAssigned> findAll()
		{
			return service.readAll();
		}
		
		//delete
		@RequestMapping(value = "/assetAssigned/delete/{id}", method = {RequestMethod.GET, RequestMethod.DELETE})
		@ResponseStatus(HttpStatus.OK)
		public void deleteAssetAssigned(@PathVariable("id") Long id)
		{
			AssetAssigned deleteAssetA = service.readById(id);
			if (deleteAssetA != null)
			{
				service.delete(deleteAssetA);
			}
		}
		
		//Find by Asset Id
		@RequestMapping(value = "/assetAssigned/findAllAsset/{id}", method = RequestMethod.GET)
		public AssetAssigned findByAssetId(@PathVariable Long id)
		{
			return service.findByAssetId(id);
		}
		
		//Find By Emp id
		@RequestMapping(value = "assetAssigned/findAllEmp/{id}", method = RequestMethod.GET)
		public AssetAssigned findByEmpId(@PathVariable long id)
		{
			return service.findByEmployeeID(id);
		}
		
		//Find by date
		@RequestMapping(value = "/assetAssigned/findByDateMoved/{date}", method = RequestMethod.GET)
		public List<AssetAssigned> findByDate(@PathVariable String date)
		{
			return service.findByMoveDate(date);
		}
		

}
