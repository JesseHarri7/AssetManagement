$(document).ready(function()
{
	var findAllAssets = findAllAssets();
	var percent = ((findAllAssets.length / 100)*0.1)*10;
	
	var findAllEmp = findAllEmp();
	
	var findAllAA = findAllAA();
	
	//Displaying total Assets
	document.getElementById("totalAssets").innerHTML = findAllAssets.length;
	
	//Displaying total employees
	document.getElementById("totalEmp").innerHTML = findAllEmp.length;
	
	//Displaying total Assests assigned
	document.getElementById("totalAA").innerHTML = findAllAA.length;
	
//	document.getElementById("totalAssetsPercent").innerHTML = percent;
	
	//Find all assets from the database
	function findAllAssets()
	{
		var dataSet = [];
		
		$.ajax({
			url:"/assetManagement/asset/findAll",
			dataType: "json",
			async: false,
			type: "GET",
			success: function(data)
			{
				dataSet = data;
			},
			error: function(data)
			{
				dataSet = "Error";
			}
		});
		
		return dataSet;
	}
	
	//Find all Employees from the database
	function findAllEmp()
	{
		var dataSet = [];
		
		$.ajax({
			url:"/assetManagement/employee/findAll", 
			dataType: "json",
			async: false,
			type: "GET",
			success: function(data)
			{
				dataSet = data;
			},
			error: function(data)
			{
				dataSet = "Error";
			}
		});
		
		return dataSet;
	}
	
	//Find all assigned assets
	function findAllAA()
	{
		var dataSet = [];
		
		$.ajax({
			url:"/assetManagement/assetAssigned/findAll", 
			dataType: "json",
			type: "GET",
			success: function(data)
			{				
				dataSet = data;
			},
			error: function(data)
			{
				dataSet = "Error";
			}
		});
		
		return dataSet;
	}
});