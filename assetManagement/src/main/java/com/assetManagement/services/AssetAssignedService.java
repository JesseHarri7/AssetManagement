package com.assetManagement.services;

import java.util.List;

import com.assetManagement.entities.AssetAssigned;

public interface AssetAssignedService extends Service<AssetAssigned, Long>
{
	
	AssetAssigned findByAssetCode(Long asset);
	
	AssetAssigned findByEmployeeID(Long emp);
	
	List<AssetAssigned> findByAssetCodeAll(Long asset);
	
	List<AssetAssigned> findByMoveDate(String date);
	 
}
