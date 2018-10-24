package com.assetManagement.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import org.hamcrest.collection.IsEmptyCollection;
import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;

import com.assetManagement.App;
import com.assetManagement.entities.Asset;
import com.assetManagement.services.AssetService;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = App.class)
@WebAppConfiguration
public class AssetServiceTest
{
	@Autowired
	private AssetService service;
	
	private Asset result;
	
	@Before
	public void testCreateAsset()
	{
		Asset asset = new Asset();
		
		asset.setAssetId(1L);	
		asset.setBrand("HP");
		asset.setDatePurchased("2018/09/18");
		asset.setDescription("Test");
		asset.setName("HP Pavilion");
		asset.setStatus("Good Condition");
		
		service.create(asset);
		result = service.create(asset);
	}
	
	@Test
	public void testUpdateAsset()
	{		
		Asset asset = service.readById(1L);
		
		if (asset != null)
		{
			asset.setBrand("Dell");
			Asset updateAsset = service.update(asset);
			assertNotNull(updateAsset);
			assertEquals("Dell", updateAsset.getBrand());
		}
		else
		{
			fail("Did not find the requested ID to find");
		}
	}
	
	@Test
	public void testReadById()
	{
		Asset asset = service.readById(1L);
		assertNotNull(asset);
	}
	
	@Test
	public void testReadAllAsset()
	{
		Iterable<Asset> asset = service.readAll();
		assertNotNull(asset);
	}
	
	@Test
	public void testDeleteAsset()
	{
		Asset asset = service.readById(1L);
		
		if (asset != null)
		{
			service.delete(asset);
			Asset delAsset = service.readById(1L);
			assertNull(delAsset);
		}
		else
		{
			fail("Did not find the requested ID to delete");
		}
	}
	
	@Test
	public void findByBrand()
	{
		List<Asset> asset = service.findByAssetBrand("Dell");
		assertThat(asset, not(IsEmptyCollection.empty()));
	}
	
	@Test
	public void findByDate()
	{
		List<Asset> asset = service.findByDatePurchased("2018/09/18");
		assertThat(asset, not(IsEmptyCollection.empty()));
	}
	
	@Test
	public void findByName()
	{
		List<Asset> asset = service.findByName("HP Pavilion");
		assertThat(asset, not(IsEmptyCollection.empty()));

	}
	
}
