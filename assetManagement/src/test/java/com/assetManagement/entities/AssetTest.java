package com.assetManagement.entities;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;

public class AssetTest
{
	
	Asset asset = new Asset();

	@Test
	public void testCreateAsset() 
	{
		Long assetId = new Long(123L);
		
		asset.setAssetId(assetId);
		asset.setBrand("HP");
		asset.setDatePurchased("2018/09/18");
		asset.setDescription("Test");
		asset.setName("HP Pavilion");
		asset.setStatus("Good Condition");
		
		assertNotNull(asset);
		assertEquals(assetId, asset.getAssetId());
		assertEquals("HP", asset.getBrand());
		assertEquals("2018/09/18", asset.getDatePurchased());
		assertEquals("Test", asset.getDescription());
		assertEquals("HP Pavilion", asset.getName());
		assertEquals("Good Condition", asset.getStatus());
		
	}

}
