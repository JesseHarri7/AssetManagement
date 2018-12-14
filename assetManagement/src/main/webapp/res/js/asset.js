//$(document).ready(function()
//{	
	var count = 0;
	var dataSet = [];
	
	//Add temps html files
	includeHTML();
	
	//All data fields on start up
	findAll();
	
	//Show cancel button if there is data in local storage
	showBtn();
	
	$('#test-btn').click(function(event) 
	{
		//Show active class for navigation bar
		showActiveNav();
	});
	
	//Show selected alert if employee is selected
	showSelectAlert();
	
	//Click to select row from the table
	$('#asset-table tbody').on('click','tr', function()
	{
		
		$(this).toggleClass('selected');
		
	});
	
	//Form delete button
	$('#delete-btn').click(function(event) 
	{
		var table = $('#asset-table').DataTable();			

		//Returns an array of the selected rows
		var rowToDelete = table.rows( '.selected' ).data();
		
		$('.notifyjs-corner').remove();
		
		if (rowToDelete.length == 0)
		{
			$.notify("Heads up! Please select an asset to remove.", "warn");
			//displayAlertT("Please select an asset to remove.", "warning", "Heads up!");
			
			//alert("Please select a asset to remove");
		}
		else if (rowToDelete.length >= 2)
		{
			$.notify("Heads up! Please only select one asset to remove.", "warn");
		}
		else
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
		//Clear modal form data
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
		//Clear .notify space
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
				window.location = "../pages/employee";
				alert("Please select an employee to assign to the selected asset");
			}
		}
		else
		{
			$.notify("Heads up! Please select an asset to assign to an employee.", "warn");
			
//			displayAlertT("Please select an asset to assign to an employee.", "warning", "Heads up!");

			//alert("Please select an asset to assign to an employee");
		}
		
    } );	
	
	//Create dataTable with JSON data
	function assetList(dataSet)
	{
		var assetTable = $("#asset-table").DataTable({
			dom: '<f<t>lip>',
			responsive: true,
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
				{data: 'datePurchased'}
//				{data: 'status'}
			]
		});
		
		return assetTable;
	}
	
	//Find data from the database
	function findAll()
	{
		
		$.ajax({
			url:"/assetManagement/asset/findAll",
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
		
	//First get input from user for the reason and then delete
	function remove(assetCode)
	{
		var table = $('#asset-table').DataTable();

		removeMsg(assetCode);
		
			$.ajax({
				url:"/assetManagement/asset/delete/" + assetCode, 
				dataType: "json",
				type: "DELETE",
				success: success()
			});
			
			function success()
			{
				$.notify("Success! Asset " + assetCode + " was removed.", "success");
				table.row("#"+assetCode).remove().draw( false );
				
//				displayAlertT("Asset " + assetCode + " was removed.", "success", "Success!");
				
//				alert("Asset " + assetCode + " was removed.");
			}
		
	}
	
	function removeMsg(assetCode)
	{	
		document.getElementById("removeCode").innerHTML = assetCode;
//		Get the reason for the asset being removed
		$('#removeModalId').modal('show');
	}
	
	$('#form-remove-btn').click(function(event) 
	{
		var assetCode = document.getElementById("removeCode").innerHTML;
		var status = document.forms["remove"]["rStatus"].value;
		
		//Find By id
		var assetObj = findId(assetCode);
		assetObj.status = status;

		var code = assetObj.assetCode;
		var assetId = assetObj.assetId;
		var brand = assetObj.brand;
		var date = assetObj.datePurchased;
		var desc = assetObj.description;
		var name = assetObj.name;
		var unassignDate = assetObj.unassignDate;
		var state = assetObj.state;
		var stat = assetObj.status;
			
		var asset = {assetCode: code, assetId, brand, datePurchased: date, description: desc, name, state, status: stat, unassignDate};
		
		var data_json = JSON.stringify(asset);
		
		//Update record with status message
		$.ajax(
		{
			headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
		    },
			url:"/assetManagement/asset/update", 
			dataType: "json",
			data: data_json,
			type: "PUT",
			success: success()
		});
		
		function success()
		{
			$.notify("Saved!", "success");

			$('#removeModalId').modal('hide');
		}
		
	});
	
	//Saving selected rows to local storage
	function selectAsset()
	{
		var table = $('#asset-table').DataTable();
		var assetData = table.rows( '.selected' ).data();
		var items = assetData.length;
		
		if (assetData)
		{
			//For each row selected save to the database
			for (i = 0; i < items; i++)
			{
				localStorage.setItem('asset'+ [i], JSON.stringify(assetData[i]));
			}
		}
		else
		{
			$.notify("Heads up! Please select an asset.", "warn");
			
//			displayAlertT("Please select an asset.", "warning", "Heads up!");
			
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
//		var status = $('#status').val();
		
		//Set as object
		var asset = {assetCode, name, description, brand, datePurchased};
		
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
					url:"/assetManagement/asset/create", 
					dataType: "json",
					data: data_json,
					type: "POST",
					success: success()
				});
			function success()
			{
				$.notify("Success! Asset " + assetCode + " has been created.", "success");
				
//				displayAlertT("Asset " + assetCode + " has been created.", "success", "Success!");
				
				//alert("Asset " + assetCode + " has been created") + table.row.add(asset).draw()
				
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

			//alert("The Asset "+ assetCode + " you're trying to create already exists");
		}

	}
	
	function findId(id)
	{
		var dataSet = [];

		$.ajax({
			url:"/assetManagement/asset/" + id,
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
//		 var status = document.forms["create"]["status"].value;
		 
	    if(id == "" || name == "" || desc == "" || brand == "" || date == "") 
	    {
	    	$.notify("Heads up! All fields must be filled out.", "warn");
	    	
//	    	displayAlertT("All fields must be filled out.", "warning", "Heads up!");
						
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
		var date = document.forms["update"]["uDate"].valueAsDate;
//		var status = document.forms["update"]["uStatus"].value;
		 
	    if(id == "" || name == "" || desc == "" || brand == "" || date == "") 
	    {
	    	$.notify("Heads up! All fields must be filled out.", "warn");
	    	
//	    	displayAlertT("All fields must be filled out.", "warning", "Heads up!");
	    	
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
//		var status = document.forms["update"]["uStatus"].value;
		
		var assetObj = findId(assetCode);
		var assetId = assetObj.assetId;
		
		var asset = {assetId, assetCode, name, description, brand, datePurchased};
		
		var data_json = JSON.stringify(asset);
		
		$.ajax(
		{
			headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
		    },
			url:"/assetManagement/asset/update", 
			dataType: "json",
			data: data_json,
			type: "PUT",
			success: success()
		});
		function success()
		{
			$.notify("Success! Asset " + assetCode + " has been updated.", "success");
			
//			displayAlertT("Asset " + assetCode + " has been updated.", "success", "Success!");

			//alert("Asset " + assetCode + " has been updated") + table.row( '.selected' ).data(asset).draw()
			
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
//		document.forms["update"]["uStatus"].value = asset.status;
		
	}
	
	//If there is emp data then set asset and emp values to assetAssigned table and then clear the local storage
	function assign()
	{
		createTable();
		if(count > 0)
		{
			//alert("Data successfully assigned");
			localStorage.setItem('assigned', JSON.stringify("Assigned"));
			window.location = "../pages/assetAssigned";
		}

		clearLocal();
		$('#cancel-btn').hide();
	}
	
	function createTable()
	{
		var assetStorage = localStorage.length - 1;
		
		//Get data from the local storage
		asset = JSON.parse(localStorage.getItem('asset0'));
		emp = JSON.parse(localStorage.getItem('emp'));

		//If there is data in the local storage then for each selected asset assign to the selected employee if the asset isn't already assigned
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
					//Keep track of how many assets are added to the local storage so they can all be removed if the cancel button is clicked
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
						url:"/assetManagement/assetAssigned/create",
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
	
	//Clear local storage
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
			url:"/assetManagement/assetAssigned/findAllAsset/" + id,
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
			url:"/assetManagement/assetAssigned/delete/" + assign.id,
			dataType: "json",
			type: "DELETE",
			success: $.notify("Success! Asset " + assign.assets.assetCode + " and employee " + assign.employees.employeeID + " is now unassigned.", "success")//displayAlertT("Asset " + assign.assets.assetCode + " and employee " + assign.employees.employeeID + " is now unassigned.", "success", "Success!") //alert("Asset " + assign.assets.assetCode + " and employee " + assign.employees.employeeID + " is now unassigned")
		});

	}
	
	//Display selection alert if an employee is selected
	function showSelectAlert()
	{
		var emp = JSON.parse(localStorage.getItem('emp'));
		if(emp)
		{
			$(document).ready(function()
			{
			    $.notify("Please select an asset to assign to the selected employee", "info");
			});
		}
	}
	
	function showActiveNav()
	{
		$('#aNav').addClass('active');
		/*var url = window.location.pathname;
		
		if(url == "/assetManagement/pages/asset")
		{
			$('#aNav').addClass('active');
		}*/
	}
	
	function includeHTML() 
	{
		  var z, i, elmnt, file, xhttp;
		  /*loop through a collection of all HTML elements:*/
		  z = document.getElementsByTagName("*");
		  for (i = 0; i < z.length; i++) 
		  {
		    elmnt = z[i];
		    /*search for elements with a certain atrribute:*/
		    file = elmnt.getAttribute("w3-include-html");
		    if (file) 
		    {
		      /*make an HTTP request using the attribute value as the file name:*/
		      xhttp = new XMLHttpRequest();
		      xhttp.onreadystatechange = function() 
		      {
		        if (this.readyState == 4) 
		        {
		          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
		          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
		          /*remove the attribute, and call this function once more:*/
		          elmnt.removeAttribute("w3-include-html");
		          includeHTML();
		        }
		      }
		      xhttp.open("GET", file, true);
		      xhttp.send();
		      /*exit the function:*/
		      return;
		    }
		  }
		  showActiveNav();
	}
	
/*	function displayAlert(msg, type)
	{
		var alert = "<div class='alert " + type + " alert-dismissible fade in'> <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> "
						+ msg + "</div>";
		return alert;
	}*/
	
	/*function displayAlertT(msg, type, title)
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
	}*/
	
	

//});