package com.assetManagement.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assetManagement.entities.AssetAssigned;
import com.assetManagement.repositories.AssetAssignedRepo;
import com.assetManagement.services.AssetAssignedService;

@Service
public class AssetAssignedServiceImpl implements AssetAssignedService
{
	
	@Autowired
	AssetAssignedRepo repo;

	@Override
	public AssetAssigned create(AssetAssigned entity) 
	{
		AssetAssigned aA = repo.findByAssetAssignedId(entity.getId());
		if (aA == null)
		{
			return repo.save(entity);
		}
		else
		{
			return null;
		}
	}

	@Override
	public AssetAssigned readById(Long id) 
	{
		AssetAssigned aA = repo.findByAssetAssignedId(id);
		if (aA == null)
		{
			return null;
		}
		else 
		{
			return aA;
		}
	}

	@Override
	public List<AssetAssigned> readAll() 
	{
		List<AssetAssigned> assetAList = new ArrayList<AssetAssigned>();
		Iterable<AssetAssigned> assetsAssigned = repo.findAll();
		for (AssetAssigned a : assetsAssigned)
		{
			assetAList.add(a);
		}
		return assetAList;
	}

	@Override
	public AssetAssigned update(AssetAssigned entity) 
	{
		AssetAssigned aA = repo.findByAssetAssignedId(entity.getId());
		if (aA == null)
		{
			return null;
		}
		else
		{
			return repo.save(entity);
		}
	}

	@Override
	public void delete(AssetAssigned entity) 
	{
		if (entity != null)
		{
			repo.delete(entity);
		}		
	}

	@Override
	public AssetAssigned findByAssetCode(Long asset) 
	{
		AssetAssigned assetId = repo.findByAssetsAssetCode(asset);
		if (assetId == null)
		{
			return null;
		}
		else
		{
			return repo.findByAssetsAssetCode(asset);
		}
	}

	@Override
	public AssetAssigned findByEmployeeID(Long emp) 
	{
		AssetAssigned empId = repo.findByEmployeesEmployeeID(emp);
		if (empId == null)
		{
			return null;
		}
		else
		{
			return empId;
		}
	}

	@Override
	public List<AssetAssigned> findByMoveDate(String date) 
	{
		List<AssetAssigned> assetAssign = repo.findByMoveDate(date);
		if (assetAssign == null) 
		{
			return null;
		}
		else
		{
			return assetAssign;
		}
	}

}
