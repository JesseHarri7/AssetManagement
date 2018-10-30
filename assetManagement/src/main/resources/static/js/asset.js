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
		if(validate())
		{
			create();
		}
	});
	
	//form update
	$('#edit-btn').click(function(event) 
	{
		var table = $('#asset-table').DataTable();

		var update = table.row( '.selected' ).data();
		if(update)
		{
			displayAsset(update);
			$('#updateModal').modal('show');
		}
		else
		{
			alert("Please select an asset to edit");
		}
	});
	
	//Modal form update
	$('#form-update-btn').click(function(event) 
	{
		if(validateUpdate())
		{
			update();
		}
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
			dom: '<f<t>lip>',
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
		assetData = table.row( '.selected' ).data();
		
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
		dataSet = [];
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
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSet = data;
			},
			error: function(data)
			{
				dataSet = [];
			}
		});
		return dataSet;
	}
	
	function validate()
	{
		 var id = document.forms["create"]["id"].value;
		 var name = document.forms["create"]["name"].value;
		 var desc = document.forms["create"]["desc"].value;
		 var brand = document.forms["create"]["brand"].value;
		 var date = document.forms["create"]["date"].value;
		 var status = document.forms["create"]["status"].value;
		 
	    if(id == "" || name == "" || desc == "" || brand == "" || date == "" || status == "") 
	    {
	        alert("All fields must be filled out");
	        return false;
	    }
	    else
	    {
	    	return true;
	    }
	}
	
	function validateUpdate()
	{
		var id = document.forms["update"]["uId"].value;
		var name = document.forms["update"]["uName"].value;
		var desc = document.forms["update"]["uDesc"].value;
		var brand = document.forms["update"]["uBrand"].value;
		//document.getElementById("uDatePurchased").value = asset.datePurchased;
		var date = document.forms["update"]["uDate"].valueAsDate;
		var status = document.forms["update"]["uStatus"].value;
		 
	    if(id == "" || name == "" || desc == "" || brand == "" || date == "" || status == "") 
	    {
	        alert("All fields must be filled out");
	        return false;
	    }
	    else
	    {
	    	return true;
	    }
	}
	
	function update()
	{
		var table = $('#asset-table').DataTable();
		
		var assetId = document.forms["update"]["uId"].value;
		var name = document.forms["update"]["uName"].value;
		var description = document.forms["update"]["uDesc"].value;
		var brand = document.forms["update"]["uBrand"].value;
		var datePurchased = document.forms["update"]["uDate"].valueAsDate;
		var status = document.forms["update"]["uStatus"].value;
		
		var asset = {assetId, name, description, brand, datePurchased, status};
		
		var data_json = JSON.stringify(asset);
		
		$.ajax(
		{
			headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
		    },
			url:"assetManagement/asset/update", 
			dataType: "json",
			data: data_json,
			type: "PUT",
			success: alert("Asset " + assetId + " has been updated") + table.row( '.selected' ).data(asset).draw()
		});		
	}
	
	function displayAsset(asset)
	{
		var dOP = new Date(asset.datePurchased);
		var day = dOP.getDate() + 1;
		var month = dOP.getMonth() + 1;
		var year = dOP.getFullYear();
		var datePurchased = new Date([year, month, day].join('/'));
		
		document.forms["update"]["uId"].value = asset.assetId;
		document.forms["update"]["uName"].value = asset.name;
		document.forms["update"]["uDesc"].value = asset.description;
		document.forms["update"]["uBrand"].value = asset.brand;
		//document.getElementById("uDatePurchased").value = asset.datePurchased;
		document.forms["update"]["uDate"].valueAsDate = datePurchased;
		document.forms["update"]["uStatus"].value = asset.status;
			 
	}


});