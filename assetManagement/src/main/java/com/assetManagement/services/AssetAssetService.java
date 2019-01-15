package com.assetManagement.services;

import java.util.List;

import com.assetManagement.entities.AssetAsset;

public interface AssetAssetService extends Service<AssetAsset, Long>
{
//	AssetAsset findByAssetOne(Long asset);
	
	AssetAsset findByAssetComponent(Long asset);
	
	AssetAsset findByAssetCodes(Long assetOne, Long assetTwo);
	
	List<AssetAsset> findByAssignDate(String date);
}
