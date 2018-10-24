package com.assetManagement.controllers;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import com.assetManagement.entities.Asset;

@RunWith(SpringRunner.class)
//@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT) //(classes = App.class)
//@WebAppConfiguration
public class AssetControllerTest 
{
	
	RestTemplate restTemplate = new RestTemplate();
	private Asset createAsset;
			
//	@Value("local.server.port")
    protected String port = "8080";
	
	public String BASE_URL = "http://localhost:"+port+"/assetManagement/asset";
	
	@Test
	public void testCreateAsset() throws Exception
	{
		String urlFind = BASE_URL + "/{id}";
		Asset assetFind = restTemplate.getForObject(urlFind, Asset.class, "1");
		if(assetFind != null)
		{
			String urlDelete = BASE_URL + "/delete/{id}";
			restTemplate.delete(urlDelete, "1");
		}
		
		String url = BASE_URL + "/create";
		Asset asset = new Asset(1L, "HP Pav", "Test", "HP", "01-10-2018", "Good");
		createAsset = restTemplate.postForObject(url, asset, Asset.class);
		assertNotNull(createAsset);
		
	}
	
	@Test
	public void testFindById()
	{
		
		String url = BASE_URL + "/{id}";
		Asset asset = restTemplate.getForObject(url, Asset.class, "1");
		assertNotNull(asset);
		assertEquals(new Long(1L), asset.getAssetId());
		
	}
	
	@Test
	public void testUpdate()
	{
		String urlUpdate = BASE_URL + "/update";
		String url = BASE_URL + "/{id}";
		
		Asset asset = restTemplate.getForObject(url, Asset.class, "1");
		
		if(asset != null)
		{
			Asset assetUpdate = new Asset(1L, "HP Pav", "Test", "Dell", "01-10-2018", "Good");
			restTemplate.put(urlUpdate, assetUpdate);
			assertEquals("Dell", assetUpdate.getBrand());
		}
		else
		{
			fail("Did not find the requested ID to update");
		}
		
	}
	
	@Test
	public void testFindAll()
	{
		String url = BASE_URL + "/findAll";
		@SuppressWarnings("unchecked")
		List<Asset> asset = restTemplate.getForObject(url, List	.class);
		assertTrue(asset.size() > 0);
	}
	
	@Test
	public void testDelete()
	{
		String url = BASE_URL + "/create";
		Asset asset = new Asset(2L, "HP Pav", "Test", "HP", "01-10-2018", "Good");
		createAsset = restTemplate.postForObject(url, asset, Asset.class);
		
		String urlDelete = BASE_URL + "/delete/{id}";
		restTemplate.delete(urlDelete, "2");
		
		String urlFind = BASE_URL + "/{id}";
		Asset assetFind = restTemplate.getForObject(urlFind, Asset.class, "2");
		assertNull(assetFind);
	}
	
	@Test
	public void findByBrand()
	{
		String url = BASE_URL + "/findByBrand/{brand}";
		@SuppressWarnings("unchecked")
		List<Asset> asset = restTemplate.getForObject(url, List.class, "HP");
		assertTrue(asset.size() > 0);
	}
	
	@Test
	public void findByDate()
	{
		String url = BASE_URL + "/findByDate/{date}";
		@SuppressWarnings("unchecked")
		List<Asset> asset = restTemplate.getForObject(url, List.class, "01-10-2018");
		assertTrue(asset.size() > 0);
	}
	
	@Test
	public void findByName()
	{
		String url = BASE_URL + "/findByName/{name}";
		@SuppressWarnings("unchecked")
		List<Asset> asset = restTemplate.getForObject(url, List.class, "HP Pav");
		assertTrue(asset.size() > 0);
	}
}