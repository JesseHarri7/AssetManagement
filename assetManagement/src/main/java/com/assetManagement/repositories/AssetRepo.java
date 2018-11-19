package com.assetManagement.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.assetManagement.entities.Asset;


@Repository
public interface AssetRepo extends CrudRepository<Asset, Long>
{	
	//@Query(value = "SELECT * FROM asset WHERE asset_code = ? && state = 'A'", nativeQuery = true)
	Asset findByAssetCode(Long id);
	
	List<Asset> findByBrand(String brand);
	
	List<Asset> findByDatePurchased(String date);
	
	List<Asset> findByName(String assetName);
	
	@Query(value = "SELECT * FROM asset", nativeQuery = true)
	List<Asset> findAllHistory();
	
	@Query(value = "SELECT * FROM asset WHERE state = 'A'", nativeQuery = true)
	List<Asset> findAll();
	
}