package com.assetManagement.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.assetManagement.entities.AssetAssigned;

@Repository
public interface AssetAssignedRepo extends CrudRepository<AssetAssigned, Long>
{
	AssetAssigned findByAssetAssignedId(Long id);
	
	AssetAssigned findByAssetsAssetCode(Long Asset);
	
	AssetAssigned findByEmployeesEmployeeID(Long emp);
	
	List<AssetAssigned> findByMoveDate(String date);
	
	List<AssetAssigned> findByUnassignDate(String date);
	
	@Query(value = "SELECT * FROM asset_assigned", nativeQuery = true)
	List<AssetAssigned> findAllHistory();
	 
}