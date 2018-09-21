package com.assetManagement.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.assetManagement.entities.Asset;


@Repository
public interface AssetRepo extends CrudRepository<Asset, Long>
{	
	List<Asset> findByBrand(String brand);
	
	List<Asset> findByDatePurchased(String date);
	
}