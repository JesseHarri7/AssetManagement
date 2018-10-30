package com.assetManagement.entities;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertSame;

import java.util.Date;

import org.junit.Test;

public class AssetAssignedTest 
{
	//LocalDate date = LocalDate.of(2018, 8, 19);
	Date date = new Date();
	
	Asset asset = new Asset(123L, "HP Pavlion", "Test", "HP", "2018/09/18", "Good Condition");
	Employee emp = new Employee("Bob", "Marley", "Bob.Marley@gmail.com", new Date(), 1452L);

	AssetAssigned AA = new AssetAssigned();

	@Test
	public void testCreateAssetAssigned() 
	{
		AA.setAssets(asset);
		AA.setEmployees(emp);
		AA.setMoveDate("2018/08/18");
		
		assertSame(emp, AA.getEmployees());
		assertSame(asset, AA.getAssets());
		assertEquals("2018/08/18", AA.getMoveDate());
		
		
	}

}
