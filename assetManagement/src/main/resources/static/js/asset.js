//$(document).ready(function()
//{	
	var count = 0;
	var dataSet = [];
	
	//Global div declaration for alerts
	var div = document.getElementById('boot-alert');
	
	//All data fields on start up
	findAll();
	
	//Show cancel button if there is data in local storage
	showBtn();
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/*$('#test-btn').click(function(event) 
	{
//		$('.notifyjs-wrapper').remove();
		$('.notifyjs-corner').remove();
		$('.notifyjs-bootstrap-base.notifyjs-bootstrap-success').remove();
		for (var i = 0; i < 4; i++)
		{
			createNotify(i);
			//Check to see if the asset isn't already assigned
			//var assetSet = alreadySet(rowToDelete[i].assetCode);
			if(true)
			{	
				$.notify({
					  title: 'Are you sure you want to delete asset: ' + i,
					  button: 'Confirm'
					}, {
					  style: 'foo',
					  autoHide: false,
					  clickToHide: false
					});
				
				//testing(i);
			}
			else
			{
				alert("Deleted if not assigned");
			}	
		}
	});
	
	function testBest(i) {
		$.notify("Cancelled this asset "+i, "success");
		//programmatically trigger propogating hide event
		$('.no'+i).trigger('notify-hide');
	}
	
	function testBestY(i) {
		$.notify("Delete this asset " + i, "success");
		//hide notification
		$('.yes'+i).trigger('notify-hide');
	}
	
	function testing(i)
	{
		//listen for click events from this style
		//If no
		
		$(document).on('click', '.notifyjs-foo-base .no'+i, function() 
		{
			//function
				$.notify("Cancelled this asset " + i, "success");
				//programmatically trigger propogating hide event
				$(this).trigger('notify-hide');
		});

		//if Yes
		$(document).on('click', '.notifyjs-foo-base .yes'+i, function() 
		{
			//Function
			$.notify("Delete this asset " + i, "success");
			//hide notification
			$(this).trigger('notify-hide');
		});
		
	}
	
	//Notify class
	function createNotify(i)
	{
		//add a new style 'foo'

		$.notify.addStyle('foo', {
		  html: 
		    "<div>" +
		      "<div class='clearfix'>" +
		        "<div class='title' data-notify-html='title'/>" +
		        "<div class='buttons'>" +
		          "<input type='button' onclick='testBest("+i+")' value='Cancel' class='btn btn-secondary no"+i+"'> " +
		          " <input type='button' onclick='testBestY("+i+")' value='Confirm' class='btn btn-secondary yes"+i+"'>" +
		        "</div>" +
		      "</div>" +
		    "</div>"
		});
		
		
		
		
		
	}*/
		
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	/*if(sessionStorage.getItem("userN"))
	{
		// Access some stored data	
		//$.notify( "username = " + sessionStorage.getItem("userN"));
	}
	else
	{
		window.location = "http://localhost:8080/";
	}*/
	
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
		
		$('.notifyjs-corner').remove();
		
		if (rowToDelete.length != 0)
		{
			createNotifyD();
			
			$.notify({
				  title: 'Are you sure you want to delete?',
				  button: 'Confirm'
				}, {
				  style: 'foo',
				  className: 'info',
				  autoHide: false,
				  clickToHide: false
				});
			
//			displayAlertT("Are you sure you want to delete? <p><a href='#' class='alert-link' onclick='delYes();'>Yes</a> <a href='#' class='alert-link' onclick='delNo();' >No</a></p>", "info", "Heads up!");
			
			/*div.innerHTML = displayAlert("Are you sure you want to delete? <a id='delYes' data-id='Yes' class='alert-link' href='#'>Yes</a>  <a id='delNo' data-id='No' href='#' class='alert-link' >No</a>.", "alert-info");
			$('#boot-alert').show();*/
			
		}
		else
		{
			$.notify("Heads up! Please select an asset to remove.", "warn");
			//displayAlertT("Please select an asset to remove.", "warning", "Heads up!");
			
			/*div.innerHTML = displayAlert("<strong>Warning!</strong> Please select an asset to remove.", "alert-warning");
			$('#boot-alert').show();
			slide();*/
			
			//alert("Please select a asset to remove");
		}
		
	});
	
	//listen for click events from this style
	//If no
	$(document).on('click', '.notifyjs-foo-base .noD', function() 
	{
		//programmatically trigger propogating hide event
		$(this).trigger('notify-hide');
		
	});

	//if Yes
	$(document).on('click', '.notifyjs-foo-base .yesD', function() 
	{
		/*var table = $('#asset-table').DataTable();
		
		var test = table.row('.selected').id();
		table.rows(test).remove().draw( false );*/
		
		//Function
		checkRemove();
		//hide notification
		$(this).trigger('notify-hide');
		
	});

	//Notify class
	function createNotifyD()
	{
		//add a new style 'foo'
		$.notify.addStyle('foo', {
		  html: 
		    "<div>" +
		      "<div class='clearfix'>" +
		        "<div class='title' data-notify-html='title'/>" +
		        "<div class='buttons'>" +
		          "<button class='btn btn-secondary noD'>Cancel</button>" +
		          "<button class='btn btn-secondary yesD' data-notify-text='button'></button>" +
		        "</div>" +
		      "</div>" +
		    "</div>"
		});
	}
	
