$(document).ready(function()
{
	//Select
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
	
	$('#create-btn').click(function(event) 
	{
		createTable();
		var aaTable = $("#AA-table").DataTable();
		
		aaTable.draw( false );
	});	
	
	var dataSet = [];
	var asset;
	var emp;
	
	//All data fields on start up
	findAll();
	
	function createTable()
	{
		asset = JSON.parse(localStorage.getItem('asset'));
		emp = JSON.parse(localStorage.getItem('emp'));
		
		if(asset && emp)
		{
			var assetAssigned = {assets: asset, employees: emp};
			assetAssigned.moveDate = new Date();
		
			var data_json = JSON.stringify(assetAssigned);
	
			$.ajax(
			{
				headers: { 
			        'Accept': 'application/json',
			        'Content-Type': 'application/json' 
			    },
				url:"assetManagement/assetAssigned/create", 
				dataType: "json",
				data: data_json,
				type: "POST",
				success: alert("AssetAssigned table has been created")
			});
		}
		else
		{
			alert("Neither an asset or employee was selected");
		}
		
		
		
	}
	
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
			retrieve: true,
			select: true,
			data: dataSet,
			columns: 
			[
				//{data: 'id'},
				{data: 'assets.assetId'},
				{data: 'employees.employeeID'},
				{data: 'moveDate'}
			]
		});
		
		return aaTable;
	}
	
	//Delete
	$('#delete-btn').click(function(event) 
	{
		var table = $('#AA-table').DataTable();
		remove();
		
		table.row('.selected').remove().draw( false );
		
	});
	
	//Clear local storage
	$('#clear-btn').click( function()
	{
		localStorage.removeItem('asset');
		localStorage.removeItem('emp');
		alert("Cleared");
	})
	
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
				success: alert("AssetAssigned " + rowToDelete.id + " was removed")
			});
			
			table.row('.selected').remove().draw( false );
		}
		else
		{
			alert("Please select a item to remove");
		}	
		
	}
});