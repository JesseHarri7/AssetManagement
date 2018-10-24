$(document).ready(function()
{
	var dataSet = [];
	
	//All data fields on start up
	findAll();
	
	//Select
	$('#asset-table tbody').on('click','tr', function()
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
	
	//refresh
	$('#refresh-btn').click(function(event) 
	{
		var table = $('#asset-table').DataTable();
		findAll();
		table.draw( false );
	});
	
	//Delete
	$('#delete-btn').click(function(event) 
	{
		var table = $('#asset-table').DataTable();
		remove();
		
		table.row('.selected').remove().draw( false );
		
	});
	
	//select asset 
	$('#setAsset-btn').click( function () 
	{
		var assetData;
		var table = $('#asset-table').DataTable();
		console.log(assetData = table.row( '.selected' ).data() );
		console.log("works: " + assetData.assetId);
		
//		localStorage.setItem('asset', JSON.stringify(assetData));
		
//		var asset = JSON.parse(localStorage.getItem('asset'));
		
//		localStorage.removeItem('asset');
		
		
    } );
	
	//Search
	$('#assetId').on( 'keyup', function () 
	{
		var assetTable = assetList(dataSet);
		assetTable.search( this.value ).draw();
	} );
	
	
	function assetList(dataSet)
	{
		
		var assetTable = $("#asset-table").DataTable({
			retrieve: true,
			select: true,
			data: dataSet,
			columns: 
			[
				{data: 'assetId'},
				{data: 'name'},
				{data: 'description'},
				{data: 'brand'},
				{data: 'datePurchased'},
				{data: 'status'}
			]
		});
		
		return assetTable;
	}
	
	function findAll()
	{
		
		$.ajax({
			url:"assetManagement/asset/findAll", 
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSet = data;
				
				assetList(dataSet);
				
			}
		});
	}
	
	function remove()
	{
		var table = $('#asset-table').DataTable();

		var rowToDelete = table.row( '.selected' ).data();
		
		if (rowToDelete)
		{
			$.ajax({
				url:"assetManagement/asset/delete/" + rowToDelete.assetId, 
				dataType: "json",
				type: "DELETE",
				success: alert("Asset " + rowToDelete.assetId + " was removed") + findAll()
			});
			
			table.row('.selected').remove().draw( false );
		}
		else
		{
			alert("Please select a asset to remove");
		}	
		
	}

});