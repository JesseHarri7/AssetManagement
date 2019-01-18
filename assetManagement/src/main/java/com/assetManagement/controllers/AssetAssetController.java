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

import com.assetManagement.entities.AssetAsset;
import com.assetManagement.services.AssetAssetService;

@RestController
public class AssetAssetController 
{
	@Autowired
	AssetAssetService service;
	
	//Find by id
	@RequestMapping(value = "/assetAsset/{id}", method = RequestMethod.GET)
	public AssetAsset findById(@PathVariable Long id)
	{
		return service.readById(id);
	}
	
	//Create
	@RequestMapping(value = "/assetAsset/create", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public AssetAsset create(@RequestBody AssetAsset assetAsset)
	{
		return service.create(assetAsset);
	}
	
	//Update
	@RequestMapping(value = "/assetAsset/update", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void update(@RequestBody AssetAsset assetAsset)
	{
		service.update(assetAsset);
	}
	
	//Find All
	@RequestMapping(value = "/assetAsset/findAll", method = RequestMethod.GET)
	public List<AssetAsset> findAll()
	{
		return service.readAll();
	}
	
	//Find All History
	@RequestMapping(value = "/assetAsset/findAllHistory", method = RequestMethod.GET)
	public List<AssetAsset> findAllHistory()
	{
		return service.findAllHistory();
	}
	
	//delete
	@RequestMapping(value = "/assetAsset/delete/{id}", method = {RequestMethod.GET, RequestMethod.DELETE})
	@ResponseStatus(HttpStatus.OK)
	public void delete(@PathVariable("id") Long id)
	{
		AssetAsset asset = service.readById(id);
		if (asset != null)
		{
			service.delete(asset);
		}
	}
	
	//Find by AssetOne id
	@RequestMapping(value = "/assetAsset/findAssetOne/{id}", method = RequestMethod.GET)
	public List<AssetAsset> findAssetOne(@PathVariable Long id)
	{
		return service.findByAssetOne(id);
	}
	
	//Find by AssetTwo id
	@RequestMapping(value = "/assetAsset/findAssetComponent/{id}", method = RequestMethod.GET)
	public AssetAsset findAssetOTwo(@PathVariable Long id)
	{
		return service.findByAssetComponent(id);
	}
	
	//Find by date
	@RequestMapping(value = "/assetAsset/findByAssignDate/{date}", method = RequestMethod.GET)
	public List<AssetAsset> findByDate(@PathVariable String date)
	{
		return service.findByAssignDate(date);
	}
	
	//Find by Asset codes
	@RequestMapping(value = "/assetAsset/assetCodes/{assetOne}/{assetComponent}", method = RequestMethod.GET)
	public AssetAsset findAssetCodes(@PathVariable Long assetOne, @PathVariable Long assetComponent)
	{
		return service.findByAssetCodes(assetOne, assetComponent);
	}
	
	//Find by Asset codes History
	@RequestMapping(value = "/assetAsset/assetCodesHist/{id}", method = RequestMethod.GET)
	public List<AssetAsset> findAssetCodesHist(@PathVariable Long id)
	{
		return service.findByAssetOneHist(id);
	}

}
