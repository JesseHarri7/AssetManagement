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

import com.assetManagement.entities.Asset;
import com.assetManagement.services.AssetService;

@RestController
@RequestMapping(value = "/assetManagement")
public class AssetController 
{
	@Autowired
	AssetService service;
	
	//Find by id
	@RequestMapping(value = "/asset/{id}", method = RequestMethod.GET)
	public Asset findById(@PathVariable Long id)
	{
		return service.readById(id);
	}
	
	//create
	@RequestMapping(value = "/asset/create", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Asset create(@RequestBody Asset asset)
	{
		return service.create(asset);
	}
	
	//update
	@RequestMapping(value = "/asset/update", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void update(@RequestBody Asset asset)
	{
		service.update(asset);
	}
	
	//Find All
	@RequestMapping(value = "/asset/findAll", method = RequestMethod.GET)
	public List<Asset> findAll()
	{
		return service.readAll();
	}
	
	//delete
	@RequestMapping(value = "/asset/delete/{id}", method = {RequestMethod.GET, RequestMethod.DELETE})
	@ResponseStatus(HttpStatus.OK)
	public void deleteAsset(@PathVariable("id") Long id)
	{
		Asset deleteAsset = service.readById(id);
		if (deleteAsset != null)
		{
			service.delete(deleteAsset);
		}
	}
	
	//Find by brand
	@RequestMapping(value = "/asset/findByBrand/{brand}", method = RequestMethod.GET)
	public List<Asset> findByBrand(@PathVariable String brand)
	{
		return service.findByAssetBrand(brand);
	}
	
	//Find by date
	@RequestMapping(value = "/asset/findByDate/{date}", method = RequestMethod.GET)
	public List<Asset> findByDate(@PathVariable String date)
	{
		return service.findByDatePurchased(date);
	}
	
	//Find by name
	@RequestMapping(value = "/asset/findByName/{name}", method = RequestMethod.GET)
	public List<Asset> findByName(@PathVariable String name)
	{
		return service.findByName(name);
	}

}
