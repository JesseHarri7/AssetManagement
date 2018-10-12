package com.assetManagement.services;

import java.util.List;

import com.assetManagement.entities.AssetAssigned;

public interface AssetAssignedService extends Service<AssetAssigned, Long>
{
	
	AssetAssigned findByAssetId(Long asset);
	
	AssetAssigned findByEmployeeID(Long emp);
	
	List<AssetAssigned> findByMoveDate(String date);
	
}
