package com.assetManagement.services;

import java.util.List;
import java.util.Optional;

import com.assetManagement.entities.Asset;

public interface AssetService extends Service<Asset, Long>
{
		
	List<Asset> findByAssetBrand(String brand);
	
	List<Asset> findByDatePurchased(String date);
	
	List<Asset> findByName(String assetName);
	
}
