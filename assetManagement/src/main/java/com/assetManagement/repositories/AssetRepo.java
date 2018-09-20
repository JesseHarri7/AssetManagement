package com.assetManagement.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.assetManagement.entities.Asset;


@Repository
public interface AssetRepo extends CrudRepository<Asset, Long>
{
	
	
	
}
