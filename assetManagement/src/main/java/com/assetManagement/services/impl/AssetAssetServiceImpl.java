package com.assetManagement.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assetManagement.entities.AssetAsset;
import com.assetManagement.repositories.AssetAssetRepo;
import com.assetManagement.services.AssetAssetService;

@Service
public class AssetAssetServiceImpl implements AssetAssetService
{
	@Autowired
	AssetAssetRepo repo;

	@Override
	public AssetAsset create(AssetAsset entity) 
	{
		AssetAsset asset = repo.findByAssetAssetId(entity.getId());
		if (asset == null)
		{
			return repo.save(entity);
		}
		else
		{
			return null;
		}
	}

	@Override
	public AssetAsset readById(Long id) 
	{
		AssetAsset asset = repo.findByAssetAssetId(id);
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
	public List<AssetAsset> readAll() 
	{
		List<AssetAsset> assetList = new ArrayList<AssetAsset>();
		Iterable<AssetAsset> assets = repo.findAll();
		for (AssetAsset a : assets)
		{
			assetList.add(a);
		}
		return assetList;
	}

	@Override
	public AssetAsset update(AssetAsset entity) 
	{
		AssetAsset a = repo.findByAssetAssetId(entity.getId());
		if (a == null)
		{
			return null;
		}
		else
		{
			return repo.save(entity);
		}
	}

	@Override
	public void delete(AssetAsset entity) 
	{
		if (entity != null)
		{
			repo.delete(entity);
		}
	}

	@Override
	public List<AssetAsset> findAllHistory() 
	{
		List<AssetAsset> assetList = new ArrayList<AssetAsset>();
		Iterable<AssetAsset> assets = repo.findAllHistory();
		for (AssetAsset a : assets)
		{
			assetList.add(a);
		}
		return assetList;
	}

	@Override
	public List<AssetAsset> findByAssetOne(Long asset) 
	{
		List<AssetAsset> assetList = new ArrayList<AssetAsset>();
		Iterable<AssetAsset> assets = repo.findByAssetOneAssetCode(asset);
		for (AssetAsset a : assets)
		{
			assetList.add(a);
		}
		return assetList;
	}

	@Override
	public AssetAsset findByAssetComponent(Long id) 
	{
		AssetAsset assetId = repo.findByAssetComponentAssetId(id);
		if (assetId == null)
		{
			return null;
		}
		else
		{
			return assetId;
		}
	}

	@Override
	public List<AssetAsset> findByAssignDate(String date) 
	{
		List<AssetAsset> asset = repo.findByAssignDate(date);
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
	public AssetAsset findByAssetCodes(Long assetOne, Long assetTwo) 
	{
		AssetAsset asset = repo.findAssetCodes(assetOne, assetTwo);
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
	public List<AssetAsset> findByAssetOneHist(Long asset) 
	{
		List<AssetAsset> assetList = new ArrayList<AssetAsset>();
		Iterable<AssetAsset> assets = repo.findByAssetOneAssetCodeHist(asset);
		for (AssetAsset a : assets)
		{
			assetList.add(a);
		}
		return assetList;
	}

}
