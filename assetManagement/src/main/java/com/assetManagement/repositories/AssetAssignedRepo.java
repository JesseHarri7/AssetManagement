package com.assetManagement.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.assetManagement.entities.AssetAssigned;

@Repository
public interface AssetAssignedRepo extends CrudRepository<AssetAssigned, Long>
{
	
	List<AssetAssigned> findByEmployeeEmployeeId(Long empId);
	
	List<AssetAssigned> findByAssetAssetId(Long assetId);
	
	List<AssetAssigned> findByMoveDate(String date);
	
}