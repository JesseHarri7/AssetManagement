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
			url:"/assetManagement/assetAsset/findAllHistory",
			dataType: "json",
			type: "GET",
			success: function(data)
			{
				dataSetHistory = data;
				
				aaList(dataSetHistory);
				
			}
		});
	}
	
	//Create dataTable with JSON data
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
				{data: 'assetOne.assetCode'},
				{data: 'assetOne.name'},
				{data: 'assetComponent.assetCode'},
				{data: 'assetComponent.name'},
				{data: 'assignDate'},
				{data: 'unassignDate'},
				{data: 'prevAsset'},
				{data: 'state'}
			]
		});
		
		return aaTable;
	}
	
	function showActiveNav()
	{
		$('#cNav').addClass('active');
		
		$("a[href='../pages/asset']").attr('href', '../pages/component')
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
	
});