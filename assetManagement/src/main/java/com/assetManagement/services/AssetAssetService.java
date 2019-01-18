package com.assetManagement.services;

import java.util.List;

import com.assetManagement.entities.AssetAsset;

public interface AssetAssetService extends Service<AssetAsset, Long>
{
	List<AssetAsset> findByAssetOne(Long asset);
	
	AssetAsset findByAssetComponent(Long asset);
	
	AssetAsset findByAssetCodes(Long assetOne, Long assetTwo);
	
	List<AssetAsset> findByAssignDate(String date);
	
	List<AssetAsset> findByAssetOneHist(Long asset);
}
