/*$(document).ready(function()
{*/

	//Add all temp files
	includeHTML();
	
	//Show cancel button if there is data in local storage
	showBtn();

	//All data fields on start up
	findAll();
	
	//Show alert when assigning is successful
	showSelectAlert();
	
	//Show alert when reassigning is successful
	showReassignAlert();
	
	//Select row
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
	
	//Get Asset info
	$('#asset-btn').click(function(event)
	{
		$('.notifyjs-corner').remove();
		
		var table = $('#AA-table').DataTable();
		var findAssetId = table.row('.selected').data();
		if(findAssetId)
		{
			var assetInfo = findAsset(findAssetId.assets.assetCode);
			
			$('#assetModal').modal('show');
			displayAsset(assetInfo);
		}
		else
		{
			$.notify("Heads up! Please select an asset Code.", "error");
			
			//displayAlert("Please select an asset Code.", "warning", "Heads up!");
			
			//alert("Please select an asset Code")
		}
	});	
	
	//Get Emp info
	$('#emp-btn').click(function(event)
	{
		$('.notifyjs-corner').remove();
		
		var table = $('#AA-table').DataTable();
		var findEmpId = table.row('.selected').data();
		if(findEmpId)
		{
			var empInfo = findEmp(findEmpId.employees.employeeID);
			
			$('#empModal').modal('show');
			displayEmp(empInfo);			
		}
		else
		{
			$.notify("Heads up! Please select an Employee ID.", "error");
			
			//displayAlert("Please select an Employee ID.", "warning", "Heads up!");
			
			//alert("Please select an Employee ID")
		}
	});
	
	//Delete
	$('#delete-btn').click(function(event)
	{
		$('.notifyjs-corner').remove();
		
		var table = $('#AA-table').DataTable();

		var rowToDelete = table.row( '.selected' ).data();
		
		if (rowToDelete)
		{
			createNotify();
			
			$.notify({
				  title: 'Are you sure you want to unassign?',
				  button: 'Confirm'
				}, {
				  style: 'foo',
				  className: 'info',
				  autoHide: false,
				  clickToHide: false
				});
			
			//displayAlert("Are you sure you want to unassign? <p><a href='#' class='alert-link' onclick='delYes();'>Yes</a> <a href='#' class='alert-link' onclick='delNo();' >No</a></p>", "info", "Heads up!");

		}
		else
		{
			$.notify("Heads up! Please select an item to unassign.", "error");
			
			//displayAlert("Please select a item to unassign.", "warning", "Heads up!");
			
			//alert("Please select a item to remove");
		}
		
	});
	
	//Notify class
	function createNotify()
	{
		//add a new style 'foo'
		$.notify.addStyle('foo', {
		  html: 
		    "<div>" +
		      "<div class='clearfix'>" +
		        "<div class='title' data-notify-html='title'/>" +
		        "<div class='buttons'>" +
		          "<button class='btn btn-secondary no'>Cancel</button>" +
		          "<button class='btn btn-secondary yes' data-notify-text='button'></button>" +
		        "</div>" +
		      "</div>" +
		    "</div>"
		});
	}
	
	//listen for click events from this style
	//If no
	$(document).on('click', '.notifyjs-foo-base .no', function() 
	{
		//programmatically trigger propogating hide event
		$(this).trigger('notify-hide');
		
	});

	//if Yes
	$(document).on('click', '.notifyjs-foo-base .yes', function() 
	{	
		//Function
		remove();
		//hide notification
		$(this).trigger('notify-hide');
		
	});
	
	//Reassign button
	$('#reassign-btn').click(function(event)
	{
		$('.notifyjs-corner').remove();
		
		var table = $('#AA-table').DataTable();

		var data = table.row( '.selected' ).data();
		
		if(data)
		{
			selectAA();
			window.location = "../pages/employee";
			alert("Please select an employee to reassign to this asset");
			
		}
		else
		{
			$.notify("Heads up! Please select a item to reassign.", "error");
			
			//displayAlert("Please select a item to reassign.", "warning", "Heads up!");
			
			//alert("Please select a item to remove");
		}	
	});
	
	$('#cancel-btn').click(function(event)
	{
		$('.notifyjs-corner').remove();
		
		resetLocal();
	})
	
	$('#assetT-btn').click( function()
	{
		$('.notifyjs-corner').remove();
		
		var table = $('#AA-table').DataTable();
		var findAssetId = table.cell('.selected').data();
		var assetInfo = findAsset(findAssetId);
	})
	
	function findAll()
	{
		
		$.ajax({
			url:"/assetManagement/assetAssigned/findAll", 
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
			dom: '<f<t>lip>',
			retrieve: true,
			responsive: true,
			select: true,
			data: dataSet,
			columns: 
			[
				//{data: 'id'},
				{data: 'assets.assetCode'},
				{data: 'assets.name'},
				{data: 'employees.employeeID'},
				{data: 'employees.name'},
				{data: 'moveDate'}
			]
		});
		
		return aaTable;
	}
	
	function remove()
	{
		var table = $('#AA-table').DataTable();

		var rowToDelete = table.row( '.selected' ).data();
		
		if (rowToDelete)
		{
			$.ajax({
				url:"/assetManagement/assetAssigned/delete/" + rowToDelete.id,
				dataType: "json",
				type: "DELETE",
				success: success()
			});
			
			table.row('.selected').remove().draw( false );
			function success()
			{
				$.notify("Success! Asset " + rowToDelete.assets.assetCode + " and employee " + rowToDelete.employees.employeeID + " are now unassigned.", "success");
				
				//displayAlert("Asset " + rowToDelete.assets.assetCode + " and employee " + rowToDelete.employees.employeeID + " is now unassigned.", "success", "Success!");
				
				//alert("Asset " + rowToDelete.assets.assetCode + " and employee " + rowToDelete.employees.employeeID + " is now unassigned")
			}
		}
		else
		{
			$.notify("Heads up! Please select a item to unassign.", "error");
			
			//displayAlert("Please select a item to unassign.", "warning", "Heads up!");
			
			//alert("Please select a item to remove");
		}	
		
		
	}
	
	function findAsset(id)
	{
		var dataSetA = [];

		$.ajax({
			url:"/assetManagement/asset/" + id,
			async: false,
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSetA = data
			},
			error: dataSetA = null
		});
		return dataSetA;
	
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
	
	function displayAsset(asset)
	{	
		document.getElementById("mAssetId").innerHTML = asset.assetCode;
		document.getElementById("mName").innerHTML = asset.name;
		document.getElementById("mDesc").innerHTML = asset.description;
		document.getElementById("mBrand").innerHTML = asset.brand;
		document.getElementById("mDate").innerHTML = asset.datePurchased;
		document.getElementById("mStatus").innerHTML = asset.status;
		
	}
	
	function displayEmp(emp)
	{
		
		document.getElementById("mEmpId").innerHTML = emp.employeeID;
		document.getElementById("mEmpName").innerHTML = emp.name;
		document.getElementById("mSur").innerHTML = emp.surname;
		document.getElementById("mEmail").innerHTML = emp.email;
		document.getElementById("mStartDate").innerHTML = emp.startDate;
		
	}
	
	function selectAA()
	{
		var table = $('#AA-table').DataTable();
		var data = table.row( '.selected' ).data();
		
		if(data)
		{
			localStorage.setItem('assign', JSON.stringify(data));
		}
		else
		{
			$.notify("Heads up! Please select a item to reassign.", "error");
			
			//displayAlert("Please select a item to reassign.", "warning", "Heads up!");

			//alert("Please select a row");
		}
	}
	
	function resetLocal()
	{
		localStorage.clear();
		$('#cancel-btn').hide();
		$.notify("Success! Action cancelled.", "success");
		
		//displayAlert("Action cancelled", "success", "Success!");
	}
	
	function showBtn()
	{
		if(localStorage.length > 0)
		{
			$('#cancel-btn').addClass('visible');
		}
	}
	
	function showSelectAlert()
	{
		var assign = JSON.parse(localStorage.getItem('assigned'));
		if(assign)
		{
			$(document).ready(function()
			{
			    $.notify("Data successfully assigned", "info");
			});
			localStorage.clear();
			$('#cancel-btn').hide();
		}
	}
	
	function showReassignAlert()
	{
		var reassign = JSON.parse(localStorage.getItem('reassigned'));
		if(reassign)
		{
			$(document).ready(function()
			{
			    $.notify("Data successfully reassigned", "info");
			});
			localStorage.clear();
			$('#cancel-btn').hide();
		}
	}
	
	function showActiveNav()
	{
		$('#aaNav').addClass('active');
		
		$("a[href='../pages/asset-history']").attr('href', '../pages/assetAssigned-history')
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
	
/*	function displayAlert(msg, type, title)
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

	
	function displayAlert(msg, type)
	{
		var alert = "<div class='alert " + type + " alert-dismissible fade in'> <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> "
						+ msg + "</div>";
		return alert;
	}*/
	
//});