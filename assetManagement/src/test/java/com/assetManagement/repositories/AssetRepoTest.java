package com.assetManagement.repositories;

import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;

import java.util.List;

import org.hamcrest.collection.IsEmptyCollection;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.assetManagement.App;
import com.assetManagement.entities.Asset;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = App.class)
@WebAppConfiguration
public class AssetRepoTest
{
	@Autowired
	private AssetRepo repo;
	
	private Asset result;

	@Before
	public void testCreateAsset() throws Exception
	{
		Asset asset = new Asset();

		asset.setAssetId(123L);	
		asset.setBrand("HP");
		asset.setDatePurchased("2018/09/18");
		asset.setDescription("Test");
		asset.setName("HP Pavilion");
		asset.setStatus("Good Condition");
		repo.save(asset);
		result = repo.save(asset);
		
		assertNotNull(result);
	}
	
	@Test
	public void testUpdateAsset() throws Exception
	{
		Asset asset = repo.findByAssetId(123L);
		
		if(asset != null)
		{
			asset.setBrand("Dell");
			Asset updateAsset = repo.save(asset);
			assertEquals("Dell", updateAsset.getBrand());
		}
		else
		{
			fail("Did not find the requested ID");
		}
		
	}
	
	@Test
	public void testReadAllAssets() throws Exception
	{
		Iterable<Asset> asset = repo.findAll();
		assertNotNull(asset);
	}
	
	@Test
	public void testFindName() throws Exception
	{	 
		List<Asset> asset = repo.findByName("HP Pavilion");
		assertThat(asset, not(IsEmptyCollection.empty()));
		
		//Making sure data is passed from @Before		
//		List<Asset> expected = Arrays.asList(new Asset("HP Pavilion"));
//		assertEquals(expected, asset);
	}
	
	@Test
	public void testFindBrand() throws Exception
	{		
		List<Asset> asset = repo.findByBrand("HP");
		assertThat(asset, not(IsEmptyCollection.empty()));
	}
	
	@Test
	public void findDatePurchased() throws Exception
	{		
		List<Asset> asset = repo.findByDatePurchased("2018/09/18");
		assertThat(asset, not(IsEmptyCollection.empty()));
	}
	
}
