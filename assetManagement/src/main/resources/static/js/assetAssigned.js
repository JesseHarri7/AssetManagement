$(document).ready(function()
{
	var dataSet = [];
	//var dataSetA = [];
	//var dataSetEmp = [];
	var asset;
	var emp;

	//All data fields on start up
	findAll();
	
	//Select row
	$('#AA-table tbody').on('click','tr', function()
	{
		if ( $(this).hasClass('selected') )
		{
            $(this).removeClass('selected');
		}
		else
		{
            $('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
	} );
	
	//Select cell
	$('#AA-table tbody').on('click','td', function()
	{
		if ( $(this).hasClass('selected') )
		{
            $(this).removeClass('selected');
		}
		else
		{
            $('td.selected').removeClass('selected');
            $(this).addClass('selected');
        }
	} );
	
	//Get Asset info
	$('#asset-btn').click(function(event)
	{
		var table = $('#AA-table').DataTable();
		var findAssetId = table.cell('.selected').data();
		var assetInfo = findAsset(findAssetId);
		if(assetInfo)
		{
			$('#assetModal').modal('show');
			displayAsset(assetInfo);			
		}
		else
		{
			alert("Please select an asset Code")
		}
	});	
	
	//Get Emp info
	$('#emp-btn').click(function(event)
	{
		var table = $('#AA-table').DataTable();
		var findEmpId = table.cell('.selected').data();
		var empInfo = findEmp(findEmpId);
		if(empInfo)
		{
			$('#empModal').modal('show');
			displayEmp(empInfo);			
		}
		else
		{
			alert("Please select an Employee ID")
		}
	});
	
	//Delete
	$('#delete-btn').click(function(event)
	{
		var table = $('#AA-table').DataTable();
		remove();
		
		table.row('.selected').remove().draw( false );
		
	});
	
	$('#assetT-btn').click( function()
	{
		var table = $('#AA-table').DataTable();
		var findAssetId = table.cell('.selected').data();
		var assetInfo = findAsset(findAssetId);
	})
	
	function findAll()
	{
		
		$.ajax({
			url:"assetManagement/assetAssigned/findAll", 
			dataType: "json",
			type: "GET",
			success: function(data)
			{				
				dataSet = data;
				aaList(dataSet);
				
			}
		});
	}

	function aaList(dataSet)
	{
		
		var aaTable = $("#AA-table").DataTable({
			dom: '<f<t>lip>',
			retrieve: true,
			select: true,
			data: dataSet,
			columns: 
			[
				//{data: 'id'},
				{data: 'assets.assetCode'},
				{data: 'employees.employeeID'},
				{data: 'employees.name'},
				{data: 'moveDate'}
			]
		});
		
		return aaTable;
	}
	
	function remove()
	{
		var table = $('#AA-table').DataTable();

		var rowToDelete = table.row( '.selected' ).data();
		
		if (rowToDelete)
		{
			$.ajax({
				url:"assetManagement/assetAssigned/delete/" + rowToDelete.id, 
				dataType: "json",
				type: "DELETE",
				success: alert("Asset " + rowToDelete.assets.assetCode + " and employee " + rowToDelete.employees.employeeID + " is now unassigned")
			});
			
			table.row('.selected').remove().draw( false );
		}
		else
		{
			alert("Please select a item to remove");
		}	
		
		
	}
	
	function findAsset(id)
	{
		var dataSetA = [];

		$.ajax({
			url:"assetManagement/asset/" + id,
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSetA = data
			},
			error: dataSetA = null
		});
		return dataSetA;
	
	}
	
	function findEmp(id)
	{
		var dataSetEmp = [];

		$.ajax({
			url:"assetManagement/employee/" + id,
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSetEmp = data
			},
			error: dataSetEmp = null
		});
		return dataSetEmp;

	}
	
	function displayAsset(asset)
	{
		
			document.getElementById("mAssetId").innerHTML = asset.assetCode;
			document.getElementById("mName").innerHTML = asset.name;
			document.getElementById("mDesc").innerHTML = asset.description;
			document.getElementById("mBrand").innerHTML = asset.brand;
			document.getElementById("mDate").innerHTML = asset.datePurchased;
			document.getElementById("mStatus").innerHTML = asset.status;
		
	}
	
	function displayEmp(emp)
	{
		
			document.getElementById("mEmpId").innerHTML = emp.employeeID;
			document.getElementById("mEmpName").innerHTML = emp.name;
			document.getElementById("mSur").innerHTML = emp.surname;
			document.getElementById("mEmail").innerHTML = emp.email;
			document.getElementById("mStartDate").innerHTML = emp.startDate;
		
	}
	
});