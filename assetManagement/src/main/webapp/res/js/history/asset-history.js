$(document).ready(function()
{		
	//Add all temp files
	includeHTML();
	
	//All data fields on start up
	findAllHistory();
	
	function findAllHistory()
	{
		var dataSetHistory = [];
		
		$.ajax({
			url:"/assetManagement/asset/findAllHistory",
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSetHistory = data;
				
				assetList(dataSetHistory);
				
			}
		});
	}
	
	//Create dataTable with JSON data
	function assetList(dataSet)
	{
		
		var assetTable = $("#asset-table").DataTable({
			dom: '<f<t>lip>',
			retrieve: true,
			responsive: true,
			select: true,
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
		
		return assetTable;
	}
	
	function showActiveNav()
	{
		$('#aNav').addClass('active');
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