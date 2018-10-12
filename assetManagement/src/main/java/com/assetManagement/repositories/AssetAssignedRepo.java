package com.assetManagement.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.assetManagement.entities.AssetAssigned;

@Repository
public interface AssetAssignedRepo extends CrudRepository<AssetAssigned, Long>
{
	AssetAssigned findByAssetAssignedId(Long id);
	
	AssetAssigned findByAssetsAssetId(Long Asset);
	
	AssetAssigned findByEmployeesEmployeeID(Long emp);
	
	List<AssetAssigned> findByMoveDate(String date);
	
}