$(document).ready(function()
{
	//Add template files
	includeHTML();
	
	var findAllAssets = findAllAssets();
	
	var findAllEmp = findAllEmp();
	
	var findAllAA = findAllAA();
	
	//Reporting stats
	var allAssets = reportAssets();
	
	var allAssigned = reportAssigned();
	
	var allComponents = reportComp();
	
	//Displaying total Assets
	document.getElementById("totalAssets").innerHTML = findAllAssets.length;
	
	//Displaying total employees
	document.getElementById("totalEmp").innerHTML = findAllEmp.length;
	
	//Displaying total Assests assigned
	document.getElementById("totalAA").innerHTML = findAllAA.length;
	
	//Reporting
	
	//Displaying total Assets
	document.getElementById("reportAssets").innerHTML = allAssets.length;
	
	//Displaying total Assests assigned
	document.getElementById("reportAA").innerHTML = allAssigned.length;
	
	//Displaying total components assigned
	document.getElementById("reportComp").innerHTML = allComponents.length;
	
	//Find all assets from the database
	function findAllAssets()
	{
		var dataSet = [];
		
		$.ajax({
			url:"/assetManagement/asset/findAll",
			dataType: "json",
			async: false,
			type: "GET",
			success: function(data)
			{
				dataSet = data;
			},
			error: function(data)
			{
				dataSet = "Error";
			}
		});
		
		return dataSet;
	}
	
	//Find all Employees from the database
	function findAllEmp()
	{
		var dataSet = [];
		
		$.ajax({
			url:"/assetManagement/employee/findAll", 
			dataType: "json",
			async: false,
			type: "GET",
			success: function(data)
			{
				dataSet = data;
			},
			error: function(data)
			{
				dataSet = "Error";
			}
		});
		
		return dataSet;
	}
	
	//Find all assigned assets
	function findAllAA()
	{
		var dataSet = [];
		
		$.ajax({
			url:"/assetManagement/assetAssigned/findAll", 
			dataType: "json",
			async: false,
			type: "GET",
			success: function(data)
			{				
				dataSet = data;
			},
			error: function(data)
			{
				dataSet = "Error";
			}
		});
		
		return dataSet;
	}
	
	// Data
	data = 
	{
		// These labels appear in the legend and in the tooltips when hovering different arcs
	    labels: [
	        'Assets',
	        'Employees',
	        'Assigned'
	    ],
	    
		datasets: [{
			data: [findAllAssets.length, findAllEmp.length, findAllAA.length],
			
			backgroundColor: [
	            /*'#cbb2ae',
	            '#aec9cb',
	            '#b5a8b9'*/
				'#FF6384',
				'#36A2EB',
				'#FFCD56'
				
	        ]
		}]

	};
	
	//Set up
	var ctx = document.getElementById("homeChart").getContext('2d');
	
	var homeChart = new Chart(ctx, {
	    type: 'doughnut',
	 // The data for the dataset
	    data: data,
	 // Configuration options
	    options: {
	    		responsive: true,
	    		maintainAspectRatio: false,
	    		 title: 
	    		 {
	    			 display: true,
	    			 text: 'Active assets',
	    			 fontSize: 20
	    		 }
	    	}
	});
	
	function showActiveNav()
	{
		$('#hNav').addClass('active');
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
	
	////////////////////////////////////////////////////////////////REPORTING////////////////////////////////////////////////////////////////
	
	//Find all assets from the database
	function reportAssets()
	{
		var dataSet = [];
		
		$.ajax({
			url:"/assetManagement/asset/findAllHistory",
			dataType: "json",
			async: false,
			type: "GET",
			success: function(data)
			{
				dataSet = data;
				
				var assetTable = $("#asset-table").DataTable({
					dom: '<f<t>lip>',
					buttons: [
//			           'excel',
			           {
			        	   extend: 'excel',
			        	   title: 'Assets',
			        	   filename: 'Assets'
			           }
			        ],
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
						{data: 'datePurchased'},
						{data: 'unassignDate'},
						{data: 'status'},
						{data: 'state'}
					]
				});
				
			},
			error: function(data)
			{
				dataSet = "Error";
			}
		});
		
		return dataSet;
	}
	
	$(document).on('click', '.reportAssets', function() 
	{
		var assets = $("#asset-table").DataTable();
		
		//var data = test.buttons.exportData();
		
		assets.button( '0' ).trigger();
		
	});
	
	//Find all Assigned assets from the database
	function reportAssigned()
	{
		
		var dataSet = [];
		
		$.ajax({
			url:"/assetManagement/assetAssigned/findAllHistory",
			dataType: "json",
			async: false,
			type: "GET",
			success: function(data)
			{
				dataSet = data;
				
				var aaTable = $("#AA-table").DataTable({
					dom: '<f<t>lip>',
					buttons: [
				           {
				        	   extend: 'excel',
				        	   title: 'Assigned',
				        	   filename: 'Assigned Assets'
				           }
				        ],
					retrieve: true,
					responsive: true,
					select: true,
					data: dataSet,
					columns: 
					[
						//{data: 'id'},
						{data: 'assets.assetCode'},
						{data: 'employees.employeeID'},
						{data: 'employees.name'},
						{data: 'moveDate'},
						{data: 'unassignDate'},
						{data: 'prevOwner'},
						{data: 'state'}
					]
				});
				
			},
			error: function(data)
			{
				dataSet = "Error";
			}
		});
		
		return dataSet;
	}

	$(document).on('click', '.reportAssign', function() 
	{		
		var assigned = $("#AA-table").DataTable();
		
		//var data = test.buttons.exportData();
		
		assigned.button( '0' ).trigger();
		
	});
	
	function reportComp()
	{
		var dataSet = [];
		
		$.ajax({
			url:"/assetManagement/assetAsset/findAllHistory", 
			dataType: "json",
			type: "GET",
			async: false,
			success: function(data)
			{				
				dataSet = data;
				
				var aaTable = $("#assetComp-table").DataTable({
					dom: '<f<t>lip>',
					buttons: [
				           {
				        	   extend: 'excel',
				        	   title: 'Asset Components',
				        	   filename: 'Asset Compnents'
				           }
				        ],
					retrieve: true,
					responsive: true,
					select: true,
					data: dataSet,
					columns: 
					[
						{data: 'assetOne.assetCode'},
						{data: 'assetOne.name'},
						{data: 'assetComponent.assetCode'},
						{data: 'assetComponent.name'},
						{data: 'assignDate'},
						{data: 'prevAsset'},
						{data: 'unassignDate'},
						{data: 'state'}
					]
				});
			},
			error: function(data)
			{
				dataSet = "Error";
			}
		});
		
		return dataSet;
	}
	
	$(document).on('click', '.reportComp', function() 
	{
		var components = $("#assetComp-table").DataTable();
		
		//var data = test.buttons.exportData();
		
		components.button( '0' ).trigger();
		
	});
	
});