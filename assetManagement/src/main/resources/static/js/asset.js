$(document).ready(function()
{	
	var count = 0;
	var dataSet = [];
	
	//Global div declaration for alerts
	var div = document.getElementById('boot-alert');
	
	//All data fields on start up
	findAll();
	
	//Show cancel button if there is data in local storage
	showBtn();
	
	$('#test-btn').click(function(event) 
	{
		$.notify({
			title: '<strong>Heads up!</strong>',
			message: 'You can use any of bootstraps other alert styles as well by default.'
		},{
			animate: 
			{
				enter: 'animated fadeInRight',
				exit: 'animated fadeOutRight'
			},
			type: 'success'
			
		});		
	});

	
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

		//Returns an array of the selected rows
		var rowToDelete = table.rows( '.selected' ).data();
		
		if (rowToDelete.length != 0)
		{
			displayAlertT("Are you sure you want to delete? <input type='button' value='Yes' id='delYes-btn'> <a id='delNo' data-id='No' href='#' class='alert-link' >No</a>.", "info", "Heads up!")
			
			/*div.innerHTML = displayAlert("Are you sure you want to delete? <a id='delYes' data-id='Yes' class='alert-link' href='#'>Yes</a>  <a id='delNo' data-id='No' href='#' class='alert-link' >No</a>.", "alert-info");
			$('#boot-alert').show();*/
		}
		else
		{
			div.innerHTML = displayAlert("<strong>Warning!</strong> Please select an asset to remove.", "alert-warning");
			$('#boot-alert').show();
			slide();
			
			//alert("Please select a asset to remove");
		}	
	});
	
	$('#delYes-btn').click(function(event)
	{
		console.log("test");
	});
	
	/*$('#boot-alert').on('click','a', function() 
	{
		var $el = $(this);
		
		if($el.data('id') == 'Yes')
		{
			checkRemove();
		}
		else
		{
			$('#boot-alert').hide();
		}		
	});*/
	
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
	
	//Clear local storage to cancel assign 
	$('#cancel-btn').click(function(event) 
	{
		resetLocal();
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
			div.innerHTML = displayAlert("<strong>Warning!</strong> Please select an asset to edit.", "alert-warning");
			$('#boot-alert').show();
			slide();
			
			//alert("Please select an asset to edit");
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
			div.innerHTML = displayAlert("<strong>Warning!</strong> Please select an asset to assign to an employee.", "alert-warning");
			$('#boot-alert').show();
			slide();
			//alert("Please select an asset to assign to an employee");
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
	function checkRemove()
	{
		var table = $('#asset-table').DataTable();

		//Returns an array of the selected rows
		var rowToDelete = table.rows( '.selected' ).data();

		var items = rowToDelete.length;		
		
		//For each row selected, delete
		for (i = 0; i < items; i++)
		{
			//Check to see if the asset isn't already assigned
			var assetSet = alreadySet(rowToDelete[i].assetCode);
			if(assetSet)
			{
				if(confirm("Asset " + assetSet.assets.assetCode + " is already assigned. This will unassign the asset from the employee, are you sure you want to delete?"))
				{
					assignedRemove(assetSet);
					remove(rowToDelete[i].assetCode);
				}
				else
				{
					div.innerHTML = displayAlert("<strong>Alert!</strong> Cancelled.", "alert-success");
					$('#boot-alert').show();
					slide();
				}
			}
			else
			{
				remove(rowToDelete[i].assetCode);
			}
		}
	}
		
	function remove(assetCode)
	{
		var table = $('#asset-table').DataTable();
		
		$.ajax({
			url:"assetManagement/asset/delete/" + assetCode, 
			dataType: "json",
			type: "DELETE",
			success: success()//alert("Asset " + rowToDelete[i].assetCode + " was removed")
		});
		
		table.rows('.selected').remove().draw( false );
		$('#boot-alert').hide();
		function success()
		{
			alert("Asset " + assetCode + " was removed.");
			
			/*div.innerHTML = displayAlert("<strong>Success!</strong> Asset" + rowToDelete[i].assetCode + " was removed.", "alert-success");
			$('#boot-alert').show();
			slide();*/
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
			div.innerHTML = displayAlert("<strong>Warning!</strong> Please select an asset.", "alert-warning");
			$('#boot-alert').show();
			slide();
			
			//alert("Please select a asset");
		}	

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
					success: success() //alert("Asset " + assetCode + " has been created") + table.row.add(asset).draw()
				});
			function success()
			{
				div.innerHTML = displayAlert("<strong>Success!</strong> Asset " + assetCode + " has been created.", "alert-success");
				$('#boot-alert').show();
				slide();
				
				table.row.add(asset).draw()
			}
			
			//Clear data from the modal form
			document.getElementById("create").reset();
			$('#createModal').modal('hide');
		}
		else
		{
			var divM = document.getElementById('boot-alert-m');
			
			divM.innerHTML = displayAlert("<strong>Error!</strong> The Asset " + assetCode + " you're trying to create already exists.", "alert-danger");
			$('#boot-alert-m').show();
			slideCreateModal();
			
			//alert("The Asset "+ assetCode + " you're trying to create already exists");
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
	    	var divM = document.getElementById('boot-alert-m');
	    	
	    	divM.innerHTML = displayAlert("<strong>Warning!</strong> All fields must be filled out.", "alert-warning");
			$('#boot-alert-m').show();
			slideCreateModal();
						
	        //alert("All fields must be filled out");
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
	    	var divM = document.getElementById('boot-alert-m-u');
	    	
	    	divM.innerHTML = displayAlert("<strong>Warning!</strong> All fields must be filled out.", "alert-warning");
			$('#boot-alert-m-u').show();
			slideUpdateModal();
			
	        //alert("All fields must be filled out");
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
			success: success() //alert("Asset " + assetCode + " has been updated") + table.row( '.selected' ).data(asset).draw()
		});
		function success()
		{
			div.innerHTML = displayAlert("<strong>Success!</strong> Asset " + assetCode + " has been updated.", "alert-success");
			$('#boot-alert').show();
			slide();
			
			table.row( '.selected' ).data(asset).draw();
			
			$('#updateModal').modal('hide');
		}
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
	
	//If there is emp data then set asset and emp values to assetAssigned table and then clear the local storage
	function assign()
	{
		createTable();
		if(count > 0)
		{
			alert("Data successfully assigned");
			window.location = "http://localhost:8080/assetAssigned";
		}

		clearLocal();
		$('#cancel-btn').hide();
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
				var assetSet = alreadySet(asset.assetCode);
				
				if(assetSet)
				{
					/*div.innerHTML = displayAlert("<strong>Error!</strong> Asset " + asset.assetCode + " is already assigned to employee " + assetSet.employees.employeeID + ".", "alert-danger");
					$('#boot-alert').show();
					slide();*/
					alert("Asset " + asset.assetCode + " is already assigned to employee " + assetSet.employees.employeeID);
				}
				else
				{
					count++;
					asset = JSON.parse(localStorage.getItem('asset' + [i]));
					
					var assetAssigned = {assets: asset, employees: emp};
					
					var today = new Date();
					var dd = today.getDate();
					var mm = today.getMonth()+1; 
					var yyyy = today.getFullYear();
					
					today = yyyy + '-' + mm + '-' + dd;
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
			}
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
	
	function resetLocal()
	{
		localStorage.clear();
		
		div.innerHTML = displayAlert("<strong>Success!</strong> Assigning successfully cancelled.", "alert-success");
		$('#boot-alert').show();
		slide();
		
		//alert("Assigning successfully cancelled");
		
		$('#cancel-btn').removeClass('visible');
	}
	
	function showBtn()
	{
		if(localStorage.length > 0)
		{
			$('#cancel-btn').addClass('visible');
		}
	}
	
	function alreadySet(id)
	{
		var dataSetA = [];

		$.ajax({
			url:"assetManagement/assetAssigned/findAllAsset/" + id,
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSetA = data
			},
			error: dataSetA = null
		});
		
		if(dataSetA)
		{
			return dataSetA;
		}
		else
		{
			return false;
		}

	}
	
	function assignedRemove(assign)
	{
		
		$.ajax({
			url:"assetManagement/assetAssigned/delete/" + assign.id,
			dataType: "json",
			type: "DELETE",
			success: alert("Asset " + assign.assets.assetCode + " and employee " + assign.employees.employeeID + " is now unassigned")
		});

	}
	
	function slide()
	{
		$('#boot-alert').fadeTo(5000, 900).slideUp(900, function(){
			$('#boot-alert').slideUp(900);
		});
	}
	
	function slideCreateModal()
	{
		$('#boot-alert-m').fadeTo(5000, 900).slideUp(900, function(){
			$('#boot-alert-m').slideUp(900);
		});
	}
	
	function slideUpdateModal()
	{
		$('#boot-alert-m-u').fadeTo(5000, 900).slideUp(900, function(){
			$('#boot-alert-m-u').slideUp(900);
		});
	}
	
	function displayAlert(msg, type)
	{
		var alert = "<div class='alert " + type + " alert-dismissible fade in'> <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> "
						+ msg + "</div>";
		return alert;
	}
	
	function displayAlertT(msg, type, title)
	{
		$.notify({
			title: '<strong>' + title + '</strong>',
			message: msg
		},{
			animate: 
			{
				enter: 'animated fadeInRight',
				exit: 'animated fadeOutRight'
			},
			type: type,
			delay: 10000,
			timer: 1000,
			
		});
	}

});