package com.assetManagement.services;

import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.fail;

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
import com.assetManagement.repositories.AssetRepo;
import com.assetManagement.repositories.EmployeeRepo;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = App.class)
@WebAppConfiguration
public class AssetAssignedServiceTest 
{
	
	@Autowired
	private AssetAssignedService service;
	
	@Autowired
	private AssetRepo assetRepo;
	
	@Autowired
	private EmployeeRepo empRepo;
	
	public AssetAssigned createAA;
	
	@Before
	public void testCreateAA()
	{
		// LocalDate date = LocalDate.of(2018, 8, 19);
		Date date = new Date();
				
		Asset asset = new Asset(1L, "HP Pav", "Test", "HP", "01/10/2018", "Good");
		
		Employee emp = new Employee("Bob", "Marley", "Bob.Marley", date, 1L);
		
		AssetAssigned assetAssign = new AssetAssigned();
		
		assetAssign.setAssets(asset);
		assetAssign.setEmployees(emp);
		assetAssign.setId(1L);
		assetAssign.setMoveDate("09/09/2018");
		
		createAA = service.create(assetAssign);
		//service.create(assetAssign);
		
		assetRepo.save(asset);
		empRepo.save(emp);
	}
	
	@Test
	public void testUpdateAA() 
	{
		AssetAssigned assetAssign = service.readById(1L);
		
		if (assetAssign != null)
		{
			assetAssign.setMoveDate("05/10/2018");
			AssetAssigned updateAA = service.update(assetAssign);
			assertNotNull(updateAA);
			assertEquals("05/10/2018", updateAA.getMoveDate());
		}
		else
		{
			fail("Did not find the requested ID to find");
		}
		
	}
	
	@Test
	public void testReadById()
	{
		AssetAssigned assetAssign = service.readById(1L);
		assertNotNull(assetAssign);
	}
	
	@Test
	public void testReadAllAsset()
	{
		Iterable<AssetAssigned> assetAssign = service.readAll();
		assertNotNull(assetAssign);
	}
	
	@Test
	public void testDeleteAssetAssign()
	{
		// LocalDate date = LocalDate.of(2018, 8, 19);
		Date date = new Date();
				
		Asset asset = new Asset(3L, "HP Pav", "Test", "HP", "01/10/2018", "Good");
		
		Employee emp = new Employee("Bob", "Marley", "Bob.Marley", date, 4L);
		
		AssetAssigned delAssetAssign = new AssetAssigned();
		
		delAssetAssign.setAssets(asset);
		delAssetAssign.setEmployees(emp);
		delAssetAssign.setId(2L);
		delAssetAssign.setMoveDate("08/10/2018");
		
		service.create(delAssetAssign);
		
		AssetAssigned assetAssign = service.readById(2L);
		
		if (assetAssign != null)
		{
			service.delete(assetAssign);
			AssetAssigned delAA = service.readById(2L);
			assertNull(delAA);
		}
		else
		{
			fail("Did not find the requested ID to delete");
		}
	}
	
	@Test
	public void findAssetId()
	{
		AssetAssigned assetId = service.findByAssetId(1L);
		assertNotNull(assetId);
	}
	
	@Test
	public void findEmpId()
	{
		AssetAssigned empId = service.findByEmployeeID(1L);
		assertNotNull(empId);
	}
	
	@Test
	public void findDateMoved()
	{
		List<AssetAssigned> assetAssign = service.findByMoveDate("09/09/2018");
		//assertNotNull(assetAssign);
		assertThat(assetAssign, not(IsEmptyCollection.empty()));
	}
	
}