/*	function delYes()
	{
		checkRemove();
	}

	function delNo()
	{	
		$.notifyClose();
	}*/
	
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
		$('.notifyjs-corner').remove();
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
		$('.notifyjs-corner').remove();
		resetLocal();
	});
	
	//Form update button
	$('#edit-btn').click(function(event) 
	{
		$('.notifyjs-corner').remove();
		
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
			$.notify("Heads up! Please select an asset to edit.", "warn");
//			displayAlertT("Please select an asset to edit.", "warning", "Heads up!");
			
			/*div.innerHTML = displayAlert("<strong>Warning!</strong> Please select an asset to edit.", "alert-warning");
			$('#boot-alert').show();
			slide();*/
			
			//alert("Please select an asset to edit");
		}
	});
	
	//Modal form update button
	$('#form-update-btn').click(function(event) 
	{
		$('.notifyjs-corner').remove();
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
		$('.notifyjs-corner').remove();
		
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
			$.notify("Heads up! Please select an asset to assign to an employee.", "warn");
			
//			displayAlertT("Please select an asset to assign to an employee.", "warning", "Heads up!");
			
			/*div.innerHTML = displayAlert("<strong>Warning!</strong> Please select an asset to assign to an employee.", "alert-warning");
			$('#boot-alert').show();
			slide();*/
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
			rowId: 'assetCode',
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
		$('.notifyjs-corner').remove();
		//For each row selected, delete
		for (i = 0; i < items; i++)
		{
			//Check to see if the asset isn't already assigned
			var assetSet = alreadySet(rowToDelete[i].assetCode);
			
			if(assetSet)
			{
				createNotify(assetSet.assets.assetCode, i);
				
				$.notify({
					  title: "Asset " + assetSet.assets.assetCode + " is already assigned. This will unassign the asset from the employee, are you sure you want to delete?",
					  button: 'Confirm'
					}, {
					  style: 'foo',
					  autoHide: false,
					  clickToHide: false
					});
				
				/*if(confirm("Asset " + assetSet.assets.assetCode + " is already assigned. This will unassign the asset from the employee, are you sure you want to delete?"))
				{
					assignedRemove(assetSet);
					remove(rowToDelete[i].assetCode);
				}
				else
				{
					$.notify("Success! Action was cancelled.", "success");
					
//					displayAlertT("Action was cancelled.", "success", "Success!");
				}*/
				
			}
			else
			{
				remove(rowToDelete[i].assetCode);
			}
		}
	}
	
	function createNotify(code, i)
	{
		//add a new style 'foo'

		$.notify.addStyle('foo', {
		  html: 
		    "<div>" +
		      "<div class='clearfix'>" +
		        "<div class='title' data-notify-html='title'/>" +
		        "<div class='buttons'>" +
		          "<button onclick='chkNo("+code+","+i+")' class='btn btn-secondary no"+i+"'>Cancel</button> " +
		          "<button onclick='chkYes("+code+","+i+")' class='btn btn-secondary yes"+i+"'>Confirm</button>" +
		        "</div>" +
		      "</div>" +
		    "</div>"
		});
	}
	
	//toast Cancel button
	function chkNo(code, i) 
	{
		$.notify("Success! Action was cancelled.", "success");
		//programmatically trigger propogating hide event
		$('.no'+i).trigger('notify-hide');
	}

	//Toast confirm button
	function chkYes(code, i) 
	{
		//Function
		var assetSet = alreadySet(code);
		assignedRemove(assetSet);
		remove(code);
		//hide notification
		$('.yes'+i).trigger('notify-hide');
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
		
		function success()
		{
			$.notify("Success! Asset " + assetCode + " was removed.", "success");
			table.row("#"+assetCode).remove().draw( false );
			
//			displayAlertT("Asset " + assetCode + " was removed.", "success", "Success!");
			
//			alert("Asset " + assetCode + " was removed.");
			
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
			$.notify("Heads up! Please select an asset.", "warn");
			
//			displayAlertT("Please select an asset.", "warning", "Heads up!");
			
			/*div.innerHTML = displayAlert("<strong>Warning!</strong> Please select an asset.", "alert-warning");
			$('#boot-alert').show();
			slide();*/
			
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
				$.notify("Success! Asset " + assetCode + " has been created.", "success");
				
//				displayAlertT("Asset " + assetCode + " has been created.", "success", "Success!");
				
				/*div.innerHTML = displayAlert("<strong>Success!</strong> Asset " + assetCode + " has been created.", "alert-success");
				$('#boot-alert').show();
				slide();*/
				
				table.row.add(asset).draw()
			}
			
			//Clear data from the modal form
			document.getElementById("create").reset();
			$('#createModal').modal('hide');
		}
		else
		{
			$.notify("Error! The Asset " + assetCode + " you're trying to create already exists.", "Error");
			
//			displayAlertT("The Asset " + assetCode + " you're trying to create already exists.", "danger", "Error!");
			
			/*var divM = document.getElementById('boot-alert-m');
			
			divM.innerHTML = displayAlert("<strong>Error!</strong> The Asset " + assetCode + " you're trying to create already exists.", "alert-danger");
			$('#boot-alert-m').show();
			slideCreateModal();*/
			
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
	    	$.notify("Heads up! All fields must be filled out.", "warn");
	    	
//	    	displayAlertT("All fields must be filled out.", "warning", "Heads up!");
	    	
	    	/*var divM = document.getElementById('boot-alert-m');
	    	
	    	divM.innerHTML = displayAlert("<strong>Warning!</strong> All fields must be filled out.", "alert-warning");
			$('#boot-alert-m').show();
			slideCreateModal();*/
						
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
	    	$.notify("Heads up! All fields must be filled out.", "warn");
	    	
//	    	displayAlertT("All fields must be filled out.", "warning", "Heads up!");
	    	
	    	/*var divM = document.getElementById('boot-alert-m-u');
	    	
	    	divM.innerHTML = displayAlert("<strong>Warning!</strong> All fields must be filled out.", "alert-warning");
			$('#boot-alert-m-u').show();
			slideUpdateModal();*/
			
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
			$.notify("Success! Asset " + assetCode + " has been updated.", "success");
			
//			displayAlertT("Asset " + assetCode + " has been updated.", "success", "Success!");
			
			/*div.innerHTML = displayAlert("<strong>Success!</strong> Asset " + assetCode + " has been updated.", "alert-success");
			$('#boot-alert').show();
			slide();*/
			
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
					$.notify("Error! Asset " + asset.assetCode + " is already assigned to employee " + assetSet.employees.employeeID, "error");
					
//					displayAlertT("Asset " + asset.assetCode + " is already assigned to employee " + assetSet.employees.employeeID, "danger", "Error!");
					
					//alert("Asset " + asset.assetCode + " is already assigned to employee " + assetSet.employees.employeeID);
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
			$.notify("Heads up! Neither an asset or employee was selected", "warn");
			
//			displayAlertT("Neither an asset or employee was selected.", "warning", "Heads up!");
			
			//alert("Neither an asset or employee was selected");
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
		
		$.notify("Success! Assigning successfully cancelled", "success");
		
//		displayAlertT("Assigning successfully cancelled.", "success", "Success!");
		
		/*div.innerHTML = displayAlert("<strong>Success!</strong> Assigning successfully cancelled.", "alert-success");
		$('#boot-alert').show();
		slide();*/
		
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
			success: $.notify("Success! Asset " + assign.assets.assetCode + " and employee " + assign.employees.employeeID + " is now unassigned.", "success")//displayAlertT("Asset " + assign.assets.assetCode + " and employee " + assign.employees.employeeID + " is now unassigned.", "success", "Success!") //alert("Asset " + assign.assets.assetCode + " and employee " + assign.employees.employeeID + " is now unassigned")
		});

	}
	
	/*function slide()
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
	}*/
	
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
			mouse_over: 'pause',
			z_index: 2000
			
		});
	}

//});