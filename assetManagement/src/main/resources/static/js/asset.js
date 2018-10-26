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
            $('#setAsset-btn').prop('disabled', true);
		}
		else 
		{
            $('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            $('#setAsset-btn').prop('disabled', false);
        }
	} );
	
	//Delete
	$('#delete-btn').click(function(event) 
	{
		var table = $('#asset-table').DataTable();
		remove();
		
		table.row('.selected').remove().draw( false );
		
	});
	
	//form create
	$('#form-create-btn').click(function(event) 
	{
		create();
		
	});
	
	//select asset 
	$('#setAsset-btn').click( function () 
	{
		selectAsset();
		
    } );
	
	//Clear local storage
	$('#clear-btn').click( function()
	{
		localStorage.removeItem('asset');
		localStorage.removeItem('emp');
		alert("Cleared");
	})
	
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
				success: alert("Asset " + rowToDelete.assetId + " was removed")
			});
			
			table.row('.selected').remove().draw( false );
		}
		else
		{
			alert("Please select a asset to remove");
		}	
		
	}
	
	function selectAsset()
	{
		var assetData;
		var table = $('#asset-table').DataTable();
		console.log(assetData = table.row( '.selected' ).data() );
		
		if (assetData)
		{
			console.log("works: " + assetData.assetId);
			
			localStorage.setItem('asset', JSON.stringify(assetData));
			
			window.location = "http://localhost:8080/employee";
			
//			var asset = JSON.parse(localStorage.getItem('asset'));
			
//			localStorage.removeItem('asset');
		}
		else
		{
			alert("Please select a asset");
		}	

	}
	
	function create()
	{
		var table = $('#asset-table').DataTable();
		
		
		var dOP = new Date($('#datePurchased').val());
		var day = dOP.getDate();
		var month = dOP.getMonth() + 1;
		var year = dOP.getFullYear();
		
		var assetId = $('#id').val();
		var name = $('#name').val();
		var description = $('#desc').val();
		var brand = $('#brand').val();
		var datePurchased = [year, month, day].join('/');
		var status = $('#status').val();
		
		var asset = {assetId, name, description, brand, datePurchased, status};
		
		var data_json = JSON.stringify(asset);
		var exists = findId(assetId);
		
		if(exists.length == 0)
		{
			$.ajax(
				{
					headers: { 
				        'Accept': 'application/json',
				        'Content-Type': 'application/json' 
				    },
					url:"assetManagement/asset/create", 
					dataType: "json",
					data: data_json,
					type: "POST",
					success: alert("Asset " + assetId + " has been created") + table.row.add(asset).draw()
				});
		}
		else
		{
			alert("The Asset "+ assetId + " you're trying to create already exists");
		}

	}
	
	function findId(id)
	{
		//var assetId = $('#id').val();
		
		$.ajax({
				url:"assetManagement/asset/" + id,
				dataType: "json",
				type: "GET",
				success: function(data)
				{
					dataSet = data;				
				}
			});
		return dataSet;
	}


});