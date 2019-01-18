$(document).ready(function()
{
	var dataSet = [];
	var count = 0;
	
	//All data fields on start up
	findAll();
	
	//Show button if there is data in the local storage
	showBtn();
	
	//Show button to assign if reassign is selected
	showAssignBtn();
	
	//Add temps html files
	includeHTML();
	
	//Select
	$('#emp-table tbody').on('click','tr', function()
	{
		$(this).toggleClass('selected');
		
		/*if ( $(this).hasClass('selected') ) 
		{
            $(this).removeClass('selected');
            $('#setEmp-btn').prop('disabled', true);
		}
		else 
		{
            $('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            $('#setEmp-btn').prop('disabled', false);
        }*/
	} );
	
	//Delete
	$('#delete-btn').click(function(event) 
	{
		var table = $('#emp-table').DataTable();
		remove();
		
		table.row('.selected').remove().draw( false );
		
	});
	
	//Clear local storage to cancel assign 
	$('#cancel-btn').click(function(event) 
	{
		resetLocal();
	});
	
	//Clear local storage
	$('#clear-btn').click( function()
	{
		localStorage.removeItem('asset');
		localStorage.removeItem('emp');
		alert("Cleared");
	})
	
	//select Employee 
	$('#setEmp-btn').click( function () 
	{	
		var table = $('#emp-table').DataTable();
		var empData = table.rows( '.selected' ).data();
		if(empData.length == 0)
		{
			alert("Please select an employee to assign to an asset");
			
		}
		else if(empData.length >= 2)
		{
			alert("Please only select one employee");
		}
		else
		{
			asset = JSON.parse(localStorage.getItem('asset0'));
			if(asset)
			{
				//Create asset assigned table if there is asset data
				selectEmp();
				assign();
			}
			else
			{
				//Send to asset table if there is no asset data
				clearLocal();
				selectEmp();
				window.location = "/assetManagement/pages/asset";
				//alert("Please select an asset to assign to the selected employee");
			}
		}
			
    } );
	

	//select Employee for reassign
	$('#reassign-btn').click( function () 
	{
		var assign = JSON.parse(localStorage.getItem('assign'));
		
		var table = $('#emp-table').DataTable();
		var empData = table.rows( '.selected' ).data();
		if(empData.length == 0)
		{
			alert("Please select an employee to reassign to an asset");
		}
		else if(empData.length >= 2)
		{
			alert("Please only select one employee");
		}
		else
		{			
			//Save new reassignment
			selectEmp();
			reassignAsset();
//			localStorage.clear();
			
		}
				
    });
	
	
	function empList(dataSet)
	{
		
		var empTable = $("#emp-table").DataTable({
			dom: '<f<t>lip>',
			retrieve: true,
			select: true,
			data: dataSet,
			columns: 
			[
				{data: 'employeeID'},
				{data: 'name'},
				{data: 'surname'},
				{data: 'email'},
				{data: 'startDate'}
			]
		});
		
		return empTable;
	}
	
	function findAll()
	{
		
		$.ajax({
			url:"/assetManagement/employee/findAll", 
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSet = data;
				
				empList(dataSet);
				
			}
		});
	}
	
	function remove()
	{
		var table = $('#emp-table').DataTable();

		var rowToDelete = table.row( '.selected' ).data();
		
		if (rowToDelete)
		{
			$.ajax({
				url:"/assetManagement/employee/delete/" + rowToDelete.employeeID, 
				dataType: "json",
				type: "DELETE",
				success: alert("Asset " + rowToDelete.employeeID + " was removed")
			});
			
			table.row('.selected').remove().draw( false );
		}
		else
		{
			alert("Please select a asset to remove");
		}
		
	}
	
	function selectEmp()
	{
		var table = $('#emp-table').DataTable();
		var empData = table.row( '.selected' ).data();
		
		if(empData)
		{
			localStorage.setItem('emp', JSON.stringify(empData));
			
//			var asset = JSON.parse(localStorage.getItem('asset'));
			
//			localStorage.removeItem('asset');
		}
		else
		{
			alert("Please select a employee");
		}
	}
	
	function assign()
	{
		createTable();
		if(count > 0)
		{
			alert("Data successfully assigned");
			window.location = "/assetManagement/pages/assetAssigned";
		}

		clearLocal();
		$('#cancel-btn').hide();
	}
	
	function reassignAsset()
	{
		assign = JSON.parse(localStorage.getItem('assign'));
		emp = JSON.parse(localStorage.getItem('emp'));
		
		var asset = assign.assets;
		var id = assign.id;
		var prevId = assign.employees.employeeID + "_" + assign.employees.name + "_" + assign.employees.surname;
		
		if(asset && emp)
		{
			var assetAssigned = {assets: asset, employees: emp, empName: emp.name, prevOwner: prevId};
			
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; 
			var yyyy = today.getFullYear();
			
			today = dd + '-' + mm + '-' + yyyy;
			assetAssigned.moveDate = today;
//			assetAssigned.id = id;
//			assetAssigned.moveDate = new Date(dd,mm,yyyy);
		
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
				type: "POST",
				success: success()
			});
			
			function success()
			{
				reassignRemove(id);
				localStorage.setItem('reassigned', JSON.stringify("Reassigned"));
//				alert("Data successfully assigned");
				window.location = "/assetManagement/pages/assetAssigned";
			}	
				
		}
		else
		{
			alert("Neither an asset or employee was selected");
		}
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
				var subComp = isSubComponent(asset);
				
				if(assetSet)
				{
					alert("Asset " + asset.assetCode + " is already assigned to employee " + assetSet.employees.employeeID);
				}
				else if(subComp)
				{
					$.notify("Error! You cannot assign a sub component to an employee", "error");
				}
				else
				{
					count++;
					
					//Find if the asset had a previous owner
					var getAssigned = findByAssetCodesHist(asset.assetCode);
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
			alert("Neither an asset or employee was selected");
		}
	}
	
	function findByAssetCodesHist(id)
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
	
	function clearLocal()
	{
		if(asset)
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
		alert("Assigning successfully cancelled");
		$('#cancel-btn').removeClass('visible');
		$('#reassign-btn').hide();
	}
	
	//Make cancel button visible
	function showBtn()
	{
		if(localStorage.length > 0)
		{
			$('#cancel-btn').addClass('visible');
		}
	}
	
	function showAssignBtn()
	{
		var assign = JSON.parse(localStorage.getItem('assign'));
		
		if(assign)
		{
			$('#reassign-btn').addClass('visible-r');
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
	
	function showActiveNav()
	{
		$('#eNav').addClass('active');
		/*var url = window.location.pathname;
		
		if(url == "/assetManagement/pages/asset")
		{
			$('#aNav').addClass('active');
		}*/
	}
	
	function reassignRemove(id)
	{
		$.ajax({
			url:"/assetManagement/assetAssigned/delete/" + id, 
			dataType: "json",
			type: "DELETE",
			success: function(data)
			{
				
			}
		});
	}

});