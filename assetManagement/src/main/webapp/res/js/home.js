$(document).ready(function()
{
	//Add template files
	includeHTML();
	
	var findAllAssets = findAllAssets();
	var percent = ((findAllAssets.length / 100)*0.1)*10;
	
	var findAllEmp = findAllEmp();
	
	var findAllAA = findAllAA();
	
	//Displaying total Assets
	document.getElementById("totalAssets").innerHTML = findAllAssets.length;
	
	//Displaying total employees
	document.getElementById("totalEmp").innerHTML = findAllEmp.length;
	
	//Displaying total Assests assigned
	document.getElementById("totalAA").innerHTML = findAllAA.length;
	
//	document.getElementById("totalAssetsPercent").innerHTML = percent;
	
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
	    	responsive: true
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
	
});