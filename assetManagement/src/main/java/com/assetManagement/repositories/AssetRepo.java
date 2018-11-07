package com.assetManagement.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.assetManagement.entities.Asset;


@Repository

public interface AssetRepo extends CrudRepository<Asset, Long>
{	
	Asset findByAssetCode(Long id);
	
	List<Asset> findByBrand(String brand);
	
	List<Asset> findByDatePurchased(String date);
	
	List<Asset> findByName(String assetName);
	
}