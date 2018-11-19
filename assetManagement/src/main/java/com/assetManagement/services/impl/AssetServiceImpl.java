package com.assetManagement.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assetManagement.entities.Asset;
import com.assetManagement.repositories.AssetRepo;
import com.assetManagement.services.AssetService;

@Service
public class AssetServiceImpl implements AssetService
{
	
	@Autowired
	AssetRepo repo;	

	@Override
	public Asset create(Asset entity) 
	{
		//List<Asset> allAssets = findAllHistory();
		Asset asset = repo.findByAssetCode(entity.getAssetCode());
		if(asset == null)// && allAssets.size() == 0)
		{
			return repo.save(entity);
		}
		else
		{
			return null;
		}

	}

	@Override
	public Asset readById(Long id) 
	{
		Asset asset = repo.findByAssetCode(id);
		if (asset == null)
		{
			return null;
		}
		else
		{	
			return repo.findByAssetCode(id);
		}
		
	}

	@Override
	public List<Asset> readAll() 
	{
		List<Asset> assetList = new ArrayList<Asset>();
		Iterable<Asset> assets = repo.findAll();
		for (Asset a : assets)
		{
			assetList.add(a);
		}
		return assetList;
	}

	@Override
	public Asset update(Asset entity)
	{
		Asset asset = repo.findByAssetCode(entity.getAssetCode());
		if (asset == null)
		{
			return null;
		}
		else
		{
			return repo.save(entity);
		}
	}

	@Override
	public void delete(Asset entity) 
	{
		if (entity != null)
		{
			repo.delete(entity);
		}
		
	}

	@Override
	public List<Asset> findByAssetBrand(String brand) 
	{
		List<Asset> asset = repo.findByBrand(brand);
		if (asset == null)
		{
			return null;
		}
		else
		{
			return asset;
		}
	}

	@Override
	public List<Asset> findByDatePurchased(String date)
	{
		List<Asset> asset = repo.findByDatePurchased(date);
		if (asset == null) 
		{
			return null;
		}
		else
		{
			return repo.findByDatePurchased(date);
		}
	}

	@Override
	public List<Asset> findByName(String assetName) 
	{
		List<Asset> asset = repo.findByName(assetName);
		if (asset == null)
		{
			return null;
		}
		else
		{
			return repo.findByName(assetName);
		}
	}
	
	@Override	
	public List<Asset> findAllHistory()
	{
		List<Asset> assetList = new ArrayList<Asset>();
		Iterable<Asset> assets = repo.findAllHistory();
		for (Asset a : assets)
		{
			assetList.add(a);
		}
		return assetList;
	}

}
