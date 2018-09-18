package com.assetManagement.entities;

import static org.junit.Assert.*;

import org.junit.Test;

import junit.framework.Assert;

public class AssetTest 
{
	
	Asset asset = new Asset();

	@Test
	public void testCreateAsset() 
	{
		asset.setAssetId(123L);
		asset.setBrand("HP");
		asset.setDatePurchased("2018/09/18");
		asset.setDescription("Test");
		asset.setName("HP Pavilion");
		asset.setStatus("Good Condition");
		
		assertNotNull(asset);
		assertEquals(123L, asset.getAssetId());
		assertEquals("HP", asset.getBrand());
		assertEquals("2018/09/18", asset.getDatePurchased());
		assertEquals("Test", asset.getDescription());
		assertEquals("HP Pavilion", asset.getName());
		assertEquals("Good Condition", asset.getStatus());
		
		
	}

	

}
