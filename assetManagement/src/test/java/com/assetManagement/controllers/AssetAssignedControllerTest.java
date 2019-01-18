/*package com.assetManagement.controllers;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import com.assetManagement.entities.AssetAssigned;

@RunWith(SpringRunner.class)
public class AssetAssignedControllerTest 
{
	RestTemplate restTemplate = new RestTemplate();

    protected String port = "8080";
	
	public String BASE_URL = "http://localhost:"+port+"/assetManagement/assetAssigned";
	
	@Test
	public void testCreateAssetAssigned() throws Exception
	{
		String urlFind = BASE_URL + "/{id}";
		AssetAssigned assetAFind = restTemplate.getForObject(urlFind, AssetAssigned.class, "1");
		
		if(assetAFind != null)
		{
			String urlDelete = BASE_URL + "/delete/{id}";
			restTemplate.delete(urlDelete, "1");
		}
		
		String url = BASE_URL + "/create";
		
		Asset asset = new Asset(1L, "HP Pav", "Test", "HP", "01/10/2018", "Good");
		Employee emp = new Employee("Bob", "Marley", "Bob.Marley", "01/10/2018", 1L);

		AssetAssigned assetA = new AssetAssigned(asset, emp, "16/10/2018");
		assetA.setId(1L);
		
		createAA = restTemplate.postForObject(url, assetA, AssetAssigned.class);
		assertNotNull(createAA);
		
	}

	
	@Test
	public void TestFindById()
	{
		String url = BASE_URL + "/{id}";
		AssetAssigned assetA = restTemplate.getForObject(url, AssetAssigned.class, "1");
		//assertEquals(new Long(1L), assetA.getId());
		assertNotNull(assetA);
	}
}
*/