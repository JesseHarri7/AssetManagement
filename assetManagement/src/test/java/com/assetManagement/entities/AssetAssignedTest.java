package com.assetManagement.entities;

import static org.junit.Assert.*;

import org.junit.Test;

public class AssetAssignedTest 
{
	
	Asset asset = new Asset("HP Pavlion", "Test", "HP", "2018/09/18", "Good Condition");
	Employee emp = new Employee();
	AssetAssigned AA = new AssetAssigned();

	@Test
	public void testCreateAssetAssigned() 
	{
		AA.setAssets(asset);
		AA.setMoveDate("2018/08/18");
		
		assertSame(asset, AA.getAssets());
		assertEquals("2018/08/18", AA.getMoveDate());
		
	}

}
