$(document).ready(function()
{	
	var dataSet = [];
	
	//All data fields on start up
	findAll();
	
	//Click to select row from the table
	$('#asset-table tbody').on('click','tr', function()
	{
		
		$(this).toggleClass('selected');
		
		/*if ( $(this).hasClass('selected') )
		{
            $(this).removeClass('selected');
            $('#setAsset-btn').prop('disabled', true);
		}
		else
		{
            $('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            $('#setAsset-btn').prop('disabled', false);
        }*/
	} );
	
	//Form delete button
	$('#delete-btn').click(function(event) 
	{
		var table = $('#asset-table').DataTable();
		remove();
		
		table.rows('.selected').remove().draw( false );
		
	});
	
	//Modal form create button
	$('#form-create-btn').click(function(event) 
	{
		//Check to see if all fields are filled in
		if(validate())
		{
			//if all fields are filled then create asset
			create();
		}
	});
	
	//Modal form create-close button
	$('#form-close-btn').click(function(event) 
	{
		document.getElementById("create").reset();
	});
	
	//Form update button
	$('#edit-btn').click(function(event) 
	{
		var table = $('#asset-table').DataTable();

		//Get data of the selected row
		var update = table.row( '.selected' ).data();
		if(update)
		{
			//Data in the update variable gets saved as an object
			//Take that data and display it in the modal form
			displayAsset(update);
			$('#updateModal').modal('show');
		}
		else
		{
			alert("Please select an asset to edit");
		}
	});
	
	//Modal form update button
	$('#form-update-btn').click(function(event) 
	{
		//Check to see if all fields are filled in
		if(validateUpdate())
		{
			//if all fields are filled then update asset
			update();
		}
	});
	
	//select asset to be assigned
	$('#setAsset-btn').click( function () 
	{
		var table = $('#asset-table').DataTable();
		//Get data from the selected row
		var assetData = table.rows( '.selected' ).data();
		
		//Returns an array because there can be multiple rows selected
		if(assetData.length != 0)
		{
			//Get data from the local storage
			emp = JSON.parse(localStorage.getItem('emp'));
			if(emp)
			{
				//Save selected rows to local storage and
				//Create asset assigned table if there is employee data
				selectAsset();
				assign();
			}
			else
			{
				//Send to employee table if there is no employee data
				clearLocal();
				selectAsset();
				window.location = "http://localhost:8080/employee";
				alert("Please select an employee to assign to the selected asset");
			}
		}
		else
		{
			alert("Please select an asset to assign to an employee");
		}
		
    } );	
	
	//Create dataTable with JSON data
	function assetList(dataSet)
	{
		
		var assetTable = $("#asset-table").DataTable({
			dom: '<f<t>lip>',
			retrieve: true,
			select: true,
			data: dataSet,
			columns: 
			[
				{data: 'assetCode'},
				{data: 'name'},
				{data: 'description'},
				{data: 'brand'},
				{data: 'datePurchased'},
				{data: 'status'}
			]
		});
		
		return assetTable;
	}
	
	//Find data from the database
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
	
	//Soft delete
	function remove()
	{
		var table = $('#asset-table').DataTable();

		//Returns an array of the selected rows
		var rowToDelete = table.rows( '.selected' ).data();
		var items = rowToDelete.length;
		
		if (rowToDelete.length != 0)
		{
			//For each row selected, delete
			for (i = 0; i < items; i++)
			{
				$.ajax({
					url:"assetManagement/asset/delete/" + rowToDelete[i].assetCode, 
					dataType: "json",
					type: "DELETE",
					success: alert("Asset " + rowToDelete[i].assetCode + " was removed")
				});
				
			}
			table.rows('.selected').remove().draw( false );
		}
		else
		{
			alert("Please select a asset to remove");
		}	
		
	}
	
	//Saving selected rows to local storage
	function selectAsset()
	{
		var table = $('#asset-table').DataTable();
		var assetData = table.rows( '.selected' ).data();
		var items = assetData.length;
		
		if (assetData)
		{
			//For each row selected save to the databse
			for (i = 0; i < items; i++)
			{
				localStorage.setItem('asset'+ [i], JSON.stringify(assetData[i]));
			}
			
//			var asset = JSON.parse(localStorage.getItem('asset'));
			
//			localStorage.removeItem('asset');
			
			
		}
		else
		{
			alert("Please select a asset");
		}	

	}
	
	//If there is emp data then set asset and emp values to assetAssigned table and then clear the local storage
	function assign()
	{
		createTable();
		clearLocal();
		
		window.location = "http://localhost:8080/assetAssigned";
	}
	
	function create()
	{
		dataSet = [];
		var table = $('#asset-table').DataTable();
		
		//Data from the form
		var dOP = new Date($('#datePurchased').val());
		var day = dOP.getDate();
		var month = dOP.getMonth() + 1;
		var year = dOP.getFullYear();
		
		var assetCode = $('#id').val();
		var name = $('#name').val();
		var description = $('#desc').val();
		var brand = $('#brand').val();
		var datePurchased = [year, month, day].join('/');
		var status = $('#status').val();
		
		//Set as object
		var asset = {assetCode, name, description, brand, datePurchased, status};
		
		//Translate so that JSON can read it
		var data_json = JSON.stringify(asset);
		
		//Before creating, first check to see if the asset already exists
		var exists = findId(assetCode);
		
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
					success: alert("Asset " + assetCode + " has been created") + table.row.add(asset).draw()
				});
			
			//Clear data from the modal form
			document.getElementById("create").reset();
			$('#createModal').modal('hide');
		}
		else
		{
			alert("The Asset "+ assetCode + " you're trying to create already exists");
		}

	}
	
	function findId(id)
	{
		var dataSet = [];
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
		
		//Data from update form
		var dOP = new Date(document.forms["update"]["uDate"].valueAsDate);
		var day = dOP.getDate();
		var month = dOP.getMonth() + 1;
		var year = dOP.getFullYear();
		var datePurchased = [year, month, day].join('/');
		
		var assetCode = document.forms["update"]["uId"].value;
		var name = document.forms["update"]["uName"].value;
		var description = document.forms["update"]["uDesc"].value;
		var brand = document.forms["update"]["uBrand"].value;
		//var datePurchased = document.forms["update"]["uDate"].valueAsDate;
		var status = document.forms["update"]["uStatus"].value;
		
		var assetObj = findId(assetCode);
		var assetId = assetObj.assetId;
		
		var asset = {assetId, assetCode, name, description, brand, datePurchased, status};
		
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
			success: alert("Asset " + assetCode + " has been updated") + table.row( '.selected' ).data(asset).draw()
		});
		
		$('#updateModal').modal('hide');
	}
	
	function displayAsset(asset)
	{
		var dOP = new Date(asset.datePurchased);
		var day = dOP.getDate() + 1;
		var month = dOP.getMonth() + 1;
		var year = dOP.getFullYear();
		var datePurchased = new Date([year, month, day].join('/'));
		
		document.forms["update"]["uId"].value = asset.assetCode;
		document.forms["update"]["uName"].value = asset.name;
		document.forms["update"]["uDesc"].value = asset.description;
		document.forms["update"]["uBrand"].value = asset.brand;
		document.forms["update"]["uDate"].valueAsDate = datePurchased;
		document.forms["update"]["uStatus"].value = asset.status;
		
	}
	
	function createTable()
	{
		var assetStorage = localStorage.length - 1;
		
		asset = JSON.parse(localStorage.getItem('asset0'));
		emp = JSON.parse(localStorage.getItem('emp'));
		
		if(asset && emp)
		{
			for(i = 0; i < assetStorage; i++)
			{
				asset = JSON.parse(localStorage.getItem('asset' + [i]));
				
				var assetAssigned = {assets: asset, employees: emp};
				
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; 
				var yyyy = today.getFullYear();
				
				today = dd + '-' + mm + '-' + yyyy;
				assetAssigned.moveDate = today;
				//assetAssigned.moveDate = new Date(dd,mm,yyyy);
			
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
					type: "POST"
				});
			}
			alert("Data successfully assigned");
		}
		else
		{
			alert("Neither an asset or employee was selected");
		}
	}
	
	function clearLocal()
	{
		if(emp)
		{
			var assetStorage = localStorage.length - 1;
		}
		else
		{
			var assetStorage = localStorage.length;
		}
		
		for(i = 0; i < assetStorage; i++)
		{
			localStorage.removeItem('asset' + [i]);
		}
		
		localStorage.removeItem('emp');
	}


});