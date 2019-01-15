package com.assetManagement.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.assetManagement.entities.AssetAsset;

@Repository
public interface AssetAssetRepo extends CrudRepository<AssetAsset, Long>
{
	AssetAsset findByAssetAssetId(Long id);
	
//	AssetAsset findByAssetOneAssetCode(Long Asset);
	
	AssetAsset findByAssetComponentAssetId(Long Asset);
	
	@Query(value = "SELECT * FROM asset_asset WHERE asset_code = :assetOne AND asset_component = :assetComponent", nativeQuery = true)
	AssetAsset findAssetCodes(@Param("assetOne") Long assetOne, @Param("assetComponent") Long assetComponent);
	
	List<AssetAsset> findByAssignDate(String date);
	
	List<AssetAsset> findByUnassignDate(String date);
	
	@Query(value = "SELECT * FROM asset_asset", nativeQuery = true)
	List<AssetAsset> findAllHistory();
	
}
