package com.assetManagement.repositories;

import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;

import java.util.Arrays;
import java.util.Date;
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
import com.assetManagement.entities.AssetAssigned;
import com.assetManagement.entities.Employee;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = App.class)
@WebAppConfiguration
public class AssetAssignedRepoTest 
{
	@Autowired
	private AssetAssignedRepo AARepo;
	
	@Autowired
	private AssetRepo assetRepo;
	
	@Autowired
	private EmployeeRepo empRepo;
	
	private Asset createAsset;
	private Employee createEmp;
	private AssetAssigned createAA;
	
	@Before
	public void setup() throws Exception
	{
		Asset asset = new Asset(1L, "HP Pav", "Test", "HP", "01/10/2018", "Good");
		
		Employee emp = new Employee("Bob", "Marley", "Bob.Marley", new Date(), 1L);
		
		AssetAssigned assetAssign = new AssetAssigned();
		
		createAsset = assetRepo.save(asset);
		assetRepo.save(asset);
		createEmp = empRepo.save(emp);
		empRepo.save(emp);
		
		assetAssign.setAssets(createAsset);
		assetAssign.setEmployees(createEmp);
		assetAssign.setId(1L);
		assetAssign.setMoveDate("09/09/2018");
		
		createAA = AARepo.save(assetAssign);
		AARepo.save(assetAssign);
		
		assertNotNull(createAsset);
		assertNotNull(createEmp);
		assertNotNull(createAA);
	}
	
	@Test
	public void testUpdateAssetAssigned() throws Exception
	{		
		AssetAssigned assetAssign = AARepo.findByAssetAssignedId(1L);
		Asset asset = createAsset;		
		
		if(assetAssign != null)
		{
			asset.setBrand("Acer");
			
			assetAssign.setAssets(asset);
			
			AssetAssigned updateAA = AARepo.save(assetAssign);
			assertNotNull(updateAA);
		}
		else
		{
			fail("Did not find the requested ID");
		}
		
	}
	
	@Test
	public void testFindAssetId() throws Exception
	{
		AssetAssigned assetId = AARepo.findByAssetsAssetId(1L);
		assertNotNull(assetId);
	}
	
	@Test
	public void testFindEmployeeId() throws Exception
	{
		AssetAssigned empId = AARepo.findByEmployeesEmployeeID(1L);
		assertNotNull(empId);
	}
	
	@Test
	public void testFindDate() throws Exception
	{		
		List<AssetAssigned> assetAssignD = AARepo.findByMoveDate("09/09/2018");
		assertThat(assetAssignD, not(IsEmptyCollection.empty()));
		
		//Making sure @Before works		
//		List<Asset> expected = Arrays.asList(new Asset("2018/10/04"));
//		assertEquals(expected, assetAssignD);
	}
	
}
