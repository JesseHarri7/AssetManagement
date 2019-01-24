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
	
	//Show selected alert if employee is selected
	showSelectAlert();
	
	//Show button to assign if reassign is selected
	showAssignBtn();
	
////////////////////////////////////////Test////////////////////////////////////////	
				
/////////////////////////////////////////Test////////////////////////////////////////
	
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
			$.notify("Heads up! Please only select one asset to remove.", "error");
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
	
	//Create button
	$('#create-btn').click(function(event) 
	{
		//Clear form red border css
		clearFormBorder();
		
		//Clear form content if any
		document.getElementById("create").reset();
		
		$('.notifyjs-corner').remove();
	});
	
	//Modal form create button
	$('#form-create-btn').click(function(event) 
	{
		//Clear form red border css
		clearFormBorder();
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
		//Clear form red border css
		clearFormBorder();
		//Clear modal form data
		document.getElementById("create").reset();
	});
	
	//Clear local storage to cancel assign 
	$('#cancel-btn').click(function(event) 
	{
		$('.notifyjs-corner').remove();
		resetLocal();
		
		$('#setAssetATwo-btn').addClass('hidden');
		$('#setAssetA-btn').removeClass('hidden');
		
	    $('#comp-btn').removeClass('hidden');
	});
	
	//Form update button
	$('#edit-btn').click(function(event) 
	{
		//Clear form red border css
		clearFormBorder();
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
		//Clear form red border css
		clearFormBorder();
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
				if(!subComp())
				{
					//Save selected rows to local storage and
					//Create asset assigned table if there is employee data
					selectAsset();
					///If there is emp data then set asset and emp values to assetAssigned table and then clear the local storage
					assign();
				}
				else
				{
					$.notify("Heads up! You cannot assign a Sub component to an Employee.", "warn")
				}
			}
			else
			{
				//Send to employee table if there is no employee data
				clearLocal();
				if(!subComp())
				{
					selectAsset();
					window.location = "../pages/employee";
//					alert("Please select an employee to assign to the selected asset");
				}
				else
				{
					$.notify("Heads up! You cannot assign a Sub component to an Employee.", "warn")
				}
			}
		}
		else
		{
			$.notify("Heads up! Please select an asset to assign to an employee.", "warn");
			
//			displayAlertT("Please select an asset to assign to an employee.", "warning", "Heads up!");

			//alert("Please select an asset to assign to an employee");
		}
		
    });
	
	//select Asset for reassign
	$('#reassign-btn').click( function () 
	{
		var assign = JSON.parse(localStorage.getItem('component'));
		
		var table = $('#asset-table').DataTable();
		var assetData = table.rows( '.selected' ).data();
		
		if(assetData.length == 0)
		{
			$.notify("Heads up! Please select an asset to reassign.", "warn");
		}
		else if(assetData.length >= 2)
		{
			$.notify("Heads up! Please only select one employee.", "warn");
		}
		else
		{
			if(subComp())
			{
				//Save new reassignment
				selectAsset();
				if(reassignAsset())
				{
					comp = JSON.parse(localStorage.getItem('component'));
					var id = comp.id;
					
					reassignRemove(id);
					localStorage.setItem('reassignedComp', JSON.stringify("ReassignedComp"));
					window.location = "/assetManagement/pages/component";
				}
			}
			else
			{
				$.notify("Heads up! You cannot reassign a Main component.", "warn")
			}
			
		}
				
    });
	
	function reassignAsset()
	{
		var success = false;
		
		var comp = JSON.parse(localStorage.getItem('component'));
		var assetComp = JSON.parse(localStorage.getItem('asset0'));
		
		var assetOne = comp.assetOne;
		var id = comp.id;
		var prevAsset = comp.assetOne.assetCode + "_" + comp.assetOne.name;
		
		if(assetOne && assetComp)
		{
			success = assignAssets(assetOne, assetComp);
		}
		return success;
			/*//Assigned date
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; 
			var yyyy = today.getFullYear();
			
			today = yyyy + '-' + mm + '-' + dd;
			
			//Set as object
			var asset = {assetOne, assetComponent: assetComp, prevAsset};
			asset.assignDate = today;
			
			//Translate so that JSON can read it
			var data_json = JSON.stringify(asset);
			
			//Before creating, first check to see if the asset already exists
			var exists = findAssetCodes(assetOne.assetCode, assetComponent.assetId);
			
			//Before creating, first check to see if the sub component is already assigned
			var subComp = findSubComp(assetComponent.assetId);
			
			if(exists.length == 0 && subComp.length == 0)
			{
				$.ajax(
				{
					headers: {
				        'Accept': 'application/json',
				        'Content-Type': 'application/json' 
				    },
					url:"/assetManagement/assetAsset/create",
					dataType: "json",
					data: data_json,
					type: "POST",
					success: success()
				});
			
			function success()
			{
				reassignRemove(id);
				localStorage.setItem('reassigned', JSON.stringify("Reassigned"));
//				alert("Data successfully assigned");
				window.location = "/assetManagement/pages/component";
			}	
				
		}
		else if(subComp != 0)
		{
			$.notify("Error! The sub component is already assigned.", "warn");
		}*/
	}
	
	function reassignRemove(id)
	{
		$.ajax({
			url:"/assetManagement/assetAsset/delete/" + id, 
			dataType: "json",
			type: "DELETE",
			success: function(data)
			{
				
			}
		});
	}
	
	function subComp()
	{
		$('.notifyjs-corner').remove();
		
		var table = $('#asset-table').DataTable();
		
		//Returns data of the selected row
		var asset = table.rows( '.selected' ).data();
	
		var subComp = asset[0].subComp;
		
		if(subComp)
		{
//			$.notify("Heads up! You cannot assign a Sub component to an Employee.", "warn")
			return true;
		}
		else
		{
			return false;
		}
	}
	
	//Component button
	$('#comp-btn').click(function(event) 
	{
		var status = $('#comp-btn').val();
		
		compBtn(status);
	});
	
	//Change component button text and change data table
	function compBtn(status)
	{
		if(status == "Show components")
		{
			var dataSet = [];
			
			$.ajax({
				url:"/assetManagement/asset/component",
				dataType: "json",
				type: "GET",
				success: function(data)
				{
					dataSet = data;
					
					var table = $('#asset-table').DataTable();
					table.clear();
					table.rows.add(dataSet);
					table.rows(dataSet).draw();
					table.draw();
					
				}
			});
			
			$('#comp-btn').prop('value', 'Show All');
		}
		else
		{
			var dataSet = [];
			
			$.ajax({
				url:"/assetManagement/asset/findAll",
				dataType: "json",
				type: "GET",
				success: function(data)
				{
					dataSet = data;
					
					var table = $('#asset-table').DataTable();
					table.clear();
					table.rows.add(dataSet);
					table.rows(dataSet).draw();
					table.draw();
					
				}
			});
			
			$('#comp-btn').prop('value', 'Show components');
		}
		
	}
	
	//Create dataTable with JSON data
	function assetList(dataSet)
	{
		var assetTable = $("#asset-table").DataTable({
			dom: '<f<t>lip>',
			buttons: [
	           'excel'
	        ],
			responsive: true,
			retrieve: true,
//			select: true,
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
			//Check to see if the asset is already assigned
			var assetSet = alreadySet(rowToDelete[i].assetCode);
			
			//Check to see if the asset is already assigned to a asset
			var getAssigned = assignedAssetCode(rowToDelete[i].assetCode);
			
			//Before creating, first check to see if the sub component is already assigned
			var compSet = findSubComp(rowToDelete[i].assetId);
			
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
			}
			else if(getAssigned != 0 || compSet != 0)
			{
				createNotify(rowToDelete[i].assetCode, i, rowToDelete[i].assetId);
				
				$.notify({
					  title: "Asset " + rowToDelete[i].assetCode + " is already assigned. This will unassign the asset, are you sure you want to delete?",
					  button: 'Confirm'
					}, {
					  style: 'foo',
					  autoHide: false,
					  clickToHide: false
					});
			}
			else
			{
				removeMsg(rowToDelete[i].assetCode);
//				remove(rowToDelete[i].assetCode);
			}
		}
	}
	
	function assignedAssetCode(id)
	{
		var dataSet = [];

		$.ajax({
			url:"/assetManagement/assetAsset/findAssetOne/" + id,
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSet = data
			},
			error: dataSet = null
		});
		
		return dataSet;
	}
	
	function createNotify(code, i, id)
	{
		//add a new style 'foo'

		$.notify.addStyle('foo', {
		  html: 
		    "<div>" +
		      "<div class='clearfix'>" +
		        "<div class='title' data-notify-html='title'/>" +
		        "<div class='buttons'>" +
		          "<button onclick='chkNo("+code+","+i+")' class='btn btn-secondary no"+i+"'>Cancel</button> " +
		          "<button onclick='chkYes("+code+","+i+","+id+")' class='btn btn-secondary yes"+i+"'>Confirm</button>" +
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
	function chkYes(code, i, id) 
	{
		//Get assigned asset data
		var assetSet = alreadySet(code);
		
		var getAssigned = assignedAssetCode(code);
		
		var compSet = findSubComp(id);
		
		//If the asset is assigned to an employee and a main component then unassign both
		if(assetSet && getAssigned)
		{
			assignedRemove(assetSet);
			compRemove(getAssigned);
		}
		else if(getAssigned)
		{
			compRemove(getAssigned);
		}
		else if(assetSet)
		{
			assignedRemove(assetSet);
		}
		else
		{
			subCompRemove(compSet);
		}
		
		
		removeMsg(code);
//		remove(code);
		//hide notification
		$('.yes'+i).trigger('notify-hide');
	}
		
	//First get input from user for the reason and then delete
	function remove(assetCode)
	{
		var table = $('#asset-table').DataTable();

//		removeMsg(assetCode);
		
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
			}
		
	}
	
	function compRemove(components)
	{
		var total = components.length;
		
		for(i = 0; i < total; i++)
		{
			$.ajax({
				url:"/assetManagement/assetAsset/delete/" + components[i].id,
				dataType: "json",
				type: "DELETE",
				success: function(data)
				{
					$.notify("Success! Asset " + components[i].assetOne.assetCode + " and asset " + components[i].assetComponent.assetCode + " is now unassigned.", "success")
				}
			});
		}
	}
	
	function subCompRemove(component)
	{
		$.ajax({
			url:"/assetManagement/assetAsset/delete/" + component.id,
			dataType: "json",
			type: "DELETE",
			success: function(data)
			{
				$.notify("Success! Asset " + component.assetComponent.assetCode + " and asset " + component.assetOne.assetCode + " is now unassigned.", "success")
			}
		});
	}
			
	function removeMsg(assetCode)
	{	
		document.getElementById("removeCode").innerHTML = assetCode;
//		Get the reason for the asset being removed
		$('#removeModalId').modal({backdrop: "static"}, {keyboard: false});
	}
	
	$('#form-remove-btn').click(function(event) 
	{
		var assetCode = document.getElementById("removeCode").innerHTML;
		var status = document.forms["remove"]["rStatus"].value;
		
		if(validateDeleteForm())
		{
			//Find By id
			var assetObj = findId(assetCode);
			assetObj.status = status;
			
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1;
			var yyyy = today.getFullYear();
			
			today = yyyy + '-' + mm + '-' + dd;
			assetObj.unassignDate = today;

			var code = assetObj.assetCode;
			var assetId = assetObj.assetId;
			var brand = assetObj.brand;
			var date = assetObj.datePurchased;
			var type = assetObj.description;
			var name = assetObj.name;
			var unassignDate = assetObj.unassignDate;
			var state = "D";
			var stat = assetObj.status;
			var mainComp = assetObj.mainComp;
			var subComp = assetObj.subComp;
				
			var asset = {assetCode: code, assetId, brand, datePurchased: date, description: type, name, state, status: stat, unassignDate, mainComp, subComp};
			
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
				var table = $('#asset-table').DataTable();

//				$.notify("Saved!", "success");
				
				$('#removeModalId').modal('hide');
				
				$.notify("Success! Asset " + assetCode + " was removed.", "success");
				table.row("#"+assetCode).remove().draw( false );
			}
		}
		
	});
	
	function assignedRemove(assign)
	{
		$.ajax({
			url:"/assetManagement/assetAssigned/delete/" + assign.id,
			dataType: "json",
			type: "DELETE",
			success: function(data)
			{
//				updateAsset(assign);
				$.notify("Success! Asset " + assign.assets.assetCode + " and employee " + assign.employees.employeeID + " is now unassigned.", "success")//displayAlertT("Asset " + assign.assets.assetCode + " and employee " + assign.employees.employeeID + " is now unassigned.", "success", "Success!") //alert("Asset " + assign.assets.assetCode + " and employee " + assign.employees.employeeID + " is now unassigned")
			}
		});

	}
	
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
		var description = $('#type').val();
		var brand = $('#brand').val();
		var datePurchased = [year, month, day].join('/');
		
		var mainComp = document.getElementById("mainComp");
		var subComp = document.getElementById("subComp");
//		var status = $('#status').val();
		
		//Set as object
		var asset = {assetCode, name, description, brand, datePurchased, mainComp: mainComp.checked, subComp: subComp.checked};
		
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
			$.notify("Error! The Asset " + assetCode + " you're trying to create already exists.", "error");
			
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
		var type = document.forms["create"]["type"].value;
		var brand = document.forms["create"]["brand"].value;
		var date = document.forms["create"]["date"].value;
//		var status = document.forms["create"]["status"].value;
		 
		if(id == "" || name == "" || type == "" || brand == "" || date == "") 
		{
			displayFormBorder(id, name, type, brand, date);
			$.notify("Heads up! All fields must be filled out.", "error");
		    	
//			displayAlertT("All fields must be filled out.", "warning", "Heads up!");
							
//			alert("All fields must be filled out");
		    return false;
		}
		else
		{
			//Only allow numbers for the ID
			if(validateId(id))
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}
	
	function validateId(id)
	{
		var numbers = /^[0-9]+$/;
		
		if(id.match(numbers))
		{
			return true;
		}
		else
		{
			$.notify("Heads up! Please input numeric characters only.", "error");
			$('#id').addClass("form-fill-error");
			return false;
		}
	}
	
	function validateUpdate()
	{
		var id = document.forms["update"]["uId"].value;
		var name = document.forms["update"]["uName"].value;
		var type = document.forms["update"]["uType"].value;
		var brand = document.forms["update"]["uBrand"].value;
		var date = document.forms["update"]["uDate"].valueAsDate;
//		var status = document.forms["update"]["uStatus"].value;
		 
	    if(id == "" || name == "" || type == "" || brand == "" || date == "") 
	    {
	    	displayFormBorder(id, name, type, brand, date);
	    	$.notify("Heads up! All fields must be filled out.", "error");
	    	
//	    	displayAlertT("All fields must be filled out.", "warning", "Heads up!");
	    	
	        //alert("All fields must be filled out");
	        return false;
	    }
	    else
	    {
	    	return true;
	    }
	}
	
	function validateDeleteForm()
	{
		var status = document.forms["remove"]["rStatus"].value;
		 
		if(status == "") 
		{
			displayFormBorder("id", "name", "type", "brand", "date", status);
			$.notify("Error! Reason is required.", "error");
		    	
//			displayAlertT("All fields must be filled out.", "warning", "Heads up!");
							
//			alert("All fields must be filled out");
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
		var description = document.forms["update"]["uType"].value;
		var brand = document.forms["update"]["uBrand"].value;
		
		var mainComp = document.forms["update"]["uMainComp"].checked;
		var subComp = document.forms["update"]["uSubComp"].checked;
//		var status = document.forms["update"]["uStatus"].value;
		
		var assetObj = findId(assetCode);
		var assetId = assetObj.assetId;
		/*var mainComp = assetObj.mainComp;
		var subComp = assetObj.subComp;*/
		
		var asset = {assetId, assetCode, name, description, brand, datePurchased, mainComp, subComp};
		
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
		document.forms["update"]["uType"].value = asset.description;
		document.forms["update"]["uBrand"].value = asset.brand;
		document.forms["update"]["uDate"].valueAsDate = datePurchased;
		
		document.forms["update"]["uMainComp"].checked = asset.mainComp;
		document.forms["update"]["uSubComp"].checked = asset.subComp;
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
		var asset = JSON.parse(localStorage.getItem('asset0'));
		var emp = JSON.parse(localStorage.getItem('emp'));

		//If there is data in the local storage then for each selected asset assign to the selected employee if the asset isn't already assigned
		if(asset && emp)
		{
			for(i = 0; i < assetStorage; i++)
			{
				asset = JSON.parse(localStorage.getItem('asset' + [i]));
				var assetSet = alreadySet(asset.assetCode);
				var subComp = isSubComponent(asset);
				
				if(assetSet)
				{
					$.notify("Error! Asset " + asset.assetCode + " is already assigned to employee " + assetSet.employees.employeeID, "error");
					
//					displayAlertT("Asset " + asset.assetCode + " is already assigned to employee " + assetSet.employees.employeeID, "danger", "Error!");
					
					//alert("Asset " + asset.assetCode + " is already assigned to employee " + assetSet.employees.employeeID);
				}
				else if(subComp)
				{
					$.notify("Error! You cannot assign a sub component to an employee", "error");
				}
				else
				{
					//Keep track of how many assets are added to the local storage so they can all be removed if the cancel button is clicked
					count++;
					asset = JSON.parse(localStorage.getItem('asset' + [i]));
					
					//Find if the asset had a previous owner
					var getAssigned = assignedAssetCodeAll(asset.assetCode);
					if(getAssigned != 0)
					{
						var lastAssigned = getAssigned.length - 1;
						var prevOwner = getAssigned[lastAssigned].employees.employeeID + "_" + getAssigned[lastAssigned].employees.name + "_" + getAssigned[lastAssigned].employees.surname;
					}
					
					var assetAssigned = {assets: asset, employees: emp, empName: emp.name, prevOwner};
					
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
			$.notify("Heads up! Neither an asset or employee was selected", "error");
			
//			displayAlertT("Neither an asset or employee was selected.", "warning", "Heads up!");
			
			//alert("Neither an asset or employee was selected");
		}
	
	}
	
	function assignedAssetCodeAll(id)
	{
		var dataSet = [];

		$.ajax({
			url:"/assetManagement/assetAssigned/findAllAssetHistory/" + id,
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSet = data
			},
			error: dataSet = null
		});
		
		return dataSet;
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
	
	//Assign asset sub component to main component
	$('#setAssetA-btn').click(function(event) 
	{
		var table = $('#asset-table').DataTable();

		//Returns data of the selected row
		var asset = table.rows( '.selected' ).data();
		
		$('.notifyjs-corner').remove();
		
		if (asset.length == 0)
		{
			$.notify("Heads up! Please select an asset to assign.", "warn");
		}
		else if (asset.length >= 2)
		{
			$.notify("Heads up! Please only select one asset to assign.", "error");
		}
		else
		{
			if(isComponent(asset[0]))
			{
				$.notify("Success! Asset selected", "info");
				
				localStorage.setItem('assetOne', JSON.stringify(asset[0]));
				
				table.rows('.selected').deselect();
				
				$('#setAssetA-btn').addClass('hidden');
				$('#setAssetATwo-btn').removeClass('hidden');
				
				showBtn();
			}
				
		}
						
	});
	
	$('#setAssetATwo-btn').click(function(event) 
	{
		var table = $('#asset-table').DataTable();
		
		//Returns data of the selected row
		var assetTwo = table.rows( '.selected' ).data();
		
		$('.notifyjs-corner').remove();
		
		if (assetTwo.length == 0)
		{
			$.notify("Heads up! Please select an asset to assign.", "warn");
		}
		else if (assetTwo.length >= 2)
		{
			$.notify("Heads up! Please only select one asset to assign.", "error");
		}
		else
		{
			if(isComponent(assetTwo[0]))
			{
				$.notify("Success! Asset selected", "info");
				
				localStorage.setItem('assetTwo', JSON.stringify(assetTwo[0]));
				
				$('#setAssetATwo-btn').addClass('hidden');
				$('#setAssetA-btn').removeClass('hidden');
				
				var assetOne = JSON.parse(localStorage.getItem('assetOne'));
				var assetTwo = JSON.parse(localStorage.getItem('assetTwo'));
				
				localStorage.clear();
				$('#cancel-btn').hide();
				
				if(checkComponents(assetOne, assetTwo))
				{
					var assetOrder = rearrangeAssets(assetOne, assetTwo);
					assignAssets(assetOrder[0], assetOrder[1]);
				}
				
			}
		}
						
	});
	
	function isComponent(asset)
	{
		
//		var dataSet = [];

		/*$.ajax({
			url:"/assetManagement/asset/" + asset.assetCode,
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSet = data;
			},
			error: dataSet = null
		});*/
		
		var mainComp = asset.mainComp;
		var subComp = asset.subComp;
		
		if(mainComp || subComp)
		{
			
			return true;
		}
		else
		{
			$.notify("Heads up! Please select a Main component or a Sub component.", "warn")
			return false;
		}
		
	}
	
	function isSubComponent(asset)
	{
		var subComp = asset.subComp;
		
		if(subComp)
		{
			
			return true;
		}
		else
		{
			return false;
		}
	}
	
	function checkComponents(assetOne, assetTwo)
	{
		var assetOneMain = assetOne.mainComp;
		var assetOneSub = assetOne.subComp;
		
		var assetTwoMain = assetTwo.mainComp;
		var assetTwoSub = assetTwo.subComp;
		
		if(assetOneMain && assetTwoSub || assetTwoMain && assetOneSub)
		{
			
			return true;
		}
		else
		{
			$.notify("Heads up! Please select one main component and one sub component.", "error");
		}
	}
	
	function assignAssets(assetOne, assetComponent)
	{
//		var assetCode = assetOne;
		
//		var assetAssigned = assetTwo;
		var reassign = false;
		
		var prevAsset = null;
		
		//Assigned date
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();
		
		today = yyyy + '-' + mm + '-' + dd;
		
		//Find if the asset was assigned to a previous asset
		var getAssigned = compAssetCodeAll(assetOne.assetCode);
		if(getAssigned != 0)
		{
			var lastAssigned = getAssigned.length - 1;
			prevAsset = getAssigned[lastAssigned].assetOne.assetCode + "_" + getAssigned[lastAssigned].assetOne.name;
		}
		
		//Set as object
		var asset = {assetOne, assetComponent, prevAsset};
		asset.assignDate = today;
		
		//Translate so that JSON can read it
		var data_json = JSON.stringify(asset);
		
		//Before creating, first check to see if the asset already exists
		var exists = findAssetCodes(assetOne.assetCode, assetComponent.assetId);
		
		//Before creating, first check to see if the sub component is already assigned
		var subComp = findSubComp(assetComponent.assetId);
		
		if(exists.length == 0 && subComp.length == 0)
		{
			$.ajax(
			{
				headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json' 
			    },
				url:"/assetManagement/assetAsset/create",
				dataType: "json",
				data: data_json,
				type: "POST",
				success: success()
			});
			
			function success()
			{
				$.notify("Success! Assets have been successfully assigned.", "success");
				reassign = true;
			}
			
		}
		else if(subComp != 0)
		{
			$.notify("Error! The sub component is already assigned.", "warn");
		}
		/*else
		{
			$.notify("Error! The Assets you're trying to assign are already assigned.", "warn");
		}*/
		
		return reassign;
	}
	
	function compAssetCodeAll(id)
	{
		var dataSet = [];

		$.ajax({
			url:"/assetManagement/assetAsset/assetCodesHist/" + id,
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSet = data
			},
			error: dataSet = null
		});
		
		return dataSet;
	}
	
	function findAssetCodes(assetOne, assetComponent)
	{
		var dataSet = [];

		$.ajax({
			url:"/assetManagement/assetAsset/assetCodes/" + assetOne + "/" + assetComponent,
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSet = data;
				$.notify("Error! The Assets you're trying to assign are already assigned.", "warn");
			},
			error: function(data)
			{
				dataSet = [];
			}
		});
		return dataSet;
	}
	
	function findSubComp(assetComp)
	{
		var dataSet = [];

		$.ajax({
			url:"/assetManagement/assetAsset/findAssetComponent/" + assetComp,
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
	
	function rearrangeAssets(assetOne, assetTwo)
	{
		var first;
		var second;
		
		if(assetOne.mainComp)
		{
			first = assetOne;
			second = assetTwo;
		}
		else
		{
			first = assetTwo;
			second = assetOne;
		}
		
		return [first, second];	
		
	}
	
	function updateAsset(data)
	{		
		var emp = findEmp(data.employees.employeeID);
		
		var assetCode = data.assets.assetCode;
		
//		var assetId = assetObj.assetId;
		
		var empId = emp.employeeID;
		
		var empName = emp.name;
		
		var empSurname = emp.surname;
		
		var prevOwner = empId + "_" + empName + "_" + empSurname;
		
		var assetObj = findId(assetCode);
		
		var assetId = assetObj.assetId;
		var name = assetObj.name;
		var description = assetObj.description;
		var brand = assetObj.brand;
		var datePurchased = assetObj.datePurchased;
		var mainComp = assetObj.mainComp;
		var subComp = assetObj.subComp;
		
		var asset = {assetId, assetCode, name, description, brand, datePurchased, mainComp, subComp, prevOwner};
		
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
//			$.notify("Success! Asset " + assetCode + " has been updated.", "success");
		}
	}
	
	function findEmp(id)
	{
		var dataSetEmp = [];

		$.ajax({
			url:"/assetManagement/employee/" + id,
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
	
	//Display selection alert if an employee is selected
	function showSelectAlert()
	{
		var emp = JSON.parse(localStorage.getItem('emp'));
		if(emp)
		{
			$(document).ready(function()
			{
			    $.notify("Please select an asset to assign to the selected employee", "info");
			    $('#setAssetATwo-btn').addClass('hidden');
			    $('#setAssetA-btn').addClass('hidden');
			    $('#comp-btn').addClass('hidden');
			});
		}
	}
	
	//Display reassign button if reassign is selected
	function showAssignBtn()
	{
		var assign = JSON.parse(localStorage.getItem('component'));
		
		if(assign)
		{
			$('#reassign-btn').addClass('visible-r');
			$.notify("Please select an asset to reassign", "info");
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
	
	function clearFormBorder()
	{
		//create form
		$('#id').removeClass("form-fill-error");
		$('#name').removeClass("form-fill-error");
		$('#type').removeClass("form-fill-error");
		$('#brand').removeClass("form-fill-error");
		$('#datePurchased').removeClass("form-fill-error");
		
		//Update form
		$('#uId').removeClass("form-fill-error");
		$('#uName').removeClass("form-fill-error");
		$('#uType').removeClass("form-fill-error");
		$('#uBrand').removeClass("form-fill-error");
		$('#uDatePurchased').removeClass("form-fill-error");
	}
	
	function displayFormBorder(id, name, type, brand, date, status)
	{
		if(!id)
		{
			$('#id').addClass("form-fill-error");
			$('#uId').addClass("form-fill-error");
		}	
		
		if(!name)
		{
			$('#name').addClass("form-fill-error");
			$('#uName').addClass("form-fill-error");
		}
		
		if(!type)
		{
			$('#type').addClass("form-fill-error");
			$('#uType').addClass("form-fill-error");
		}
		
		if(!brand)
		{
			$('#brand').addClass("form-fill-error");
			$('#uBrand').addClass("form-fill-error");
		}
		
		if(!date)
		{
			$('#datePurchased').addClass("form-fill-error");
			$('#uDatePurchased').addClass("form-fill-error");
		}
		
		if(!status)
		{
			$('#rStatus').addClass("form-fill-error");
		}
		
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