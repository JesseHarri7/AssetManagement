package com.assetManagement.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.assetManagement.entities.AssetAsset;
import com.assetManagement.entities.AssetAssigned;

@Repository
public interface AssetAssetRepo extends CrudRepository<AssetAsset, Long>
{
	AssetAsset findByAssetAssetId(Long id);
	
	@Query(value = "SELECT * FROM asset_asset WHERE state = 'A' AND asset_code = :assetCode", nativeQuery = true)
	List<AssetAsset> findByAssetOneAssetCode(@Param("assetCode") Long Asset);
	
	AssetAsset findByAssetComponentAssetId(Long Asset);
	
	@Query(value = "SELECT * FROM asset_asset WHERE state = 'A' AND asset_code = :assetOne AND asset_component = :assetComponent", nativeQuery = true)
	AssetAsset findAssetCodes(@Param("assetOne") Long assetOne, @Param("assetComponent") Long assetComponent);
	
	List<AssetAsset> findByAssignDate(String date);
	
	List<AssetAsset> findByUnassignDate(String date);
	
	@Query(value = "SELECT * FROM asset_asset", nativeQuery = true)
	List<AssetAsset> findAllHistory();
	
	@Query(value = "SELECT * FROM asset_asset WHERE asset_code = :assetCode", nativeQuery = true)
	List<AssetAsset> findByAssetOneAssetCodeHist(@Param("assetCode") Long Asset);
	
}
